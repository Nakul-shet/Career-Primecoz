import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Check, 
  CreditCard, 
  Lock, 
  ArrowLeft,
  Shield,
  Zap
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_');

// const PaymentForm: React.FC<{ email: string, amount: number, onSuccess: (credentials: { email: string, password: string }) => void }> = ({ email, amount, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState('');
//   const priceInRupees = amount / 100;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     setError('');
    
//     try {
//       // Create payment intent for the selected plan price
//       const intentRes = await axios.post('http://localhost:3000/create-payment-intent', { 
//         amount: amount 
//       });
      
//       const clientSecret = intentRes.data.clientSecret;
      
//       if (!stripe || !elements) return;
      
//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) return;
      
//       const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: { email },
//         },
//       });
      
//       if (stripeError) {
//         setError(stripeError.message || 'Payment failed');
//         setIsProcessing(false);
//         return;
//       }
      
//       if (paymentIntent && paymentIntent.status === 'succeeded') {
//         // Generate credentials
//         const password = 'bpo' + Math.floor(100000 + Math.random() * 900000);
//         onSuccess({ email, password });
//       } else {
//         setError('Payment did not succeed.');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || 'Payment failed. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

interface Props {
  amount: number;          // amount in paise (e.g. 3300 for ₹33)
  email: string;           // customer email from form input/state
  customerName: string;    // customer full name from form input/state
  onSuccess: (creds: { email: string; password: string }) => void;
}

const PaymentForm: React.FC<Props> = ({ amount, email, customerName, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    // Basic validation - you can enhance as needed
    if (!customerName || customerName.trim() === '') {
      setError('Please enter your full name.');
      setIsProcessing(false);
      return;
    }
    if (!email || email.trim() === '') {
      setError('Please enter your email address.');
      setIsProcessing(false);
      return;
    }
    if (!amount || amount <= 0) {
      setError('Invalid amount.');
      setIsProcessing(false);
      return;
    }

    try {
      if (!stripe || !elements) {
        setError('Stripe has not loaded yet. Please try again later.');
        setIsProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError('Please enter your card information.');
        setIsProcessing(false);
        return;
      }

      // Description - customize this string as per your product/plans
      const description = `Payment for subscription by ${customerName}`;

      // Call your backend to create PaymentIntent with required data
      const response = await axios.post('http://localhost:3000/create-payment-intent', {
        amount,
        description,
        customerName,
        customerEmail: email,
        // Optionally include shippingAddress if needed:
        // shippingAddress: {
        //   line1: 'Some address',
        //   city: 'City',
        //   state: 'State',
        //   postal_code: '123456',
        //   country: 'IN',
        // }
      });

      const clientSecret = response.data.clientSecret;

      // Confirm card payment using client secret and billing details
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            email: email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed.');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful - generate password or do next step
        const password = 'bpo' + Math.floor(100000 + Math.random() * 900000);
        onSuccess({ email, password });
      } else {
        setError('Payment did not succeed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Payment error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
        <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
          <CardElement 
            options={{ 
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} 
          />
        </div>
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      <button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="h-5 w-5 mr-2" />
            Pay ₹{amount} & Start Learning
          </>
        )}
      </button>
      
      <div className="text-center text-sm text-gray-500">
        <Shield className="h-4 w-4 inline mr-1" />
        Your payment is secure and encrypted
      </div>
    </form>
  );
};

const Payment = () => {
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [credentials, setCredentials] = useState<{ email: string, password: string } | null>(null);
  const navigate = useNavigate();

  // Get selected plan from localStorage
  const selectedPlan = localStorage.getItem('selectedPlan') || 'premium';
  
  // Plan details
  const planDetails = {
    basic: { name: 'Basic Plan', price: 2900 },    // ₹29
    premium: { name: 'Premium Plan', price: 4900 }, // ₹49
    pro: { name: 'Pro Plan', price: 7900 }         // ₹79
  };
  
  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.premium;
  const currentPrice = currentPlan.price;
  const priceInRupees = currentPrice / 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            <p className="text-sm text-gray-600 mb-2">Your login credentials:</p>
            <div className="text-left space-y-2">
              <div><span className="font-semibold">Email:</span> {credentials.email}</div>
              <div><span className="font-semibold">Password:</span> {credentials.password}</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mb-6">
            Please save these credentials. You can change your password after logging in.
          </div>
          
          <button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
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

        {/* Features and Payment Side by Side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Features Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 md:mb-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">What You'll Get</h2>
            <ul className="space-y-5">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">Complete Interview Q&A</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">Practice Tests & Mock Interviews</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">7-Day Study Plans</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">Curated Video Resources</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">Lifetime Access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-800 font-medium">Priority Support</span>
              </li>
            </ul>
            <div className="mt-8 text-center text-gray-500 text-sm">
              <Shield className="h-4 w-4 inline mr-1" /> Secure payment. Instant access after payment.
            </div>
          </div>

          {/* Payment Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Payment Details</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            {formData.email && formData.name && (
              <Elements stripe={stripePromise}>
                <PaymentForm email={formData.email} amount={currentPrice} onSuccess={setCredentials} customerName={formData.name} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 