import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import FrontLayout from '../../../components/layout/Front';
import { leadsAPI } from '../../../services/api';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS
  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, [PUBLIC_KEY]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        alert('Email service not configured. Please set environment variables.');
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          subject: data.subject,
          message: data.message,
        },
        PUBLIC_KEY
      );

      try {
        await leadsAPI.submitLead({
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          subject: data.subject,
          message: data.message,
          submittedAt: new Date().toISOString(),
        });
      } catch (sheetsError) {
        console.warn('Failed to save to Google Sheets:', sheetsError);
      }

      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Email error:", error);
      alert("Something went wrong. Please try again later.");
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+353 899829085'],
      link: 'tel:+353899829085'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@techera.ie'],
      link: 'mailto:info@techera.ie'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['1 Ballycoolin Rd, Ballycoolen', 'Dublin, D15 AKK1, Ireland'],
      link: 'https://maps.google.com'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat-Sun: Closed'],
      link: null
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' }
  ];

  const faqs = [
    {
      question: 'What IT contracting services do you provide?',
      answer: 'We provide highly skilled IT professionals including Software Developers, AI & ML Engineers, Data Scientists, Cloud Engineers, DevOps Engineers, Cybersecurity Specialists, Business Analysts, and Project Managers.'
    },
    {
      question: 'What AI products can you develop?',
      answer: 'We develop custom AI automation systems, predictive analytics platforms, AI chatbots, intelligent workflow automation, AI-based recruitment tools, business intelligence dashboards, and SaaS AI products.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We are based in Dublin, Ireland, and serve businesses across Ireland and globally. We can work with clients remotely or on-site as needed.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <FrontLayout>
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our IT contracting services or AI product development? 
            We're here to help! Contact us today to discuss your technology needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  Thank you for your message! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What is this regarding?"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href="tel:+353899829085" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <div className="text-gray-600">+353 899829085</div>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:info@techera.ie" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <div className="text-gray-600">info@techera.ie</div>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <a href="https://maps.google.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <div className="text-gray-600">1 Ballycoolin Rd, Ballycoolen</div>
                      <div className="text-gray-600">Dublin, D15 AKK1, Ireland</div>
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                    <div className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</div>
                    <div className="text-gray-600">Sat-Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Follow Us</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform" aria-label="Facebook">
                  <FaFacebook className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform" aria-label="Twitter">
                  <FaTwitter className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform" aria-label="Instagram">
                  <FaInstagram className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform" aria-label="LinkedIn">
                  <FaLinkedin className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>

            {/* FAQ Section - Accordion */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(0)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">What IT contracting services do you provide?</h3>
                    <div className="flex-shrink-0">
                      {openFaqIndex === 0 ? (
                        <FaChevronUp className="w-5 h-5 text-primary-600" />
                      ) : (
                        <FaChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqIndex === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">We provide highly skilled IT professionals including Software Developers, AI & ML Engineers, Data Scientists, Cloud Engineers, DevOps Engineers, Cybersecurity Specialists, Business Analysts, and Project Managers.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(1)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">What AI products can you develop?</h3>
                    <div className="flex-shrink-0">
                      {openFaqIndex === 1 ? (
                        <FaChevronUp className="w-5 h-5 text-primary-600" />
                      ) : (
                        <FaChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqIndex === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">We develop custom AI automation systems, predictive analytics platforms, AI chatbots, intelligent workflow automation, AI-based recruitment tools, business intelligence dashboards, and SaaS AI products.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => toggleFaq(2)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">What areas do you serve?</h3>
                    <div className="flex-shrink-0">
                      {openFaqIndex === 2 ? (
                        <FaChevronUp className="w-5 h-5 text-primary-600" />
                      ) : (
                        <FaChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqIndex === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">We are based in Dublin, Ireland, and serve businesses across Ireland and globally. We can work with clients remotely or on-site as needed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FrontLayout>
  );
};

export default Contact; 