import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Target, 
  BookOpen, 
  Users, 
  Award,
  CheckCircle,
  Star,
  Calendar,
  Video,
  Download
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Target className="h-8 w-8 text-indigo-600 mr-2" />
                <span className="text-2xl font-extrabold tracking-tight text-indigo-700">PrimeCoz</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Features</a>
              <a href="#comparison" className="text-gray-500 hover:text-gray-900 transition-colors">Voice vs Non-Voice</a>
              <a href="#study-plan" className="text-gray-500 hover:text-gray-900 transition-colors">Study Plan</a>
              <Link to="/login" className="text-gray-500 hover:text-gray-900 transition-colors">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-blue-50 to-white text-gray-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
          <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
            <circle cx="80%" cy="20%" r="200" fill="#c7d2fe" fillOpacity="0.18" />
            <circle cx="20%" cy="80%" r="180" fill="#a5b4fc" fillOpacity="0.12" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left relative z-10 gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <Target className="h-16 w-16 text-indigo-600 mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              Your BPO Success Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl font-medium">
              PrimeCoz gives you the skills, confidence, and real practice to ace every BPO interview—voice or non-voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 w-full">
              <Link
                to="/subscribe"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Learning Now
              </Link>
              <Link
                to="/login"
                className="bg-white border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 px-10 py-5 rounded-xl text-xl font-bold transition-all duration-200"
              >
                Member Login
              </Link>
            </div>
            <div className="flex flex-col items-center lg:items-start mt-2">
              <span className="text-sm text-gray-500 mb-2">Trusted by 2,000+ learners</span>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="ml-2 text-gray-700 font-semibold">4.9/5.0</span>
              </div>
            </div>
          </div>
          {/* Right: Illustration */}
          <div className="flex-1 flex justify-center items-center mt-12 lg:mt-0">
            <svg width="340" height="220" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
              <rect x="20" y="40" width="300" height="140" rx="18" fill="#EEF2FF" />
              <rect x="40" y="60" width="260" height="100" rx="12" fill="#C7D2FE" />
              <rect x="60" y="80" width="220" height="60" rx="8" fill="#6366F1" fillOpacity="0.15" />
              <rect x="80" y="100" width="180" height="20" rx="4" fill="#6366F1" fillOpacity="0.25" />
              <rect x="80" y="130" width="120" height="12" rx="3" fill="#6366F1" fillOpacity="0.18" />
              <circle cx="170" cy="170" r="18" fill="#6366F1" fillOpacity="0.18" />
              <rect x="120" y="170" width="100" height="8" rx="2" fill="#6366F1" fillOpacity="0.12" />
              <rect x="60" y="60" width="40" height="10" rx="3" fill="#6366F1" fillOpacity="0.18" />
              <rect x="240" y="60" width="60" height="10" rx="3" fill="#6366F1" fillOpacity="0.18" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You'll Master
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed in BPO interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Interview Q&A</h3>
              <p className="text-gray-600">
                Comprehensive question bank covering behavioral, technical, and situational questions for both voice and non-voice roles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-teal-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Soft Skills Training</h3>
              <p className="text-gray-600">
                Develop essential soft skills like active listening, empathy, patience, and conflict resolution.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Assessment Tools</h3>
              <p className="text-gray-600">
                Practice with typing tests, pronunciation guides, and mock interview scenarios.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">STAR Method</h3>
              <p className="text-gray-600">
                Master the STAR technique for answering behavioral questions effectively.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Study Plans</h3>
              <p className="text-gray-600">
                Structured 7-day study plans tailored for voice and non-voice preparations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Video className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Video Resources</h3>
              <p className="text-gray-600">
                Curated YouTube videos and practice materials for comprehensive preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice vs Non-Voice Comparison */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Voice vs Non-Voice Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the key differences between voice and non-voice BPO roles
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600">Voice-Based</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-teal-600">Non-Voice-Based</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Communication Type</td>
                  <td className="px-6 py-4 text-gray-600">Phone calls, voice chats</td>
                  <td className="px-6 py-4 text-gray-600">Email, chat, tickets</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Key Skills</td>
                  <td className="px-6 py-4 text-gray-600">Pronunciation, listening, speaking</td>
                  <td className="px-6 py-4 text-gray-600">Typing, grammar, writing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Response Time</td>
                  <td className="px-6 py-4 text-gray-600">Immediate, real-time</td>
                  <td className="px-6 py-4 text-gray-600">Flexible, can be delayed</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Work Environment</td>
                  <td className="px-6 py-4 text-gray-600">Noise-controlled, headsets</td>
                  <td className="px-6 py-4 text-gray-600">Quiet, computer-focused</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Multitasking</td>
                  <td className="px-6 py-4 text-gray-600">Limited while on call</td>
                  <td className="px-6 py-4 text-gray-600">High, multiple chats/tickets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sample Interview Questions
            </h2>
            <p className="text-xl text-gray-600">
              Practice with real interview questions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <Phone className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-600">Voice-Based Questions</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">How do you handle an angry customer on the phone?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Role play: Customer has an unexpected query about their account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">How do you ensure clear communication with customers?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Describe a time you turned a negative call into a positive experience</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-6 w-6 text-teal-600 mr-2" />
                <h3 className="text-xl font-semibold text-teal-600">Non-Voice Questions</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">How do you respond to a customer complaint over email?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">How do you prioritize two urgent tickets simultaneously?</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Describe your approach to maintaining quality in written communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">How do you handle multiple chat conversations at once?</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Study Plan */}
      <section id="study-plan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              7-Day Study Plan
            </h2>
            <p className="text-xl text-gray-600">
              Structured preparation schedule for success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { day: 1, title: "Resume & Profile", focus: "CV optimization, LinkedIn profile" },
              { day: 2, title: "Industry Knowledge", focus: "BPO basics, company research" },
              { day: 3, title: "Typing & Skills", focus: "Typing test, grammar practice" },
              { day: 4, title: "Voice Training", focus: "Pronunciation, accent neutralization" },
              { day: 5, title: "Mock Interviews", focus: "Practice sessions, feedback" },
              { day: 6, title: "Soft Skills", focus: "Communication, problem-solving" },
              { day: 7, title: "Final Review", focus: "Confidence building, last-minute prep" }
            ].map((item) => (
              <div key={item.day} className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {item.day}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ace Your BPO Interview?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful candidates who prepared with our platform
          </p>
          <Link
            to="/subscribe"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center"
          >
            <Download className="h-5 w-5 mr-2" />
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">BPO Interview Prep</span>
              </div>
              <p className="text-gray-400">
                Your ultimate destination for BPO interview preparation and career success.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#comparison" className="hover:text-white transition-colors">Comparison</a></li>
                <li><a href="#study-plan" className="hover:text-white transition-colors">Study Plan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Member Login</Link></li>
                <li><Link to="/subscribe" className="hover:text-white transition-colors">Subscribe</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BPO Interview Prep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;