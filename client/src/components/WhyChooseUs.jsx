import React from 'react';
import { Smartphone, Package, Zap, Shield } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'No App Required',
      description: 'Experience AR directly in your web browser. Simply scan the QR code and start exploring.',
      gradient: 'hero-gradient'
    },
    {
      icon: Package,
      title: '3D Food Models',
      description: 'View realistic 3D models of every dish with accurate proportions and textures.',
      gradient: 'hero-gradient'
    },
    {
      icon: Zap,
      title: 'Instant Loading',
      description: 'Fast and seamless AR experience with optimized 3D models for mobile devices.',
      gradient: 'hero-gradient'
    },
    {
      icon: Shield,
      title: '100% Secure',
      description: 'Your privacy matters. No data collection, no tracking, just pure AR experience.',
      gradient: 'hero-gradient'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose AR Menu?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animation-delay-200">
            Experience the future of dining with cutting-edge AR technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary group animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
