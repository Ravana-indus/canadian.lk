import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MapleLeaf from '../components/ui/MapleLeaf';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;
const FRAPPE_API_URL = import.meta.env.VITE_FRAPPE_LEAD_ENDPOINT || "https://frappe-lead-worker.divine-cell-37a1.workers.dev";

export default function Apply() {
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        custom_address_: '',
        custom_city: '',
        custom_preferred_language_of_communication: '',
        custom_pathway: '',
        custom_do_you_have_a_degree: '',
        custom_do_you_have_3_passes_in_a_level_in_one_sitting: '',
        custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper: '',
        custom_do_you_have_german_language: 'No', // Automatically mapped for Canadian equivalent
        custom_do_you_have_ielts_60_or_above__can_archive_60: '',
        custom_funding_capacity: '',
        notes: ''
    });

    // File states
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
    const [otherFiles, setOtherFiles] = useState<FileList | null>(null);

    useEffect(() => {
        // Pre-fill from URL params
        const params = new URLSearchParams(location.search);
        const pathway = params.get('pathway');
        if (pathway) {
            setFormData(prev => ({ ...prev, custom_pathway: pathway }));
        }
    }, [location]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const uploadToSupabase = async (file: File | null, prefix: string) => {
        if (!supabase || !file || file.size === 0) return null;
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { error } = await supabase.storage.from('leads').upload(fileName, file);
            if (error) {
                console.error(`Supabase upload error for ${prefix}:`, error);
                return null;
            }
            const { data: publicUrlData } = supabase.storage.from('leads').getPublicUrl(fileName);
            return publicUrlData.publicUrl;
        } catch (err) {
            console.error("Upload process failed", err);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Upload files
            let cvUrl = await uploadToSupabase(cvFile, 'cv');
            let transcriptUrl = await uploadToSupabase(transcriptFile, 'transcript');
            let otherDocsUrls: string[] = [];

            if (otherFiles) {
                for (let i = 0; i < otherFiles.length; i++) {
                    const url = await uploadToSupabase(otherFiles[i], `other_${i}`);
                    if (url) otherDocsUrls.push(url);
                }
            }

            // Map Canadian.lk field values to German.lk Frappe acceptable values
            const mappedPathway = "Student"; // Backend only accepts subset of pathways (Student, Job Seeking, etc.)

            let mappedGpa = formData.custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper;
            if (mappedGpa === "Pending Transcript") mappedGpa = "Pending Transcript "; // Frappe expects trailing space
            if (mappedGpa === "N/A") mappedGpa = "No"; // Map N/A to No for backend compatibility

            const extendedNotes = `[CANADIAN.LK LEAD]
Requested Service: ${formData.custom_pathway}
GPA N/A Selected: ${formData.custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper === "N/A" ? "Yes" : "No"}

--- Original Notes ---
${formData.notes || 'None'}`;

            const payload = {
                ...formData,
                custom_pathway: mappedPathway,
                custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper: mappedGpa,
                custom_do_you_have_german_language: "No", // Not applicable for Canada
                custom_countryselection: "Canada", // Ensure backend classifies this correctly
                notes: extendedNotes,
                custom_cv: cvUrl,
                custom_transcript: transcriptUrl,
                custom_other_documents: otherDocsUrls.length > 0 ? otherDocsUrls.join(', ') : null
            };

            const response = await fetch(FRAPPE_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            setSubmitStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Fire and forget welcome SMS via Supabase Edge Function
            if (supabaseUrl && supabaseKey) {
                try {
                    // Standardize LK number: strip non-digits, remove leading '0' or '94'
                    let cleanPhone = formData.mobile_no.replace(/\D/g, '');
                    if (cleanPhone.startsWith('94')) cleanPhone = cleanPhone.substring(2);
                    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);

                    const smsEndpoint = `${supabaseUrl}/functions/v1/welcome-sms`;
                    fetch(smsEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${supabaseKey}`
                        },
                        body: JSON.stringify({
                            mobile_number: cleanPhone,
                            source: "Canadian.lk"
                        })
                    }).then(res => res.json())
                        .then(data => console.log('SMS Function Response:', data))
                        .catch(err => console.error("SMS Edge Function network error:", err));
                } catch (smsErr) {
                    console.error("SMS Edge Function setup error:", smsErr);
                }

                // Fire and forget Welcome Email via Supabase Edge Function
                try {
                    const emailEndpoint = `${supabaseUrl}/functions/v1/welcome-email`;
                    const fullName = `${formData.first_name || ''} ${formData.last_name || ''}`.trim();

                    fetch(emailEndpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${supabaseKey}`
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            name: fullName || "Future Student",
                            pathway: formData.custom_pathway,
                            source: "Canadian.lk", // Added identifier for the Edge function if needed
                            replyTo: "hello@canadian.lk"
                        })
                    }).then(res => res.json())
                        .then(data => console.log('Welcome Email Response:', data))
                        .catch(err => console.error("Welcome Email network error:", err));
                } catch (emailErr) {
                    console.error("Welcome Email setup error:", emailErr);
                }
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            setErrorMessage(error.message || "Failed to submit application.");
            setSubmitStatus('error');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full bg-background min-h-screen pb-24">
            <Helmet>
                <title>Apply Now | Canadian.lk — Start Your Canadian Education Journey</title>
                <meta name="description" content="Submit your free application to Canadian.lk. Our advisors will review your profile and guide you through admissions, loans, and visa support." />
                <link rel="canonical" href="https://www.canadian.lk/apply" />
            </Helmet>
            {/* Header */}
            <section className="pt-40 pb-20 bg-background text-center px-4 relative overflow-hidden">
                <MapleLeaf className="absolute top-0 right-0 w-64 h-64 text-primary/10 z-0 transform translate-x-1/2 -translate-y-1/2" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 flex items-center justify-center">
                        Start Your <span className="text-cta italic ml-2 mr-2">Journey</span> <MapleLeaf className="w-10 h-10 ml-2 text-primary" />
                    </h1>
                    <p className="text-xl text-secondary font-sans max-w-2xl mx-auto">
                        Submit your details below and our Canadian.lk advisors will contact you with the next steps for your personalized pathway.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
                {submitStatus === 'success' && (
                    <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl flex items-start shadow-sm">
                        <CheckCircle2 className="text-green-500 mr-4 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="text-green-800 font-bold text-lg mb-1">Application Submitted Successfully!</h3>
                            <p className="text-green-700">Your profile has been securely sent to our partners in Canada. A dedicated advisor will reach out to you within 24 hours.</p>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl flex items-start shadow-sm">
                        <AlertCircle className="text-red-500 mr-4 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h3 className="text-red-800 font-bold text-lg mb-1">Submission Failed</h3>
                            <p className="text-red-700">{errorMessage} Please try again or contact us directly on WhatsApp.</p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">

                            {/* Personal Info */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-primary border-b border-gray-100 pb-4 mb-6">1. Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">First Name *</label>
                                        <input required type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Last Name *</label>
                                        <input required type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Email Address *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">WhatsApp Number *</label>
                                        <input required type="tel" name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+94 7X XXX XXXX" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Preferred Communication Language *</label>
                                        <select required name="custom_preferred_language_of_communication" value={formData.custom_preferred_language_of_communication} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select language...</option>
                                            <option value="English">English</option>
                                            <option value="Sinhala">Sinhala</option>
                                            <option value="Tamil">Tamil</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Address</label>
                                        <input type="text" name="custom_address_" value={formData.custom_address_} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Academic Profile */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-primary border-b border-gray-100 pb-4 mb-6">2. Academic & Financial Profile</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Primary Interest / Pathway *</label>
                                        <select required name="custom_pathway" value={formData.custom_pathway} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select primary service...</option>
                                            <option value="University Admissions">University Admissions & PGWP Mapping</option>
                                            <option value="Student Loans">CAD $65,000 Student Loan Financing</option>
                                            <option value="Visa & Immigration">Study Permit & Visa (RCIC Partner)</option>
                                            <option value="All of the above">The Complete Flight Plan (All-in-One)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Do you have a Degree? *</label>
                                        <select required name="custom_do_you_have_a_degree" value={formData.custom_do_you_have_a_degree} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Pending Transcript">Pending Transcript</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">GPA 2.8+ or Second Class Upper? *</label>
                                        <select required name="custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper" value={formData.custom_do_you_have_a_gpa_of_28_or_above_or_second_class_upper} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Pending Transcript">Pending Transcript</option>
                                            <option value="N/A">Not Applicable</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">A/Level: 3 Passes in one sitting? *</label>
                                        <select required name="custom_do_you_have_3_passes_in_a_level_in_one_sitting" value={formData.custom_do_you_have_3_passes_in_a_level_in_one_sitting} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                            <option value="Pending Results">Pending Results</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">IELTS 6.0+ (Or equivalent)? *</label>
                                        <select required name="custom_do_you_have_ielts_60_or_above__can_archive_60" value={formData.custom_do_you_have_ielts_60_or_above__can_archive_60} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select...</option>
                                            <option value="Yes have 6.0 or better">Yes have 6.0 or better</option>
                                            <option value="No but can get">No but can get</option>
                                            <option value="No can't get">No can't get</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Estimated Current Funding Capacity (LKR) *</label>
                                        <select required name="custom_funding_capacity" value={formData.custom_funding_capacity} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="" disabled>Select funding capacity...</option>
                                            <option value="Less than 1.5 Million LKR">Less than 1.5M LKR (Relying fully on loan)</option>
                                            <option value="LKR 1.5M - 2.5M">1.5M - 2.5M LKR</option>
                                            <option value="LKR 2.5M - 4.5M">2.5M - 4.5M LKR</option>
                                            <option value="LKR 4.5M - 8M">4.5M+ LKR (Self-funded / Partial Loan)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-primary border-b border-gray-100 pb-4 mb-6">3. Document Upload</h3>
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 relative group hover:border-cta transition-colors">
                                        <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                            <UploadCloud className="text-gray-400 group-hover:text-cta mb-2" size={32} />
                                            <span className="font-semibold text-primary mb-1">Upload CV / Resume *</span>
                                            <span className="text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</span>
                                            <input type="file" required accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        </label>
                                        {cvFile && <p className="text-center text-sm font-medium text-green-600 mt-2">Selected: {cvFile.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 relative group hover:border-cta transition-colors">
                                            <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                                <UploadCloud className="text-gray-400 group-hover:text-cta mb-2" size={24} />
                                                <span className="font-medium text-primary text-sm mb-1">Academic Transcript</span>
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            </label>
                                            {transcriptFile && <p className="text-center text-xs font-medium text-green-600 mt-2 truncate">Selected: {transcriptFile.name}</p>}
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 relative group hover:border-cta transition-colors">
                                            <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                                <UploadCloud className="text-gray-400 group-hover:text-cta mb-2" size={24} />
                                                <span className="font-medium text-primary text-sm mb-1">Other Docs (IELTS, Passport)</span>
                                                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setOtherFiles(e.target.files)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            </label>
                                            {otherFiles && otherFiles.length > 0 && <p className="text-center text-xs font-medium text-green-600 mt-2">{otherFiles.length} file(s) selected</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Comments */}
                            <div>
                                <label className="block text-sm font-medium text-secondary mb-2">Additional Notes / Special Requests</label>
                                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Any specific questions regarding universities, loans, or the visa process..."></textarea>
                            </div>

                            {/* Submit */}
                            <div className="pt-6 border-t border-gray-100 flex flex-col items-center mt-6">
                                <button type="submit" disabled={isSubmitting} className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center transition-all shadow-md ${isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-secondary cursor-pointer'}`}>
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing Profile...
                                        </>
                                    ) : 'Submit Secure Application'}
                                </button>
                                <div className="flex items-center mt-4 text-xs text-secondary/70 max-w-sm text-center">
                                    <ShieldCheck size={14} className="mr-1 flex-shrink-0 text-green-600" />
                                    Your data is securely transmitted directly to our RCIC partnered platform.
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
