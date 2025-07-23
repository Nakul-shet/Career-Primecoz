import React, { useState } from 'react';
import { Lock, Shield, Check, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);

  const selectedPlan = localStorage.getItem('selectedPlan') || 'premium';
  const planDetails = {
    basic: { name: 'Basic Plan', price: 2900 },
    premium: { name: 'Premium Plan', price: 4900 },
    pro: { name: 'Pro Plan', price: 7900 },
  };
  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.premium;
  const currentPrice = currentPlan.price;
  const priceInRupees = currentPrice / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePayment = () => {
    const { name, email } = formData;
    if (!name || !email) return;

    const options = {
      key: 'rzp_test_9p6UdZJbsyIYqS', // rzp_test_9p6UdZJbsyIYqS✅rzp_test_uZ2ZadkDxE2s56 CHANGE THIS to your Razorpay test/live key
      amount: currentPrice, // in paise
      currency: 'INR',
      name: 'PrimeCoz',
      description: currentPlan.name,
      handler: function (response: any) {
        const password = 'bpo' + Math.floor(100000 + Math.random() * 900000);
        setCredentials({ email, password });
      },
      prefill: {
        name,
        email,
      },
      notes: {
        plan: currentPlan.name,
      },
      theme: {
        color: '#6366F1',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  React.useEffect(() => {
    loadRazorpay();
  }, []);

  if (credentials) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-green-700">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Welcome to PrimeCoz! Your account has been created.</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="text-left space-y-2">
              <div><span className="font-semibold">Email:</span> {credentials.email}</div>
              <div><span className="font-semibold">Password:</span> {credentials.password}</div>
            </div>
          </div>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Unlock Your BPO Success</h1>
          <div className="text-sm text-indigo-600 font-semibold mb-2">{currentPlan.name}</div>
          <div className="text-3xl font-bold text-indigo-600 mb-2">₹{priceInRupees}</div>
          <p className="text-gray-500 mb-2">One-time payment. Instant access. No recurring fees.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Enter Your Details</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center"
          >
            <Lock className="h-5 w-5 mr-2" />
            Pay ₹{priceInRupees} & Start Learning
          </button>
          <div className="text-center text-sm text-gray-500 mt-3">
            <Shield className="h-4 w-4 inline mr-1" />
            Your payment is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
