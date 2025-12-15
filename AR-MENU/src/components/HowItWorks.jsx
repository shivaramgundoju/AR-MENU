import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Scan QR Code',
      description: 'Use your smartphone camera to scan the QR code on your table. No app download required!',
      icon: '📱',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: 2,
      title: 'Browse Menu',
      description: 'Explore our full menu with beautiful images and detailed descriptions of each dish.',
      icon: '🍽️',
      color: 'from-amber-500 to-orange-600'
    },
    {
      number: 3,
      title: 'View in AR',
      description: 'Tap any dish to see it in 3D augmented reality right on your table before ordering.',
      icon: '✨',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with AR dining in three simple steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-amber-200 to-purple-200 mx-auto" 
               style={{ width: '70%', left: '15%' }}>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                {/* Step Number Circle */}
                <div className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6 transform transition-all duration-300 hover:scale-110 hover:shadow-xl`}>
                  <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
                  <span className="text-5xl font-bold text-white relative z-10">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 transform transition-transform duration-300 hover:scale-125">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-8">
                    <div className="text-4xl text-gray-300">↓</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 sm:p-12 shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to Experience AR Dining?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Visit our restaurant and try it yourself. Transform the way you order food!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Find a Location
            </button>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-semibold text-gray-900 mb-2">Instant Access</h4>
            <p className="text-sm text-gray-600">No downloads or registrations needed</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-3xl mb-3">📐</div>
            <h4 className="font-semibold text-gray-900 mb-2">True to Size</h4>
            <p className="text-sm text-gray-600">See dishes at actual serving size</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="font-semibold text-gray-900 mb-2">360° View</h4>
            <p className="text-sm text-gray-600">Rotate and examine from every angle</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="text-3xl mb-3">💡</div>
            <h4 className="font-semibold text-gray-900 mb-2">Smart Ordering</h4>
            <p className="text-sm text-gray-600">Make informed choices every time</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;