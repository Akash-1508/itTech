import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaUsers, FaRobot, FaLaptopCode, FaCloud, FaCogs, FaShieldAlt, FaChartLine, FaTasks, FaCheckCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FrontLayout from '../../../components/layout/Front';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const heroSlides = [
  {
    title: 'Techera',
    subtitle: 'AI-Powered IT Solutions',
    description: 'Connecting organizations with top-tier IT professionals while building innovative AI solutions that help businesses automate, optimize, and grow.',
    highlight: 'Innovation meets Expertise'
  },
  {
    title: 'IT Contracting Services',
    subtitle: 'Expert Talent for Your Projects',
    description: 'We provide highly skilled IT professionals to support businesses across Ireland and globally. Whether you need short-term project support or long-term technical expertise, Techera delivers reliable, performance-driven talent.',
    highlight: 'Your Trusted IT Partner'
  },
  {
    title: 'AI Product Development',
    subtitle: 'Intelligent Solutions for Modern Business',
    description: 'Techera designs and develops intelligent AI-powered products tailored to business needs. We build scalable, secure, and future-ready AI systems that give companies a competitive edge.',
    highlight: 'Transforming Business with AI'
  },
  {
    title: 'Global Reach, Local Expertise',
    subtitle: 'Serving Businesses Worldwide',
    description: 'Based in Dublin, Ireland, we serve businesses across Ireland and globally. We can work with clients remotely or on-site, delivering world-class IT solutions with a personal touch.',
    highlight: 'Ireland to the World'
  }
];

const features = [
  {
    icon: FaLaptopCode,
    title: 'IT Contracting Services',
    description: 'Connect with top-tier IT professionals - developers, engineers, and specialists for your projects.'
  },
  {
    icon: FaRobot,
    title: 'AI Product Development',
    description: 'Build intelligent, scalable AI solutions tailored to your business needs.'
  },
  {
    icon: FaCloud,
    title: 'Cloud Solutions',
    description: 'Expert cloud engineering services for AWS, Azure, and GCP platforms.'
  },
  {
    icon: FaShieldAlt,
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and best practices.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechStart Inc.',
    rating: 5,
    text: 'Techera provided us with exceptional AI engineers who transformed our product development. Their expertise in machine learning helped us launch ahead of schedule.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Michael Chen',
    role: 'CEO, Digital Solutions',
    rating: 5,
    text: 'The IT contractors from Techera were professional, skilled, and delivered exactly what we needed. Their cloud engineers helped us scale our infrastructure seamlessly.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Operations Director',
    rating: 5,
    text: 'Techera\'s AI automation system revolutionized our workflow. The intelligent solutions they built saved us countless hours and improved our efficiency significantly.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];

// Fetch function for testimonials
const fetchTestimonials = async () => {
  // Simulate API call - in real app, this would be an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(testimonials);
    }, 100);
  });
};

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const testimonialsRef = useRef(null);
  const finalCtaRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Use TanStack Query for testimonials
  const { data: testimonialsData = testimonials, isLoading: isLoadingTestimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Testimonials carousel auto-play using TanStack Query data
  useEffect(() => {
    if (!testimonialsData || testimonialsData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 4000); // Change testimonial every 4 seconds

    return () => clearInterval(interval);
  }, [testimonialsData]);

  const nextTestimonial = () => {
    if (!testimonialsData || testimonialsData.length === 0) return;
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    if (!testimonialsData || testimonialsData.length === 0) return;
    setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  useEffect(() => {
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
    const triggerStart = isMobileView ? 'top 90%' : 'top 80%';
    const triggerStartServices = isMobileView ? 'top 90%' : 'top 75%';

    // Refresh ScrollTrigger on resize (important for mobile orientation change)
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    // Features heading animation
    gsap.fromTo('.features-heading',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // Features cards animations
    gsap.fromTo('.feature-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // Main service cards (no rotationY on mobile for better performance)
    gsap.fromTo('.main-service-card',
      {
        y: 80,
        opacity: 0,
        scale: 0.9,
        rotationY: isMobileView ? 0 : -15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: triggerStartServices,
          invalidateOnRefresh: true,
        }
      }
    );

    // Feature service cards
    gsap.fromTo('.feature-service-card',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: triggerStartServices,
          invalidateOnRefresh: true,
        }
      }
    );

    // Service icon animations
    gsap.fromTo('.service-icon',
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: triggerStartServices,
          invalidateOnRefresh: true,
        }
      }
    );

    // Services heading
    gsap.fromTo('.services-heading',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // CTA section (first)
    gsap.fromTo('.cta-section-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // Testimonials heading
    gsap.fromTo('.testimonials-heading',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // Testimonials cards
    gsap.fromTo('.testimonial-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    // Final CTA section
    gsap.fromTo('.final-cta-content',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: finalCtaRef.current,
          start: triggerStart,
          invalidateOnRefresh: true,
        }
      }
    );

    return () => {
      window.removeEventListener('resize', onResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <FrontLayout>
    <div className="min-h-screen">
      {/* Hero Section - Carousel */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden"
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary-200 rounded-full opacity-20 animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-accent-200 rounded-full opacity-20 animate-pulse animation-delay-400"></div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto px-4 z-10">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Slides - 100vh on mobile so full screen; overflow-y-auto so buttons reachable */}
            <div className="relative h-[100vh] md:h-[80vh]">
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 py-8 md:py-0 overflow-y-auto"
                  initial={{ opacity: 0, x: index > currentSlide ? 100 : -100 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    x: index === currentSlide ? 0 : index > currentSlide ? 100 : -100,
                    scale: index === currentSlide ? 1 : 0.9
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <span className="text-gradient block">{slide.title}</span>
                    <span className="text-gray-800 text-3xl md:text-5xl lg:text-6xl mt-2 block">
                      {slide.subtitle}
                    </span>
                  </motion.h1>
                  
                  <motion.div
                    className="h-12 flex items-center justify-center mb-4 min-h-[3rem]"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-600">
                      {slide.highlight}
                    </span>
                  </motion.div>

                  <motion.p
                    className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center w-full max-w-sm sm:max-w-none mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Link to="/contact" className="btn-primary text-center text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 w-full sm:w-auto">
                      Get Started
                    </Link>
                    <Link to="/services" className="btn-secondary text-center text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 w-full sm:w-auto">
                      Our Services
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center z-20 transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="w-5 h-5 text-primary-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center z-20 transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <FaChevronRight className="w-5 h-5 text-primary-600" />
            </button>

            {/* Dots Indicator - niche (bottom) on mobile, same on desktop */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="features-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Techera</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine technical expertise with forward-thinking innovation to drive digital transformation 
              and deliver high-quality IT solutions for modern businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="section-padding bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container-custom">
          <div className="services-heading text-center mb-16">
            <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-wider mb-3">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide highly skilled IT professionals and develop intelligent AI-powered products tailored to business needs across Ireland and globally.
            </p>
          </div>

          {/* Main Services with Feature Cards */}
          <div className="space-y-16">
            {/* 1. IT Contracting Services */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 md:p-12">
              {/* Main Service Card */}
              <motion.div 
                className="main-service-card mb-12 bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
                whileHover={{ y: -5, scale: 1.01 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="service-icon w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl flex-shrink-0">
                    <FaLaptopCode className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      IT Contracting Services
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-600">
                      We provide highly skilled IT professionals to support businesses across Ireland and globally. Whether you need short-term project support or long-term technical expertise, Techera delivers reliable, performance-driven talent.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: FaLaptopCode, title: 'Software Developers', description: 'Frontend, Backend, and Full Stack developers to build scalable applications and systems.', gradient: 'from-primary-500 to-primary-600' },
                  { icon: FaRobot, title: 'AI & ML Engineers', description: 'Expert AI and Machine Learning engineers to develop intelligent solutions.', gradient: 'from-secondary-500 to-secondary-600' },
                  { icon: FaChartLine, title: 'Data Scientists', description: 'Data Analysts and Data Scientists to extract insights and build predictive analytics.', gradient: 'from-accent-500 to-accent-600' },
                  { icon: FaCloud, title: 'Cloud Engineers', description: 'AWS, Azure, and GCP specialists to design and manage scalable cloud infrastructure.', gradient: 'from-primary-500 to-secondary-500' },
                  { icon: FaCogs, title: 'DevOps Engineers', description: 'Streamline deployment, CI/CD pipelines, and infrastructure automation.', gradient: 'from-secondary-500 to-accent-500' },
                  { icon: FaShieldAlt, title: 'Cybersecurity Specialists', description: 'Protect your business with comprehensive security solutions and threat management.', gradient: 'from-primary-500 to-primary-600' },
                  { icon: FaUsers, title: 'Business Analysts', description: 'Analyze business requirements and bridge the gap between stakeholders and technical teams.', gradient: 'from-accent-500 to-accent-600' },
                  { icon: FaTasks, title: 'Project Managers', description: 'Experienced project managers to lead and deliver IT projects on time and within budget.', gradient: 'from-secondary-500 to-secondary-600' }
                ].map((feature, index) => {
                  // Map gradient to color for hover fill
                  const getHoverColor = (gradient) => {
                    if (gradient.includes('primary-500')) return 'bg-primary-500';
                    if (gradient.includes('secondary-500')) return 'bg-secondary-500';
                    if (gradient.includes('accent-500')) return 'bg-accent-500';
                    return 'bg-primary-500';
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      className="feature-service-card group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Hover Fill Overlay - expands from top-right */}
                      <div className={`absolute top-0 right-0 w-20 h-20 ${getHoverColor(feature.gradient)} rounded-bl-full opacity-60 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10 transition-all duration-500 ease-in-out`} />
                      
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary-100 rounded-bl-full opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-50 rounded-tr-full opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        {/* Feature Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Feature Title */}
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        
                        {/* Feature Description */}
                        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 2. AI-Based Product Development */}
            <div className="bg-gradient-to-br from-secondary-50 to-white rounded-3xl p-8 md:p-12">
              {/* Main Service Card */}
              <motion.div 
                className="main-service-card mb-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl shadow-2xl p-8"
                whileHover={{ y: -5, scale: 1.01 }} 
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="service-icon w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30 flex-shrink-0">
                    <FaRobot className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="text-3xl font-bold mb-4">
                      AI-Based Product Development
                    </h3>
                    <p className="text-lg leading-relaxed text-white/90">
                      Techera designs and develops intelligent AI-powered products tailored to business needs. We build scalable, secure, and future-ready AI systems that give companies a competitive edge.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  { icon: FaRobot, title: 'Custom AI Automation Systems', description: 'Custom AI automation systems to streamline workflows and improve operational efficiency.', gradient: 'from-primary-500 to-accent-500' },
                  { icon: FaChartLine, title: 'Predictive Analytics Platforms', description: 'Build predictive analytics platforms to forecast trends and make data-driven decisions.', gradient: 'from-secondary-500 to-secondary-600' },
                  { icon: FaRobot, title: 'AI Chatbots & Conversational AI', description: 'Intelligent conversational AI and chatbots to enhance customer engagement and support.', gradient: 'from-accent-500 to-accent-600' },
                  { icon: FaCogs, title: 'Intelligent Workflow Automation', description: 'Automate complex business processes with intelligent workflow automation systems.', gradient: 'from-primary-500 to-secondary-500' },
                  { icon: FaUsers, title: 'AI-based Recruitment & HR Tools', description: 'Revolutionize your HR processes with AI-powered recruitment and talent management tools.', gradient: 'from-secondary-500 to-accent-500' },
                  { icon: FaChartLine, title: 'Business Intelligence Dashboards', description: 'BI dashboards and analytics platforms to transform data into actionable business insights.', gradient: 'from-accent-500 to-accent-600' },
                  { icon: FaLaptopCode, title: 'SaaS AI Products', description: 'Scalable SaaS AI products built from the ground up to meet your business needs.', gradient: 'from-primary-600 to-secondary-600' }
                ].map((feature, index) => {
                  // Map gradient to color for hover fill
                  const getHoverColor = (gradient) => {
                    if (gradient.includes('primary-500') || gradient.includes('primary-600')) return 'bg-primary-500';
                    if (gradient.includes('secondary-500') || gradient.includes('secondary-600')) return 'bg-secondary-500';
                    if (gradient.includes('accent-500') || gradient.includes('accent-600')) return 'bg-accent-500';
                    return 'bg-secondary-500';
                  };
                  
                  return (
                    <motion.div
                      key={index}
                      className="feature-service-card group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Hover Fill Overlay - expands from top-right */}
                      <div className={`absolute top-0 right-0 w-20 h-20 ${getHoverColor(feature.gradient)} rounded-bl-full opacity-60 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10 transition-all duration-500 ease-in-out`} />
                      
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-secondary-100 rounded-bl-full opacity-60 group-hover:opacity-0 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-secondary-50 rounded-tr-full opacity-40 group-hover:opacity-0 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        {/* Feature Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        
                        {/* Feature Title */}
                        <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        
                        {/* Feature Description */}
                        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="mt-8 text-center">
                <Link 
                  to="/services" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View All Services
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="cta-section-content container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Connect with top-tier IT professionals or build innovative AI solutions that drive growth and efficiency.
          </p>
          <Link to="/contact" className="btn-accent text-lg px-8 py-4">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="testimonials-heading text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-gradient">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </div>
          
          {/* Testimonials Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Testimonials Slides Container */}
              <div className="relative overflow-hidden">
                <motion.div 
                  className="flex"
                  animate={{ 
                    x: `-${currentTestimonial * (isMobile ? 100 : 50)}%`,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  {/* Create pairs: show 2 at a time on desktop, 1 on mobile */}
                  {testimonialsData.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full lg:w-1/2 flex-shrink-0 min-w-full lg:min-w-[50%]"
                    >
                      <div className="px-3">
                        <div className="testimonial-card card p-6 md:p-8 h-full">
                          <div className="flex items-center mb-4">
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="w-14 h-14 rounded-full mr-4 border-4 border-primary-100"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 text-base md:text-lg">{testimonial.name}</h4>
                              <p className="text-gray-600 text-xs md:text-sm">{testimonial.role}</p>
                            </div>
                          </div>
                          <div className="flex mb-4 justify-center">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-0.5" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic text-sm md:text-base leading-relaxed text-center">
                            "{testimonial.text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Add first testimonial at the end for seamless loop */}
                  {testimonialsData.length > 0 && (
                    <div
                      className="w-full lg:w-1/2 flex-shrink-0 min-w-full lg:min-w-[50%]"
                    >
                      <div className="px-3">
                        <div className="testimonial-card card p-6 md:p-8 h-full">
                          <div className="flex items-center mb-4">
                            <img 
                              src={testimonialsData[0].avatar} 
                              alt={testimonialsData[0].name}
                              className="w-14 h-14 rounded-full mr-4 border-4 border-primary-100"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 text-base md:text-lg">{testimonialsData[0].name}</h4>
                              <p className="text-gray-600 text-xs md:text-sm">{testimonialsData[0].role}</p>
                            </div>
                          </div>
                          <div className="flex mb-4 justify-center">
                            {[...Array(testimonialsData[0].rating)].map((_, i) => (
                              <FaStar key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-0.5" />
                            ))}
                          </div>
                          <p className="text-gray-700 italic text-sm md:text-base leading-relaxed text-center">
                            "{testimonialsData[0].text}"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-primary-50 shadow-lg flex items-center justify-center z-20 transition-all hover:scale-110 border border-gray-200"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5 text-primary-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-primary-50 shadow-lg flex items-center justify-center z-20 transition-all hover:scale-110 border border-gray-200"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5 text-primary-600" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-primary-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={finalCtaRef} className="section-padding bg-white">
        <div className="final-cta-content container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Start Your <span className="text-gradient">Digital Transformation</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join businesses across Ireland and globally who trust Techera for their IT contracting 
            needs and AI-powered product development.
          </p>
          <div className="flex flex-row flex-wrap gap-2 sm:gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 whitespace-nowrap">
              Get Started
            </Link>
            <Link to="/services" className="btn-secondary text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-4 whitespace-nowrap">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
    </FrontLayout>
  );
};

export default Home; 