import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { usePortfolioData } from '../context/PortfolioContext'

const Contact = () => {
  const { data } = usePortfolioData()
  const visibility = data?.visibility || {}
  const settings = data?.siteSettings || {}
  const contactContent = data?.sectionContent?.contact || {}

  if (visibility.contact === false) return null

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 5000);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before sending
    if (!validateForm()) {
      showToast("Please fix the errors above", 'error');
      return;
    }
    
    setStatus('loading');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast("Message sent successfully! I'll get back to you soon.", 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setStatus('idle');
      } else {
        const errorData = await res.json();
        showToast(errorData.message || "Failed to send message. Please try again later.", 'error');
        setStatus('idle');
      }
    } catch (error) {
      console.error(error);
      showToast("Network error. Please check your connection and try again.", 'error');
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-10 lg:px-16 relative z-10 bg-white dark:bg-transparent border-t border-gray-100 dark:border-white/[0.05]">
      
      {/* Toast Notification Popup */}
      <div className={`fixed top-[15%] left-1/2 z-[100] transform -translate-x-1/2 transition-all duration-500 ease-out flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
        toast.show ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'
      } ${
        toast.type === 'success' 
          ? 'bg-green-500/10 border-green-500/50 text-green-400' 
          : 'bg-red-500/10 border-red-500/50 text-red-400'
      }`}>
        {toast.type === 'success' ? (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
        )}
        <p className="font-medium">{toast.message}</p>
      </div>

      {/* Dark background ambients */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none hidden dark:block" />

      <div className="max-w-[1700px] mx-auto flex flex-col items-center justify-center relative z-10 transition-all duration-300">
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Container - Contact Info */}
          <div className="lg:col-span-2 bg-[#07101f]/90 dark:bg-[#020817]/95 rounded-[2rem] border border-white/[0.08] border-l-blue-500 border-t-blue-500 border-l-[6px] border-t-[6px] p-8 md:p-10 transition-all duration-300 flex flex-col gap-10 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transform hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(59,130,246,0.24)] group">
            
            {/* Location */}
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-500 dark:text-cyan-400 shrink-0">
                <FaMapMarkerAlt size={24} />
              </div>
              <div className="flex flex-col justify-center h-14 w-full overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-1">Location</h3>
                <p className="text-gray-300 text-base flex-1 overflow-hidden">
                  {contactContent.locationText || 'Adama, Ethiopia'}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0">
                <FaEnvelope size={22} />
              </div>
              <div className="flex flex-col justify-center h-14 w-full overflow-hidden">
                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                <a href={`mailto:${settings.contactEmail || contactContent.emailText || 'kenenisab05@gmail.com'}`} className="text-cyan-300 hover:text-cyan-200 text-base hover:underline transition-all truncate block">
                  {settings.contactEmail || contactContent.emailText || 'kenenisab05@gmail.com'}
                </a>
              </div>
            </div>

            {/* Follow Me */}
            <div className="relative z-50 pointer-events-auto">
              <h3 className="text-xl font-bold text-white mb-4">Follow Me</h3>
              <div className="flex items-center gap-4">
                <a href={settings.githubUrl || "https://github.com/kenenisabeyan"} target="_blank" rel="noopener noreferrer" className="relative z-50 w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800">
                  <FaGithub size={24} className="text-[#181717] dark:text-white" />
                </a>
                <a href={settings.linkedinUrl || "https://www.linkedin.com/in/kenenisa/"} target="_blank" rel="noopener noreferrer" className="relative z-50 w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800">
                  <FaLinkedin size={24} className="text-[#0A66C2]" />
                </a>
                <a href={settings.twitterUrl || "https://twitter.com/kenenisa94931"} target="_blank" rel="noopener noreferrer" className="relative z-50 w-12 h-12 rounded-xl bg-white dark:bg-[#1a1f2e] flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-md border border-gray-100 dark:border-gray-800">
                  <FaTwitter size={24} className="text-[#1DA1F2]" />
                </a>
              </div>
            </div>

            {/* Map container */}
            <div className="mt-auto w-full h-[220px] rounded-2xl overflow-hidden relative group/map border border-white/[0.08] shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11524316931!2d39.188!3d8.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b1fe3dafd5785%3A0x6bba8479ba0a5eb5!2sAdama!5e0!3m2!1sen!2set!4v1714470830154!5m2!1sen!2set" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full opacity-80 group-hover/map:opacity-100 transition-opacity duration-300 dark:filter dark:grayscale dark:contrast-125 dark:opacity-70 dark:group-hover/map:opacity-90 z-0"
              ></iframe>
              <a href="https://maps.google.com/?q=Adama,Ethiopia" target="_blank" rel="noopener noreferrer" className="absolute top-4 left-4 z-10 bg-white/10 dark:bg-white/10 px-4 py-2 rounded-lg text-sm font-semibold text-cyan-300 hover:text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-transform backdrop-blur-sm">
                Open in Maps
                <FiExternalLink />
              </a>
            </div>
          </div>
          
          {/* Right Container - Form */}
          <div className="lg:col-span-3 bg-[#07101f]/90 dark:bg-[#020817]/95 rounded-[2rem] border border-white/[0.08] border-l-cyan-500 border-t-cyan-500 border-l-[6px] border-t-[6px] p-8 md:p-12 transition-all duration-300 relative group shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transform hover:-translate-y-2 hover:shadow-[0_25px_90px_rgba(34,211,238,0.24)]">
            {/* Corner glowing accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] opacity-50 group-hover:opacity-100 group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none hidden dark:block" />
            
            <div className="mb-10 text-center md:text-left relative z-10">
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight border-b-4 border-cyan-500/30 pb-3 inline-block mb-6">Contact <span className="text-cyan-400">Me</span></h2>
               <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">Have a project in mind or want to discuss a collaboration? Feel free to reach out.</p>
            </div>
            
            <form onSubmit={sendMessage} className="flex flex-col gap-6 relative z-10">
                            
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-medium dark:font-semibold text-white ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    className={`w-full px-5 py-4 bg-white/5 dark:bg-white/[0.02] border border-white/[0.08] text-base font-normal text-white placeholder-gray-400 dark:placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 transition-all shadow-sm dark:shadow-inner dark:backdrop-blur-md ${
                      errors.name 
                        ? 'border-red-500 dark:border-red-500/50 focus:ring-red-500/50' 
                        : 'border-white/[0.08] dark:border-white/[0.08] focus:ring-blue-500/50 dark:focus:ring-cyan-500/50'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-sm font-medium dark:font-semibold text-white ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email" 
                    className={`w-full px-5 py-4 bg-white/5 dark:bg-white/[0.02] border border-white/[0.08] text-base font-normal text-white placeholder-gray-400 dark:placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 transition-all shadow-sm dark:shadow-inner dark:backdrop-blur-md ${
                      errors.email 
                        ? 'border-red-500 dark:border-red-500/50 focus:ring-red-500/50' 
                        : 'border-white/[0.08] dark:border-white/[0.08] focus:ring-blue-500/50 dark:focus:ring-cyan-500/50'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium dark:font-semibold text-white ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  className={`w-full px-5 py-4 bg-white/5 dark:bg-white/[0.02] border border-white/[0.08] text-base font-normal text-white placeholder-gray-400 dark:placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 transition-all shadow-sm dark:shadow-inner dark:backdrop-blur-md ${
                    errors.subject 
                      ? 'border-red-500 dark:border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/[0.08] dark:border-white/[0.08] focus:ring-blue-500/50 dark:focus:ring-cyan-500/50'
                  }`}
                />
                {errors.subject && <p className="text-red-500 text-xs ml-1">{errors.subject}</p>}
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium dark:font-semibold text-white ml-1">Message</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows={6} 
                  placeholder="Your message" 
                  className={`w-full px-5 py-4 bg-white/5 dark:bg-white/[0.02] border border-white/[0.08] text-base font-normal text-white placeholder-gray-400 dark:placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none shadow-sm dark:shadow-inner dark:backdrop-blur-md ${
                    errors.message 
                      ? 'border-red-500 dark:border-red-500/50 focus:ring-red-500/50' 
                      : 'border-white/[0.08] dark:border-white/[0.08] focus:ring-blue-500/50 dark:focus:ring-cyan-500/50'
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full md:w-max px-10 mt-2 py-4 bg-gray-900 dark:bg-cyan-500 text-white dark:text-black border border-transparent dark:border-transparent rounded-xl font-bold dark:font-black text-sm uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-[#030610] dark:hover:text-cyan-50 dark:hover:border-cyan-400/50 transition-colors shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.4)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Contact