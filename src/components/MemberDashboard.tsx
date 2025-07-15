import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Video, 
  Target, 
  Users, 
  Calendar,
  Star,
  Phone,
  MessageCircle,
  LogOut,
  CheckCircle,
  Download,
  Play,
  Clock,
  Award
} from 'lucide-react';

const MemberDashboard = () => {
  const { isMemberLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isMemberLoggedIn) {
      navigate('/login');
    }
  }, [isMemberLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'questions', label: 'Interview Q&A', icon: BookOpen },
    { id: 'videos', label: 'Video Resources', icon: Video },
    { id: 'assessment', label: 'Assessment Tools', icon: Award },
    { id: 'study-plan', label: 'Study Plan', icon: Calendar },
    { id: 'soft-skills', label: 'Soft Skills', icon: Users }
  ];

  const interviewQuestions = {
    voice: [
      {
        question: "How do you handle an angry customer on the phone?",
        answer: "I remain calm and listen actively to understand their concern. I acknowledge their frustration, apologize for the inconvenience, and focus on finding a solution. I use a calm, empathetic tone and ensure they feel heard before proposing next steps."
      },
      {
        question: "Describe a time you dealt with a difficult customer call.",
        answer: "Using the STAR method: Situation - A customer called upset about a billing error. Task - I needed to resolve the issue and retain the customer. Action - I listened carefully, verified the information, corrected the billing error, and offered a goodwill gesture. Result - The customer was satisfied and thanked me for my patience."
      },
      {
        question: "How do you ensure clear communication during calls?",
        answer: "I speak clearly and at an appropriate pace, use simple language, repeat important information, and ask clarifying questions. I also confirm understanding by summarizing key points and asking if the customer has any questions."
      }
    ],
    nonVoice: [
      {
        question: "How do you manage multiple chat conversations simultaneously?",
        answer: "I prioritize based on urgency and complexity, use templates for common responses while personalizing each interaction, maintain organized notes, and ensure response times meet SLA requirements. I also use status indicators to manage customer expectations."
      },
      {
        question: "Describe your approach to written customer service.",
        answer: "I focus on clear, professional communication using proper grammar and spelling. I structure responses with a greeting, acknowledgment of the issue, solution or next steps, and a professional closing. I ensure tone is empathetic and helpful."
      },
      {
        question: "How do you handle technical issues in email support?",
        answer: "I gather detailed information about the issue, research solutions using available resources, provide step-by-step instructions, and follow up to ensure resolution. If needed, I escalate to technical teams with comprehensive documentation."
      }
    ]
  };

  const videoResources = [
    {
      title: "STAR Interview Technique Masterclass",
      duration: "15:30",
      category: "Interview Skills",
      description: "Learn the STAR method for answering behavioral questions effectively"
    },
    {
      title: "Mock Call Practice - Angry Customer",
      duration: "12:45",
      category: "Voice Skills",
      description: "Practice handling difficult customer calls with real scenarios"
    },
    {
      title: "Professional Email Writing for Customer Service",
      duration: "18:20",
      category: "Non-Voice Skills",
      description: "Master the art of professional email communication"
    },
    {
      title: "Accent Neutralization Techniques",
      duration: "22:15",
      category: "Communication",
      description: "Improve your pronunciation and accent for better clarity"
    },
    {
      title: "Building Empathy in Customer Service",
      duration: "14:55",
      category: "Soft Skills",
      description: "Develop emotional intelligence for better customer interactions"
    }
  ];

  const assessmentTools = [
    {
      name: "Typing Speed Test",
      description: "Test your typing speed and accuracy",
      tool: "Practice on Typing.com",
      target: "40+ WPM with 95% accuracy"
    },
    {
      name: "Grammar Assessment",
      description: "Evaluate your written communication skills",
      tool: "Grammarly exercises",
      target: "90%+ accuracy in grammar tests"
    },
    {
      name: "Pronunciation Check",
      description: "Improve your pronunciation and clarity",
      tool: "Orai, YouGlish practice",
      target: "Clear, neutral accent"
    },
    {
      name: "Mock Interview Practice",
      description: "Practice with simulated interview scenarios",
      tool: "Role-play exercises",
      target: "Confident, professional responses"
    }
  ];

  const studyPlan = [
    {
      day: 1,
      title: "Resume & Profile Optimization",
      tasks: [
        "Update your resume with relevant BPO skills",
        "Optimize LinkedIn profile",
        "Practice elevator pitch",
        "Research target companies"
      ]
    },
    {
      day: 2,
      title: "Industry Knowledge",
      tasks: [
        "Learn BPO industry basics",
        "Understand voice vs non-voice processes",
        "Study common BPO terminologies",
        "Research industry trends"
      ]
    },
    {
      day: 3,
      title: "Technical Skills Assessment",
      tasks: [
        "Take typing speed test",
        "Practice grammar exercises",
        "Test computer skills",
        "Familiarize with common software"
      ]
    },
    {
      day: 4,
      title: "Voice Training",
      tasks: [
        "Practice pronunciation exercises",
        "Work on accent neutralization",
        "Record and review voice samples",
        "Practice speaking clearly"
      ]
    },
    {
      day: 5,
      title: "Mock Interview Practice",
      tasks: [
        "Practice common interview questions",
        "Record mock interview sessions",
        "Get feedback on responses",
        "Refine your answers"
      ]
    },
    {
      day: 6,
      title: "Soft Skills Development",
      tasks: [
        "Practice active listening",
        "Develop empathy skills",
        "Learn conflict resolution",
        "Practice time management"
      ]
    },
    {
      day: 7,
      title: "Final Preparation",
      tasks: [
        "Review all materials",
        "Practice confidence-building exercises",
        "Prepare questions to ask interviewer",
        "Finalize interview logistics"
      ]
    }
  ];

  const softSkills = [
    {
      skill: "Active Listening",
      description: "Pay full attention to what customers are saying, ask clarifying questions, and summarize to confirm understanding.",
      tips: [
        "Focus completely on the speaker",
        "Avoid interrupting",
        "Ask open-ended questions",
        "Paraphrase to confirm understanding"
      ]
    },
    {
      skill: "Empathy",
      description: "Understand and share the feelings of customers, showing genuine concern for their problems.",
      tips: [
        "Put yourself in customer's shoes",
        "Use empathetic language",
        "Acknowledge their feelings",
        "Show genuine concern"
      ]
    },
    {
      skill: "Patience",
      description: "Maintain composure and remain calm when dealing with frustrated or confused customers.",
      tips: [
        "Take deep breaths",
        "Speak slowly and clearly",
        "Give customers time to explain",
        "Stay positive and solution-focused"
      ]
    },
    {
      skill: "Problem-Solving",
      description: "Identify issues quickly and find effective solutions that satisfy customer needs.",
      tips: [
        "Ask probing questions",
        "Analyze root causes",
        "Consider multiple solutions",
        "Follow up to ensure resolution"
      ]
    }
  ];

  if (!isMemberLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">BPO Interview Prep Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome to Your Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900">Progress</h3>
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">75%</p>
                  <p className="text-blue-700">Course Completion</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-900">Practice Sessions</h3>
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">24</p>
                  <p className="text-green-700">Completed</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-900">Study Streak</h3>
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">7</p>
                  <p className="text-purple-700">Days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setActiveTab('questions')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="text-blue-700 font-medium">Practice Interview Questions</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('videos')}
                      className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Video className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-green-700 font-medium">Watch Training Videos</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('assessment')}
                      className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="text-purple-700 font-medium">Take Assessment</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Completed Voice Training Module</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Practiced 20 Interview Questions</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Completed Typing Assessment</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Questions & Answers</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-blue-600">Voice-Based Questions</h3>
                  </div>
                  <div className="space-y-4">
                    {interviewQuestions.voice.map((item, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">{item.question}</h4>
                        <p className="text-blue-800 text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-teal-600 mr-2" />
                    <h3 className="text-xl font-semibold text-teal-600">Non-Voice Questions</h3>
                  </div>
                  <div className="space-y-4">
                    {interviewQuestions.nonVoice.map((item, index) => (
                      <div key={index} className="bg-teal-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-teal-900 mb-2">{item.question}</h4>
                        <p className="text-teal-800 text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoResources.map((video, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="mr-4">{video.duration}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {video.category}
                          </span>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full ml-4">
                        <Play className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assessment' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Tools</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assessmentTools.map((tool, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 mb-4">{tool.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-700">Tool: {tool.tool}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Target className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-gray-700">Target: {tool.target}</span>
                      </div>
                    </div>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Start Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'study-plan' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Study Plan</h2>
              
              <div className="space-y-6">
                {studyPlan.map((day, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {day.day}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {day.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'soft-skills' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Soft Skills Development</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {softSkills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{skill.skill}</h3>
                    <p className="text-gray-600 mb-4">{skill.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Tips:</h4>
                      <ul className="space-y-1">
                        {skill.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;