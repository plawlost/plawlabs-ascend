import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaBolt, FaGlobe, FaDollarSign, FaBook, FaRocket, 
  FaLock, FaBrain, FaChartLine, FaHeartbeat, FaRobot, 
  FaVrCardboard, FaDatabase, FaWifi, FaSolarPanel 
} from 'react-icons/fa';
import Select from 'react-select';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import Recharts components
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

import { Header, Footer } from './LandingPage';

const API_BASE_URL = 'https://ascend-api.replit.app';

const JoinElite = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topSkills: [],
    yearsOfExperience: '',
    linkedinUrl: '',
    whyElite: '',
    agreeToCheck: false,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [operatives, setOperatives] = useState([]);
  const [stats, setStats] = useState({ operatives: 0, countries: 0, expertise: 0 });

  useEffect(() => {
    fetchOperatives();
    fetchStats();
  }, []);

  const fetchOperatives = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/operatives`);
      if (!response.ok) throw new Error('Failed to fetch operatives');
      const data = await response.json();
      setOperatives(data);
    } catch (error) {
      console.error('Error fetching operatives:', error);
      setError('Failed to load operatives data. Please try again later.');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load statistics. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillsChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      topSkills: selectedOptions.map(option => option.value)
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (file) formDataToSend.append('cv', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/apply`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Application submission failed');
      
      setSuccess(true);
      setCurrentStep(0); // Return to the first step after successful submission
    } catch (error) {
      console.error('Error submitting application:', error);
      setError('An error occurred while submitting the application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Why Join', component: <WhyJoinSection /> },
    { title: 'How It Works', component: <HowItWorksSection /> },
    { title: 'Showcase', component: <OperativeShowcase operatives={operatives} stats={stats} error={error} /> },
    { title: 'Skills in Demand', component: <SkillsInDemandSection setCurrentStep={setCurrentStep} /> },
  ];

  return (
    <div
      className="bg-black text-white min-h-screen font-sans"
      style={{ fontFamily: 'Raleway, sans-serif' }}
    >
      <Header /> {/* Dynamically imported Header */}
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center text-white relative">
        <ParticleBackground />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <HeroSection setCurrentStep={setCurrentStep} />
          <nav className="flex justify-center mb-8">
            {steps.map((step, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mx-2 px-4 py-2 rounded-full ${currentStep === index ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </motion.button>
            ))}
          </nav>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px] flex justify-center items-center"
            >
              {currentStep < steps.length ? steps[currentStep].component : (
                <ApplicationForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  handleSkillsChange={handleSkillsChange}
                  handleFileChange={handleFileChange} 
                  handleSubmit={handleSubmit} 
                  loading={loading} 
                  error={error}
                />
              )}
            </motion.div>
          </AnimatePresence>
          {success && (
            <div className="mt-8 p-4 bg-green-500 text-white rounded-lg text-center">
              <h3 className="font-bold text-lg">Success!</h3>
              <p>Your application has been submitted successfully. We'll be in touch soon!</p>
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Dynamically imported Footer */}
    </div>
  );
};

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black"></div>
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-blue-500 rounded-full"
        animate={{
          x: ['0%', '100%'],
          y: ['0%', '100%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

const HeroSection = ({ setCurrentStep }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <h1 className="text-5xl font-bold mb-4">Become an Elite Operative</h1>
    <p className="text-xl mb-8">Top Projects. Global Impact. Your Terms.</p>
    <motion.button
      initial={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={() => setCurrentStep(4)}
    >
      Apply Now
    </motion.button>
  </motion.div>
);

const WhyJoinSection = () => {
  const reasons = [
    { icon: <FaDollarSign />, title: 'Peak Earnings', description: 'Earn top 1% compensation in your field. Our operatives average 40% higher pay than traditional roles.' },
    { icon: <FaBolt />, title: 'Cutting-Edge Work', description: 'Tackle projects that shape the future. From AI to quantum computing, you\'ll be at the forefront of tech.' },
    { icon: <FaGlobe />, title: 'Freedom', description: 'Work from anywhere, anytime. Choose projects that fit your schedule and goals.' },
    { icon: <FaBook />, title: 'Growth', description: 'Access our exclusive training platform. Learn from industry leaders and stay ahead of the curve.' },
    { icon: <FaUsers />, title: 'Network', description: 'Connect with brilliant minds globally. Collaborate on groundbreaking projects across industries.' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Why Join PlawLabs Ascend?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reasons.slice(0, 3).map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="text-blue-500 text-4xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
            <p className="text-gray-400">{reason.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 justify-center">
        {reasons.slice(3).map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="text-blue-500 text-4xl mb-4">{reason.icon}</div>
            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
            <p className="text-gray-400">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const steps = [
    { title: 'Build Your Profile', description: 'Showcase your skills, experience, and achievements.' },
    { title: 'Pass AI Assessment', description: 'Our advanced AI evaluates your expertise and potential.' },
    { title: 'Get Matched', description: 'Receive project offers tailored to your skills and preferences.' },
    { title: 'Deliver Results', description: 'Execute high-impact projects with our global team.' },
    { title: 'Level Up', description: 'Grow your skills, reputation, and earnings with each success.' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Your Path to Elite Status</h2>
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-start mb-8"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          </motion.div>
        ))}
        <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-blue-600 -z-10"></div>
      </div>
    </div>
  );
};

const OperativeShowcase = ({ operatives, stats, error }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">You'll Be in Good Company</h2>
      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <>
          <Slider {...settings}>
            {operatives.map((operative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6"
              >
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Codename: {operative.codename}</h3>
                  <p className="text-gray-400 mb-2">Achievement: {operative.achievement}</p>
                  <p className="text-gray-400">Impact: {operative.impact}</p>
                </div>
              </motion.div>
            ))}
          </Slider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-8">
            <div>
              <h3 className="text-4xl font-bold text-blue-500">{stats.operatives || 0}</h3>
              <p>Elite Operatives</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-500">{stats.countries || 0}</h3>
              <p>Countries Represented</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-500">{stats.expertise ? stats.expertise.toLocaleString() : 0}</h3>
              <p>Years Combined Expertise</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SkillsInDemandSection = ({ setCurrentStep }) => {
  const skills = [
    { icon: <FaBrain />, name: 'Quantum Computing' },
    { icon: <FaRocket />, name: 'Advanced AI & Machine Learning' },
    { icon: <FaLock />, name: 'Cybersecurity & Ethical Hacking' },
    { icon: <FaChartLine />, name: 'Blockchain & Cryptocurrency' },
    { icon: <FaHeartbeat />, name: 'Bioinformatics & Computational Biology' },
    { icon: <FaRobot />, name: 'Robotics & Automation' },
    { icon: <FaVrCardboard />, name: 'AR/VR Development' },
    { icon: <FaDatabase />, name: 'Data Science & Big Data Analytics' },
    { icon: <FaWifi />, name: '5G & Advanced Networking' },
    { icon: <FaSolarPanel />, name: 'Sustainable Energy Tech' },
  ];

  const chartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Top Skills We Need Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg text-center"
          >
            <div className="text-blue-500 text-3xl mb-2">{skill.icon}</div>
            <p className="text-sm">{skill.name}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Skill Demand Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              itemStyle={{ color: '#00BFFF' }}
            />
            <Line type="monotone" dataKey="value" stroke="#00BFFF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
        <motion.button
          initial={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setCurrentStep(4)}
        >
          See If You Match
        </motion.button>
      </div>
    </div>
  );
};

const ApplicationForm = ({ formData, handleInputChange, handleFileChange, handleSubmit, loading, error }) => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState(['']);
  
    const skillOptions = [
      { value: 'quantum-computing', label: 'Quantum Computing' },
      { value: 'ai-ml', label: 'Advanced AI & Machine Learning' },
      { value: 'cybersecurity', label: 'Cybersecurity & Ethical Hacking' },
      { value: 'blockchain', label: 'Blockchain & Cryptocurrency' },
      { value: 'bioinformatics', label: 'Bioinformatics & Computational Biology' },
      { value: 'robotics', label: 'Robotics & Automation' },
      { value: 'ar-vr', label: 'AR/VR Development' },
      { value: 'data-science', label: 'Data Science & Big Data Analytics' },
      { value: 'networking', label: '5G & Advanced Networking' },
      { value: 'sustainable-energy', label: 'Sustainable Energy Tech' },
      { value: 'web-development', label: 'Web Development' },
      { value: 'mobile-development', label: 'Mobile App Development' },
      { value: 'game-development', label: 'Game Development' },
      { value: 'cloud-computing', label: 'Cloud Computing' },
      { value: 'other', label: 'Other' }, // "Other" option for custom skills
    ];
  
    const customSelectStyles = {
      control: (provided) => ({
        ...provided,
        backgroundColor: '#2D3748',
        borderColor: '#4A5568',
        color: 'white',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#2D3748',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#4A5568' : '#2D3748',
        color: 'white',
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#4A5568',
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        ':hover': {
          backgroundColor: '#718096',
          color: 'white',
        },
      }),
    };
  
    const handleSkillSelectionChange = (selectedOptions) => {
      const validCustomSkills = customSkills.filter(skill => skill.trim() !== '');
      const totalSkills = selectedOptions.length + validCustomSkills.length;
  
      if (totalSkills <= 3) {
        setSelectedSkills(selectedOptions);
      }
    };
  
    const handleCustomSkillChange = (index, value) => {
      const newCustomSkills = [...customSkills];
      newCustomSkills[index] = value;
  
      const validCustomSkills = newCustomSkills.filter(skill => skill.trim() !== '');
      const totalSkills = selectedSkills.length + validCustomSkills.length;
  
      if (totalSkills <= 3) {
        setCustomSkills(newCustomSkills);
      }
    };
  
    const addCustomSkillField = () => {
      const validCustomSkills = customSkills.filter(skill => skill.trim() !== '');
      const totalSkills = selectedSkills.length + validCustomSkills.length;
  
      if (totalSkills < 3) {
        setCustomSkills([...customSkills, '']);
      }
    };
  
    const removeCustomSkillField = (index) => {
      const newCustomSkills = customSkills.filter((_, i) => i !== index);
      setCustomSkills(newCustomSkills);
    };
  
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Quick Apply</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="topSkills">
            Top 3 Skills
          </label>
          <Select
            isMulti
            name="topSkills"
            options={skillOptions}
            styles={customSelectStyles}
            onChange={handleSkillSelectionChange}
            value={selectedSkills}
          />
          {selectedSkills.some(skill => skill.value === 'other') && (
            <div className="mt-4 space-y-4">
              {customSkills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    placeholder={`Enter custom skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => handleCustomSkillChange(index, e.target.value)}
                    className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => removeCustomSkillField(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {selectedSkills.length + customSkills.filter(skill => skill.trim() !== '').length < 3 && (
                <button
                  type="button"
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={addCustomSkillField}
                >
                  Add Another Custom Skill
                </button>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="yearsOfExperience">
            Years of Experience
          </label>
          <select
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="0-2">0-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="linkedinUrl">
            LinkedIn URL (optional)
          </label>
          <input
            type="url"
            id="linkedinUrl"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="whyElite">
            Why you're elite (100 words max)
          </label>
          <textarea
            id="whyElite"
            name="whyElite"
            value={formData.whyElite}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            maxLength="400"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2 text-white" htmlFor="cv">
            Upload CV (PDF, DOC, DOCX)
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              name="agreeToCheck"
              checked={formData.agreeToCheck}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <span className="text-sm">I agree to a background check</span>
          </label>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="text-center">
          <motion.button
            initial={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </motion.button>
        </div>
      </form>
    );
  };
  

export default JoinElite;
