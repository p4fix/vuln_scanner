import React, { useEffect, useRef } from 'react';
import { Shield, Globe, Server, Settings, Zap, Cpu, Network, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const HomePage: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const services = servicesRef.current;
      if (services) {
        const rect = services.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          services.classList.add('animate-in');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Globe,
      title: 'Website Scanner',
      description: 'Analyze website accessibility and response details with comprehensive security checks.',
      color: 'blue',
      features: ['Status code analysis', 'Response time monitoring', 'Security header checks', 'SSL certificate validation']
    },
    {
      icon: Server,
      title: 'Port Scanner',
      description: 'Check if specific ports are open on target hosts with detailed port analysis.',
      color: 'purple',
      features: ['TCP/UDP scanning', 'Service detection', 'Port range scanning', 'Real-time results']
    },
    {
      icon: Settings,
      title: 'Banner Grabber',
      description: 'Extract banner information from open ports to identify services and versions.',
      color: 'green',
      features: ['Service identification', 'Version detection', 'Protocol analysis', 'Banner parsing']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-500/20',
        glow: 'hover:shadow-blue-500/25'
      },
      purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-500/20',
        glow: 'hover:shadow-purple-500/25'
      },
      green: {
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        text: 'text-green-400',
        hover: 'hover:bg-green-500/20',
        glow: 'hover:shadow-green-500/25'
      },
      yellow: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        text: 'text-yellow-400',
        hover: 'hover:bg-yellow-500/20',
        glow: 'hover:shadow-yellow-500/25'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="h-24 w-24 text-blue-400 float" />
              <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white font-serif tracking-wide neon-text">
              Vulnerability Scanner
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Advanced security analysis tool for comprehensive vulnerability assessment, 
              port scanning, and service identification with real-time results.
            </p>
          </div>

          <div className="flex justify-center space-x-8 pt-8">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Real-time Scanning</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Secure API</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">Fast Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="space-y-12 opacity-0 transition-all duration-1000 ease-out">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white font-serif">
            Our Services
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Comprehensive security scanning tools designed for educational and authorized testing purposes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <div
                key={index}
                className={`card-3d service-card rounded-xl p-8 text-center group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${colorClasses.border} ${colorClasses.hover} ${colorClasses.glow} stagger-animation`}
              >
                <div className="space-y-6">
                  {/* Icon with floating animation */}
                  <div className="flex justify-center">
                    <div className={`p-4 rounded-full ${colorClasses.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-12 w-12 ${colorClasses.text} float`} />
                    </div>
                  </div>

                  {/* Title with pop-up effect */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white text-pop group-hover:scale-105 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-blue-200 leading-relaxed text-pop group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 text-left">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className={`h-4 w-4 ${colorClasses.text} flex-shrink-0`} />
                        <span className="text-blue-200 text-pop group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex justify-center pt-4">
                    <ArrowRight className={`h-6 w-6 ${colorClasses.text} group-hover:translate-x-2 transition-transform duration-300`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white font-serif">
            Advanced Features
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Built with modern technologies and security best practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: 'Secure API',
              description: 'Rate-limited API with authentication and comprehensive security measures',
              color: 'blue'
            },
            {
              icon: Cpu,
              title: 'Real-time Processing',
              description: 'Instant results with optimized scanning algorithms',
              color: 'purple'
            },
            {
              icon: Network,
              title: 'Network Analysis',
              description: 'Comprehensive network scanning and service detection',
              color: 'green'
            },
            {
              icon: Zap,
              title: 'Fast Performance',
              description: 'Optimized for speed without compromising accuracy',
              color: 'yellow'
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = getColorClasses(feature.color);
            
            return (
              <div
                key={index}
                className={`card-3d service-card rounded-xl p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 ${colorClasses.border} ${colorClasses.hover}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-full ${colorClasses.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${colorClasses.text}`} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white text-pop group-hover:scale-105 transition-transform duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-blue-200 text-sm text-pop group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security Notice Section */}
      <section className="space-y-8">
        <div className="card-3d rounded-xl p-8 border border-yellow-500/20 glow-warning">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Security Notice
              </h3>
              <div className="space-y-3 text-blue-200">
                <p className="leading-relaxed">
                  This vulnerability scanner is designed for educational and authorized security testing purposes only. 
                  Always ensure you have explicit permission before scanning any systems you do not own.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <Info className="h-4 w-4 text-yellow-400" />
                  <span>Use responsibly and only on systems you own or have explicit permission to test.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-8">
        <div className="card-3d rounded-xl p-12 border border-blue-500/20 glow">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Start Scanning?
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive suite of security scanning tools and start your vulnerability assessment today.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-3d px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105">
                Get Started
              </button>
              <button className="btn-3d px-8 py-3 rounded-lg font-medium text-blue-200 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 