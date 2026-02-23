import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLaptopCode, FaRobot, FaCloud, FaShieldAlt, FaChartLine, FaCogs, FaUsers, FaCheck, FaStar } from 'react-icons/fa';
import FrontLayout from '../../../components/layout/Front';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    // Services animations
    gsap.fromTo('.service-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        }
      }
    );

    // Pricing animations
    gsap.fromTo('.pricing-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: pricingRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: FaLaptopCode,
      title: 'IT Contracting Services',
      description: 'We provide highly skilled IT professionals to support businesses across Ireland and globally. Whether you need short-term project support or long-term technical expertise, Techera delivers reliable, performance-driven talent.',
      features: [
        'Software Developers (Frontend, Backend, Full Stack)',
        'AI & Machine Learning Engineers',
        'Data Analysts & Data Scientists',
        'Cloud Engineers (AWS, Azure, GCP)',
        'DevOps Engineers',
        'Cybersecurity Specialists',
        'Business Analysts',
        'Project Managers'
      ],
      price: 'Contact for pricing'
    },
    {
      icon: FaRobot,
      title: 'AI-Based Product Development',
      description: 'Techera designs and develops intelligent AI-powered products tailored to business needs. We build scalable, secure, and future-ready AI systems that give companies a competitive edge.',
      features: [
        'Custom AI Automation Systems',
        'Predictive Analytics Platforms',
        'AI Chatbots & Conversational AI',
        'Intelligent Workflow Automation',
        'AI-based Recruitment & HR Tools',
        'Business Intelligence Dashboards',
        'SaaS AI Products'
      ],
      price: 'Contact for pricing'
    }
  ];

  const serviceTypes = [
    {
      type: 'Short-term',
      title: 'Project-Based Contracting',
      price: 'Flexible',
      description: 'Short-term project support with expert IT professionals.',
      features: ['Project-specific expertise', 'Flexible engagement', 'Quick onboarding', 'Quality deliverables']
    },
    {
      type: 'Long-term',
      title: 'Extended Contracting',
      price: 'Flexible',
      description: 'Long-term technical expertise for ongoing projects and support.',
      features: ['Dedicated resources', 'Long-term partnership', 'Continuous support', 'Scalable solutions']
    },
    {
      type: 'AI Products',
      title: 'AI Product Development',
      price: 'Custom',
      description: 'End-to-end AI product development from concept to deployment.',
      features: ['Custom AI solutions', 'Scalable architecture', 'Full lifecycle support', 'Innovation-driven']
    }
  ];

  return (
    <FrontLayout>

   
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive IT contracting services and AI product development solutions, 
            designed to transform your business with innovative technology.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What We <span className="text-gradient">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From IT contracting to AI product development, we provide comprehensive 
              technology solutions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="service-card card p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaLaptopCode className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">IT Contracting Services</h3>
                  <p className="text-gray-600 mb-4">We provide highly skilled IT professionals to support businesses across Ireland and globally. Whether you need short-term project support or long-term technical expertise, Techera delivers reliable, performance-driven talent.</p>
                  <div className="mb-4">
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Software Developers (Frontend, Backend, Full Stack)</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />AI & Machine Learning Engineers</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Data Analysts & Data Scientists</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Cloud Engineers (AWS, Azure, GCP)</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />DevOps Engineers</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Cybersecurity Specialists</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Business Analysts</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Project Managers</li>
                    </ul>
                  </div>
                  <Link to="/contact" className="inline-flex items-center justify-center mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold text-base hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-md hover:shadow-lg">Contact for pricing</Link>
                </div>
              </div>
            </div>

            <div className="service-card card p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaRobot className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">AI-Based Product Development</h3>
                  <p className="text-gray-600 mb-4">Techera designs and develops intelligent AI-powered products tailored to business needs. We build scalable, secure, and future-ready AI systems that give companies a competitive edge.</p>
                  <div className="mb-4">
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Custom AI Automation Systems</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Predictive Analytics Platforms</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />AI Chatbots & Conversational AI</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Intelligent Workflow Automation</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />AI-based Recruitment & HR Tools</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />Business Intelligence Dashboards</li>
                      <li className="flex items-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />SaaS AI Products</li>
                    </ul>
                  </div>
                  <Link to="/contact" className="inline-flex items-center justify-center mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold text-base hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-md hover:shadow-lg">Contact for pricing</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section ref={pricingRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Service <span className="text-gradient">Types</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the engagement model that works best for your project and business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`pricing-card card p-8 text-center ${'Short-term' === 'Long-term' ? 'ring-2 ring-primary-500 relative' : ''}`}>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">Short-term</div>
                <div className="text-2xl font-semibold text-primary-600 mb-2">Project-Based Contracting</div>
                <div className="text-3xl font-bold text-gray-900">Flexible</div>
              </div>
              <p className="text-gray-600 mb-6">Short-term project support with expert IT professionals.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Project-specific expertise</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Flexible engagement</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Quick onboarding</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Quality deliverables</li>
              </ul>
              <Link to="/contact" className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${'Short-term' === 'Long-term' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>Get Started</Link>
            </div>

            <div className={`pricing-card card p-8 text-center ${'Long-term' === 'Long-term' ? 'ring-2 ring-primary-500 relative' : ''}`}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">Long-term</div>
                <div className="text-2xl font-semibold text-primary-600 mb-2">Extended Contracting</div>
                <div className="text-3xl font-bold text-gray-900">Flexible</div>
              </div>
              <p className="text-gray-600 mb-6">Long-term technical expertise for ongoing projects and support.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Dedicated resources</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Long-term partnership</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Continuous support</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Scalable solutions</li>
              </ul>
              <Link to="/contact" className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${'Long-term' === 'Long-term' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>Get Started</Link>
            </div>

            <div className={`pricing-card card p-8 text-center ${'AI Products' === 'Long-term' ? 'ring-2 ring-primary-500 relative' : ''}`}>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">AI Products</div>
                <div className="text-2xl font-semibold text-primary-600 mb-2">AI Product Development</div>
                <div className="text-3xl font-bold text-gray-900">Custom</div>
              </div>
              <p className="text-gray-600 mb-6">End-to-end AI product development from concept to deployment.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Custom AI solutions</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Scalable architecture</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Full lifecycle support</li>
                <li className="flex items-center justify-center text-gray-700"><FaCheck className="w-4 h-4 text-green-500 mr-2" />Innovation-driven</li>
              </ul>
              <Link to="/contact" className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${'AI Products' === 'Long-term' ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process ensures a seamless experience from consultation to delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">01</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultation</h3>
              <p className="text-gray-600">Discuss your IT needs and project requirements with our team.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">02</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Resource Matching</h3>
              <p className="text-gray-600">We match you with the perfect IT professionals or start your AI product development.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">03</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Project Execution</h3>
              <p className="text-gray-600">Our team works with precision and expertise to deliver quality solutions.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">04</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">We provide continuous support and ensure your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your IT contracting needs or AI product development requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-accent text-lg px-8 py-4">
              Get Started
            </Link>
            <Link to="/about" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>

    </FrontLayout>
  );
};

export default Services; 