
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactInfoCard from './contact/ContactInfoCard';
import ContactForm from './contact/ContactForm';
import { trackFormInteraction } from './contact/utils/rateLimiting';

const ContactSection = () => {
  // Track when the form section is viewed
  useEffect(() => {
    // Force clear any potential issues with local storage that might be affected by VPN changes
    if (typeof window !== 'undefined') {
      try {
        const today = new Date().toDateString();
        const countKey = `submissions_${today}`;
        
        // Reset limit if it's unreasonably high (could happen with VPN IP changes)
        const count = parseInt(localStorage.getItem(countKey) || '0');
        if (count > 10) {
          localStorage.setItem(countKey, '0');
        }
        
        // Additional VPN compatibility: Clear any stale data or corrupted entries
        const lastSubmission = localStorage.getItem('lastFormSubmission');
        if (lastSubmission) {
          const lastSubmissionTime = parseInt(lastSubmission);
          // If lastSubmission is corrupted or more than 24 hours old, reset it
          if (isNaN(lastSubmissionTime) || Date.now() - lastSubmissionTime > 86400000) {
            localStorage.removeItem('lastFormSubmission');
          }
        }
        
        // Try to access and clear sessionStorage as well for complete reset
        if (window.sessionStorage.getItem('formStartTime')) {
          const formStartTime = parseInt(window.sessionStorage.getItem('formStartTime') || '0');
          // If the form start time is more than 1 hour old, reset it
          if (Date.now() - formStartTime > 3600000) {
            window.sessionStorage.removeItem('formStartTime');
          }
        }
      } catch (err) {
        console.error('Storage error:', err);
        // Fallback: if localStorage access fails, try to use sessionStorage instead
        try {
          window.sessionStorage.setItem('vpnCompatibilityMode', 'true');
        } catch (sessionErr) {
          console.error('Session storage error:', sessionErr);
        }
      }
    }
    
    trackFormInteraction();
  }, []);

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Background decorative elements */}
        <div className="absolute -right-20 top-1/3 w-60 h-60 bg-robin-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 bottom-1/3 w-60 h-60 bg-robin-orange/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Section title for consistency */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-robin-dark">
            Contact <span className="text-robin-orange">Information</span>
          </h2>
          <div className="w-20 h-1 bg-robin-orange mx-auto mt-3 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch max-w-7xl mx-auto">
          {/* Left Column - Contact Form (Now first and wider) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 h-full"
          >
            <ContactForm />
          </motion.div>
          
          {/* Right Column - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 h-full"
          >
            <ContactInfoCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
