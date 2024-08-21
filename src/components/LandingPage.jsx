import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  FaUsers,
  FaClock,
  FaRobot,
  FaBolt,
  FaGlobe,
  FaChartLine,
  FaDollarSign,
  FaBook,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div
      className="bg-black text-white min-h-screen font-sans"
      style={{ fontFamily: 'Raleway, sans-serif' }}
    >
      <Header />
      <main>
        <HeroSection />
        <OfferSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <JoinEliteSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 flex justify-between items-center"
  >
    <div className="text-2xl font-bold">PlawLabs Ascend</div>
    <nav>
      <NavLink href="/" label="Home" />
      <NavLink href="/services" label="Services" />
      <NavLink href="/join-elite" label="Join the Elite" />
      <NavLink href="/contact-us" label="Contact Us" />
    </nav>
  </motion.header>
);

const NavLink = ({ href, label }) => (
  <motion.a
    href={href}
    className="mx-2 hover:text-gray-300 transition-colors duration-200"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {label}
  </motion.a>
);

const HeroSection = () => (
  <motion.section
    id="hero"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative text-center flex items-center justify-center py-32 px-4 bg-cover bg-center bg-no-repeat min-h-[75vh]"
    style={{ backgroundImage: `url('/teamview.jpg')` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-md"></div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      className="relative z-10 max-w-3xl mx-auto"
    >
      <h1 className="text-5xl font-bold mb-4">
        Command an Elite Task Force for Your Business
      </h1>
      <p className="text-xl mb-8">
        Tap into a global network of top-tier talent, instantly deployed for
        your most critical projects.
      </p>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
      >
        <Button color="blue" label="Join the Elite" href="/join-elite" />
        <Button color="green" label="Power Up Your Project" />
      </motion.div>
    </motion.div>
  </motion.section>
);

const Button = ({ color, label, href }) => (
  <motion.a
    href={href || '#'}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={clsx(
      'px-6 py-2 rounded-full mr-4 transition-colors duration-200',
      color === 'blue' && 'bg-blue-600 hover:bg-blue-700',
      color === 'green' && 'bg-green-600 hover:bg-green-700',
      color === 'purple' && 'bg-purple-600 hover:bg-purple-700'
    )}
  >
    {label}
  </motion.a>
);

const OfferSection = () => (
  <section id="services" className="bg-gray-900 py-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-center mb-12"
    >
      When Agility Meets Expertise, Possibilities Become Reality
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      <FeatureCard
        icon={<FaUsers size={40} />}
        title="Elite Operatives"
        description="Access a network of top-tier global experts, handpicked and vetted for your most critical projects."
      />
      <FeatureCard
        icon={<FaClock size={40} />}
        title="24/7 Work Cycle"
        description="Your projects move forward continuously, crossing time zones seamlessly in our global work cycle."
      />
      <FeatureCard
        icon={<FaRobot size={40} />}
        title="AI-Driven Precision"
        description="Our AI matches your project with the perfect team, ensuring unmatched efficiency and quality."
      />
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-lg text-center max-w-sm"
  >
    <div className="text-blue-500 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const ProblemSection = () => (
  <section className="py-16 px-4 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold mb-4"
    >
      The future is fast. Are you?
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-2xl mx-auto mb-8"
    >
      Businesses today face an unprecedented challenge: the need for
      specialized, high-quality talent that can be mobilized instantly.
      Traditional hiring models are too slow, rigid, and limited by geography.
      In a world where speed and expertise are everything, how do you stay
      ahead?
    </motion.p>
    <Button color="purple" label="Learn How We Solve This" />
  </section>
);

const SolutionSection = () => (
  <section className="bg-gray-900 py-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-center mb-8"
    >
      PlawLabs Ascend: The World's First Fully Autonomous Talent Surge Engine
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-3xl mx-auto text-center mb-12"
    >
      We've built a platform where businesses don't just hire—they command.
      PlawLabs Ascend is an on-demand, fully autonomous global talent network
      that operates around the clock, assembling elite teams tailored to your
      exact needs.
    </motion.p>
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      <FeatureCard
        icon={<FaBolt size={40} />}
        title="Rapid Deployment"
        description="Assemble your dream team in hours, not weeks."
      />
      <FeatureCard
        icon={<FaGlobe size={40} />}
        title="Global Talent Pool"
        description="Access the best minds from around the world, unrestricted by geography."
      />
      <FeatureCard
        icon={<FaChartLine size={40} />}
        title="Flexible Scaling"
        description="Effortlessly scale your team up or down based on project needs."
      />
    </div>
    <div className="text-center">
      <Button color="blue" label="Explore Our Capabilities" />
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-center mb-12"
    >
      From Vision to Victory—In Three Simple Steps
    </motion.h2>
    <div className="flex flex-wrap justify-center gap-8">
      <ProcessCard
        number="1"
        title="Define Your Needs"
        description="Tell us what you need—whether it's a full-scale AI solution, cybersecurity audit, or custom software development. Our platform quickly identifies the exact skills and expertise required."
      />
      <ProcessCard
        number="2"
        title="We Assemble Your Team"
        description="Our AI-driven system matches your project with the best operatives in our global network. The team is assembled and ready to work, crossing time zones to ensure continuous progress."
      />
      <ProcessCard
        number="3"
        title="Execute & Deliver"
        description="Your project is executed with precision, overseen by our experienced project managers, and delivered faster than you ever thought possible."
      />
    </div>
    <div className="text-center mt-12">
      <Button color="green" label="Get Started Today" />
    </div>
  </section>
);

const ProcessCard = ({ number, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800 p-6 rounded-lg text-center max-w-sm"
  >
    <div className="text-3xl font-bold text-blue-500 mb-4">{number}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const JoinEliteSection = () => (
  <section className="bg-gray-900 py-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl font-bold text-center mb-12"
    >
      Why Join the Elite? Because You're More Than Just a Freelancer.
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <FeatureCard
        icon={<FaUsers size={40} />}
        title="You're Not a Freelancer, You're an Operative"
        description="At PlawLabs Ascend, we don't do gig work—we do game-changing work. As an operative, you're part of an elite task force that takes on the world's most complex challenges."
      />
      <FeatureCard
        icon={<FaBolt size={40} />}
        title="Access to Cutting-Edge Projects"
        description="Work on projects that push the boundaries of what's possible, from AI innovations to next-gen cybersecurity."
      />
      <FeatureCard
        icon={<FaGlobe size={40} />}
        title="Flexible, Global, and Asynchronous"
        description="Work from anywhere, anytime. Be part of a global team that's always moving forward."
      />
      <div className="col-span-full flex justify-center space-x-8">
        <FeatureCard
          icon={<FaDollarSign size={40} />}
          title="Premium Compensation"
          description="Your elite skills deserve elite pay. Earn premium rates that reflect your expertise and value."
        />
        <FeatureCard
          icon={<FaBook size={40} />}
          title="Continuous Growth and Development"
          description="Stay ahead with exclusive access to training, certifications, and cutting-edge resources."
        />
      </div>
    </div>
    <div className="text-center mt-12">
      <Button color="purple" label="Apply Now" href="/join-elite" />
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('https://ascend-api.replit.app/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', description: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'An unexpected error occurred');
      }
    } catch (error) {
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-4"
      >
        Need to Power Up Your Project? Let's Talk.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center max-w-2xl mx-auto mb-8"
      >
        Every project is unique, and so are your needs. Tell us what you're
        looking to achieve, and we'll match you with the perfect team. Get a
        custom quote tailored to your exact requirements.
      </motion.p>
      {!submitted ? (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto"
        >
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00BFFF' }}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00BFFF' }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: '#00BFFF' }}
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.textarea
            whileFocus={{ scale: 1.02, borderColor: '#00BFFF' }}
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></motion.textarea>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              color="blue"
              label={loading ? 'Submitting...' : 'Request a Quote'}
              disabled={loading}
            />
          </motion.div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 text-green-400"
        >
          <motion.h3
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-2xl font-bold mb-4"
          >
            Thank you for reaching out!
          </motion.h3>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
            className="text-lg mb-8"
          >
            We'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-red-400"
        >
          {error}
        </motion.p>
      )}
    </section>
  );
};

export const Footer = () => (
  <footer className="bg-gray-900 py-8 px-4">
    <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
      <div className="text-2xl font-bold mb-4 md:mb-0">PlawLabs Ascend</div>
      <nav className="flex flex-wrap">
        <NavLink href="/" label="Home" />
        <NavLink href="/services" label="Services" />
        <NavLink href="/join-elite" label="Join the Elite" />
        <NavLink href="/contact-us" label="Contact Us" />
        <NavLink href="/privacy-policy" label="Privacy Policy" />
        <NavLink href="/terms-of-service" label="Terms of Service" />
      </nav>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <SocialIcon Icon={FaLinkedin} href="#" />
        <SocialIcon Icon={FaTwitter} href="#" />
        <SocialIcon Icon={FaGithub} href="#" />
      </div>
    </div>
    <div className="text-center mt-8 text-sm text-gray-400">
      © 2024 PlawLabs LTD, London/UK. All Rights Reserved.
    </div>
  </footer>
);

const SocialIcon = ({ Icon, href }) => (
  <motion.a
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-200"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={24} />
  </motion.a>
);

export default LandingPage;
