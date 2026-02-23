import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaAward, FaUsers, FaStar, FaCheckCircle } from 'react-icons/fa';
import FrontLayout from '../../../components/layout/Front';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const missionRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Mission animations
    gsap.fromTo('.mission-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Team animations
    gsap.fromTo('.team-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      experience: '15+ years',
      bio: 'Sarah founded Techera with a vision to revolutionize IT contracting and AI product development. Her expertise in technology and innovation has driven the company\'s success in Ireland and globally.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & AI Lead',
      experience: '12+ years',
      bio: 'Michael specializes in AI and machine learning solutions. His technical expertise and innovative approach have helped build cutting-edge AI products for numerous businesses.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Emily Chen',
      role: 'Head of IT Contracting',
      experience: '10+ years',
      bio: 'Emily leads our IT contracting division, connecting businesses with top-tier IT professionals. Her extensive network ensures we deliver the best talent for every project.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'David Thompson',
      role: 'Operations Director',
      experience: '10+ years',
      bio: 'David ensures smooth operations and exceptional service delivery. He coordinates our projects and maintains our high standards for quality and client satisfaction.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const stats = [
    { number: '200+', label: 'Active Clients', icon: FaHeart },
    { number: '500+', label: 'IT Professionals', icon: FaAward },
    { number: '50+', label: 'AI Products Delivered', icon: FaUsers },
    { number: '4.9', label: 'Client Rating', icon: FaStar }
  ];

  return (
    <FrontLayout>
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-gradient">Techera</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Techera is a Dublin-based IT company established in 2025, delivering high-quality IT contracting services and building innovative AI-powered products for modern businesses.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section ref={missionRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We specialize in connecting organizations with top-tier IT professionals while simultaneously developing intelligent, scalable AI solutions that help businesses automate, optimize, and grow.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                At Techera, we combine technical expertise with forward-thinking innovation to drive digital transformation.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'Innovation', description: 'Cutting-edge AI and technology solutions' },
                  { title: 'Expertise', description: 'Top-tier IT professionals and specialists' },
                  { title: 'Scalability', description: 'Solutions that grow with your business' },
                  { title: 'Reliability', description: 'Consistent quality and timely delivery' }
                ].map((value, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary-200/50 hover:-translate-y-1 hover:bg-white"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mission-card">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="IT and AI technology"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <FaHeart className="w-12 h-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
                <div className="text-lg">Active Clients</div>
              </div>

              <div className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <FaAward className="w-12 h-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-lg">IT Professionals</div>
              </div>

              <div className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <FaUsers className="w-12 h-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
                <div className="text-lg">AI Products Delivered</div>
              </div>

              <div className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <FaStar className="w-12 h-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
                <div className="text-lg">Client Rating</div>
              </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our expert team of IT professionals, AI engineers, and technology specialists are dedicated to 
              delivering innovative solutions and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="team-card card p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face" 
                alt="Sarah Mitchell"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Mitchell</h3>
              <p className="text-primary-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-sm text-gray-500 mb-4">15+ years experience</p>
              <p className="text-gray-600 text-sm">Sarah founded Techera with a vision to revolutionize IT contracting and AI product development. Her expertise in technology and innovation has driven the company's success in Ireland and globally.</p>
            </div>

            <div className="team-card card p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                alt="Michael Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Michael Rodriguez</h3>
              <p className="text-primary-600 font-medium mb-2">CTO & AI Lead</p>
              <p className="text-sm text-gray-500 mb-4">12+ years experience</p>
              <p className="text-gray-600 text-sm">Michael specializes in AI and machine learning solutions. His technical expertise and innovative approach have helped build cutting-edge AI products for numerous businesses.</p>
            </div>

            <div className="team-card card p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" 
                alt="Emily Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Emily Chen</h3>
              <p className="text-primary-600 font-medium mb-2">Head of IT Contracting</p>
              <p className="text-sm text-gray-500 mb-4">10+ years experience</p>
              <p className="text-gray-600 text-sm">Emily leads our IT contracting division, connecting businesses with top-tier IT professionals. Her extensive network ensures we deliver the best talent for every project.</p>
            </div>

            <div className="team-card card p-6 text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                alt="David Thompson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">David Thompson</h3>
              <p className="text-primary-600 font-medium mb-2">Operations Director</p>
              <p className="text-sm text-gray-500 mb-4">10+ years experience</p>
              <p className="text-gray-600 text-sm">David ensures smooth operations and exceptional service delivery. He coordinates our projects and maintains our high standards for quality and client satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Story</span>
            </h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                Techera was established in 2025 in Dublin, Ireland, with a vision to bridge the gap 
                between businesses and top-tier IT talent while simultaneously developing innovative 
                AI-powered solutions. Our founder, Sarah Mitchell, recognized the growing need for 
                intelligent technology solutions and reliable IT contracting services.
              </p>
              <p>
                What started as a Dublin-based IT company has quickly grown into a comprehensive 
                technology partner serving businesses across Ireland and globally. We've maintained 
                our commitment to quality, innovation, and client success while revolutionizing 
                how businesses approach IT contracting and AI product development.
              </p>
              <p>
                Today, we're proud to serve hundreds of businesses, connecting them with exceptional 
                IT professionals and delivering AI solutions that drive digital transformation and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business with Techera?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join businesses across Ireland and globally who trust Techera for their IT contracting 
            needs and AI-powered product development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-accent text-lg px-8 py-4">
              Get Started
            </a>
            <a href="/services" className="btn-secondary text-lg px-8 py-4">
              Explore Services
            </a>
          </div>
        </div>
      </section>
    </div>
    </FrontLayout>
  );
};

export default About; 