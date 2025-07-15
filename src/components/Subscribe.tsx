import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Check, 
  CreditCard, 
  Lock, 
  ArrowLeft,
  Star,
  Crown,
  Zap
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Replace with your Stripe test publishable key

const PaymentForm: React.FC<{ email: string, onSuccess: (credentials: { email: string, password: string }) => void }> = ({ email, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    try {
      // Create payment intent on backend (33 INR = 3300 paise)
      const intentRes = await axios.post('http://localhost:3000/create-payment-intent', { amount: 3300 });
      const clientSecret = intentRes.data.clientSecret;
      if (!stripe || !elements) return;
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email },
        },
      });
      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsProcessing(false);
        return;
      }
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Generate credentials (simulate or call backend)
        const password = 'bpo' + Math.floor(100000 + Math.random() * 900000);
        onSuccess({ email, password });
      } else {
        setError('Payment did not succeed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
        <div className="border rounded px-3 py-2 bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" disabled={!stripe || isProcessing} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {isProcessing ? 'Processing...' : 'Pay ₹33'}
      </button>
    </form>
  );
};

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [credentials, setCredentials] = useState<{ email: string, password: string } | null>(null);
  const [showPayment, setShowPayment] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (credentials) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Payment Successful!</h2>
          <p className="mb-2">Your login credentials:</p>
          <div className="mb-2"><b>Email:</b> {credentials.email}</div>
          <div className="mb-4"><b>Password:</b> {credentials.password}</div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Select the perfect plan for your BPO interview preparation</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plans Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Available Plans</h2>
            {Object.entries(plans).map(([planKey, plan]) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={planKey}
                  className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedPlan === planKey ? `border-${plan.color}-500 bg-${plan.color}-50` : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setSelectedPlan(planKey)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg bg-${plan.color}-100 mr-4`}>
                        <IconComponent className={`h-6 w-6 text-${plan.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <p className="text-2xl font-bold text-gray-900">₹{planKey === 'basic' ? 29 : planKey === 'premium' ? 49 : 79}/month</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="plan"
                      value={planKey}
                      checked={selectedPlan === planKey}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className={`h-4 w-4 text-${plan.color}-600 focus:ring-${plan.color}-500 border-gray-300`}
                    />
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
            {formData.email && formData.name && (
              <Elements stripe={stripePromise}>
                <PaymentForm email={formData.email} onSuccess={setCredentials} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;