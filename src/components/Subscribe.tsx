import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  ArrowLeft,
  Star,
  Crown,
  Zap,
  ArrowRight
} from 'lucide-react';

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const navigate = useNavigate();

  const plans = {
    basic: {
      name: 'Basic Plan',
      price: 29,
      features: [
        'Basic interview questions',
        'Email support',
        'Study materials',
        'Basic assessment tools'
      ],
      icon: Star,
      color: 'blue'
    },
    premium: {
      name: 'Premium Plan',
      price: 49,
      features: [
        'All Basic features',
        'Advanced interview scenarios',
        'Video tutorials',
        'Priority support',
        'Mock interview sessions',
        'Personalized feedback'
      ],
      icon: Crown,
      color: 'purple'
    },
    pro: {
      name: 'Pro Plan',
      price: 79,
      features: [
        'All Premium features',
        '1-on-1 coaching sessions',
        'Industry expert mentorship',
        'Custom study plan',
        'Unlimited practice tests',
        'Career guidance'
      ],
      icon: Zap,
      color: 'orange'
    }
  };

  const handleContinueToPayment = () => {
    // Store selected plan in localStorage or pass as query param
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Select the perfect plan for your BPO interview preparation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(plans).map(([planKey, plan]) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === planKey;
            
            return (
              <div
                key={planKey}
                className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? `border-${plan.color}-500 bg-${plan.color}-50 shadow-lg transform scale-105` 
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                }`}
                onClick={() => setSelectedPlan(planKey)}
              >
                {isSelected && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 bg-${plan.color}-500 text-white px-4 py-1 rounded-full text-sm font-semibold`}>
                    Selected
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-16 h-16 bg-${plan.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`h-8 w-8 text-${plan.color}-600`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">₹{plan.price}</div>
                  <p className="text-gray-500 mb-6">per month</p>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinueToPayment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
          >
            Continue to Payment
            <ArrowRight className="h-6 w-6 ml-2" />
          </button>
          
          <p className="text-gray-500 mt-4">
            You'll be redirected to our secure payment page
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose PrimeCoz?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Success</h3>
              <p className="text-gray-600">2,000+ learners have successfully landed BPO jobs using our platform</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Content</h3>
              <p className="text-gray-600">500+ questions, practice tests, and study materials for both voice and non-voice roles</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Get help from industry experts and personalized feedback on your progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;