import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, X } from 'lucide-react';

const ARViewPage = () => {
  const { dishId } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    tableNumber: '',
    quantity: 1
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://ar-menu-1.onrender.com/api/dishes/${dishId}`);
        
        if (!response.ok) {
          throw new Error('Dish not found');
        }
        
        const data = await response.json();
        setDish(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDish();
  }, [dishId]);

  // Check if device is mobile
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Handle Mobile AR (Scene Viewer for Android, AR Quick Look for iOS)
  const handleMobileAR = () => {
    if (!isMobile()) {
      setShowMobileWarning(true);
      setTimeout(() => setShowMobileWarning(false), 3000);
      return;
    }

    const modelUrl = dish.modelUrl;
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isIOS) {
      // iOS AR Quick Look
      const link = document.createElement('a');
      link.rel = 'ar';
      link.href = modelUrl;
      link.click();
    } else if (isAndroid) {
      // Android Scene Viewer
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(modelUrl)}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
      window.location.href = intentUrl;
    }
  };

  // Handle Web AR
  const handleWebAR = () => {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer && modelViewer.canActivateAR) {
      modelViewer.activateAR();
    }
  };

  // Handle Order Now
  const handleOrderNow = () => {
    setShowOrderModal(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', {
      dish: dish.name,
      ...orderForm
    });
    alert(`Order placed successfully!\n\nDish: ${dish.name}\nCustomer: ${orderForm.customerName}\nTable: ${orderForm.tableNumber}\nQuantity: ${orderForm.quantity}`);
    setShowOrderModal(false);
    setOrderForm({ customerName: '', tableNumber: '', quantity: 1 });
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setOrderForm({ customerName: '', tableNumber: '', quantity: 1 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading AR experience...</p>
        </div>
      </div>
    );
  }

  if (error || !dish) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center bg-gray-50 p-8 rounded-2xl shadow-lg max-w-md">
          <p className="text-red-600 text-xl mb-4">{error || 'Dish not found'}</p>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-3 hero-gradient text-white rounded-lg shadow-lg hover:shadow-xl transition-all border-0"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Menu</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* 3D Model Viewer */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100">
            <model-viewer
              src={dish.modelUrl}
              alt={dish.name}
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              camera-controls
              touch-action="pan-y"
              disable-pan
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="30deg"
              shadow-intensity="1"
              environment-image="neutral"
              exposure="1"
              camera-orbit="0deg 75deg 105%"
              min-camera-orbit="auto auto 50%"
              max-camera-orbit="auto auto 200%"
              field-of-view="30deg"
              interaction-prompt="auto"
              interaction-prompt-threshold="0"
              className="w-full"
              style={{
                width: '100%',
                height: 'clamp(300px, 50vh, 500px)',
                backgroundColor: 'transparent',
                touchAction: 'pan-y'
              }}
            >
              {/* Loading indicator */}
              <div slot="poster" className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
              </div>
              
              {/* AR Prompt */}
              <div
                slot="ar-button"
                className="hidden"
              ></div>
            </model-viewer>

            {/* AR Buttons */}
            <div className="mt-6 space-y-3">

              
              <button
                onClick={handleMobileAR}
                className="w-full hero-gradient text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl border-0"
              >
                <Smartphone className="w-5 h-5" />
                View in AR (Mobile App)
              </button>
            </div>

            {/* Mobile Warning */}
            {showMobileWarning && (
              <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
                Please open on a mobile device to view AR
              </div>
            )}

            {/* AR Instructions */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 font-semibold mb-2">AR Instructions:</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Use your fingers to rotate and zoom the model</li>
                <li>• Tap "View in AR" to place it in your space</li>
                <li>• Move your device to find a flat surface</li>
                <li>• The model will appear at real-world scale</li>
              </ul>
            </div>
          </div>

          {/* Dish Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{dish.name}</h1>
              <span className="inline-block bg-amber-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                {dish.category}
              </span>
            </div>

            <div>
              <p className="text-gray-600 text-lg leading-relaxed">{dish.description}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <p className="text-gray-700 text-sm mb-2">Price</p>
              <p className="text-5xl font-bold text-primary">₹{dish.price.toFixed(2)}</p>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrderNow}
              className="w-full hero-gradient text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-0"
            >
              Order Now
            </button>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why AR Menu?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>See exactly what you're ordering in 3D</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Place Your Order</h2>

            {/* Order Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Item */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">Item</label>
                <input
                  type="text"
                  value={dish.name}
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">Customer Name</label>
                <input
                  type="text"
                  value={orderForm.customerName}
                  onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              {/* Table Number */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">Table Number</label>
                <input
                  type="text"
                  value={orderForm.tableNumber}
                  onChange={(e) => setOrderForm({ ...orderForm, tableNumber: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter table number"
                />
              </div>

              {/* Number of Items */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">Number of Items</label>
                <input
                  type="number"
                  min="1"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: parseInt(e.target.value) || 1 })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full hero-gradient text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-0 mt-6"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}
                  <span>View realistic portions and presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Make confident food choices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>No surprises, just delicious food</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewPage;
