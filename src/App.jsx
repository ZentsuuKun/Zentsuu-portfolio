import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Code2, Palette, Zap, Atom, Wind, Database, Triangle, Figma, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

import cardFront from './assets/card-front.jpg';
import cardBack from './assets/card-back.jpg';
import logoViolet from './assets/logo-violet.png';
import logoBlack from './assets/logo-black.png';

// --- 1. YOUR DATA ---
const portfolioData = {
  personal: {
    name: "Rodney",
    socials: [
      { icon: <Github size={20} />, link: "https://github.com/ZentsuuKun" },
      { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/zentsuuu/" },
      { icon: <Mail size={20} />, link: "mailto:rodney.onias123@gmail.com" }
    ]
  },
  projects: [
    {
      title: "TTANGKUET GREEN FARM E-COMMERCE PLATFORM",
      description: "A fully featured online shopping experience with cart functionality, payment gateways, and user authentication.",
      tags: ["PHP", "SQL"],
      image: "/pics/ecc.png",
      demoLink: "http://ttangkeutgreenfarm.page.gd",
      codeLink: "http://ttangkeutgreenfarm.page.gd"
    },
    {
      title: "Excuse letter generator",
      description: "Another amazing app with AI features.",
      tags: ["react", "tailwind"],
      image: "/pics/exc.png",
      demoLink: "https://excusegen.vercel.app",
      codeLink: "https://excusegen.vercel.app"
    },



  ],
  skills: [
    { name: "HTML", icon: Code2 },
    { name: "CSS", icon: Palette },
    { name: "JavaScript", icon: Zap },
    { name: "React", icon: Atom },
    { name: "Tailwind CSS", icon: Wind },
    { name: "PHP", icon: Database },
    { name: "Laravel", icon: Triangle },
    { name: "Figma", icon: Figma }
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "PANGASINAN STATE UNIVERSITY",
      year: "2022 - Present",
      description: "Focusing on web development and modern programming practices."
    }
  ],
  certificates: [
    {
      name: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2024",
      description: "Completed comprehensive training in responsive web design principles and best practices.",
      image: "/pics/cert1.png" // Replace with your actual certificate image path
    },
  ],
  gallery: [
    {
      title: "E-commercce Interface",
      category: "Figma",
      image: "/pics/ui1.png"
    },
    {
      title: "E-ccomerce Admin Interface",
      category: "Figma",
      image: "/pics/ui2.png"
    },


  ]
};

// --- 2. LOADING SCREEN COMPONENT ---

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Minimum loading time of 2 seconds
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
    >
      <div className="w-full">
        <div className="relative h-1 bg-gray-900 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon to-transparent"
            style={{ width: "100%" }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-gray-400 text-sm uppercase tracking-widest"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- 3. LANYARD BADGE COMPONENT ---

// The Hanging Badge Animation Component
const LanyardBadge = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Physics for the pull effect - Lower damping for more bounce
  const x = useSpring(0, { stiffness: 200, damping: 10 });
  const y = useSpring(0, { stiffness: 200, damping: 10 });

  // Derived rotation based on movement
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const bind = useDrag(({ down, movement: [mx, my], velocity }) => {
    setIsDragging(down);
    // Constrain the drag to simulate a string tension
    const dampedMx = mx * 0.5;
    const dampedMy = my * 0.5;

    x.set(down ? dampedMx : 0);
    y.set(down ? dampedMy : 0);
  });

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
      className="relative z-10 flex justify-center w-full mt-[-60px] md:mt-[-100px] pointer-events-none perspective-1000"
    >
      <div className="origin-top relative group">

        {/* Strap - Dynamic SVG that stretches */}
        <svg className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-64 h-[300px] z-0 pointer-events-none overflow-visible">
          <motion.line
            x1={60} y1={0}
            x2={useTransform(x, (v) => 128 + v)}
            y2={useTransform(y, (v) => 300 + v)}
            stroke="#111827"
            strokeWidth={3}
          />
          <motion.line
            x1={196} y1={0}
            x2={useTransform(x, (v) => 128 + v)}
            y2={useTransform(y, (v) => 300 + v)}
            stroke="#111827"
            strokeWidth={3}
          />
        </svg>

        {/* Animated Card Container */}
        <motion.div
          {...bind()}
          style={{ x, y, rotateX, rotateY, cursor: 'grab' }}
          animate={!isDragging ? { rotateZ: [1, -1, 1] } : {}}
          transition={{
            rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          whileTap={{ cursor: 'grabbing' }}
          className="relative z-20 touch-none"
        >
          {/* Clip */}
          <div className="relative z-20 w-16 h-12 bg-gray-300 mx-auto rounded-lg border-b-4 border-gray-400 shadow-sm flex items-center justify-center mb-[-10px]">
            <div className="w-10 h-1 bg-gray-800 rounded-full opacity-20"></div>
          </div>

          {/* Flippable Card */}
          <motion.div
            className="relative w-64 h-96 preserve-3d transition-transform duration-500 pointer-events-auto"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col items-center">
              <img src={cardFront} alt="ID Card Front" className="w-full h-full object-cover pointer-events-none select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
              <div className="absolute bottom-20 right-[-10px] rotate-[-10deg] bg-yellow-400 text-black px-3 py-1 font-bold font-mono text-sm shadow-md border-2 border-white">
                PULL ME!
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col items-center">
              <img src={cardBack} alt="ID Card Back" className="w-full h-full object-cover pointer-events-none select-none" draggable="false" onDragStart={(e) => e.preventDefault()} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- 4. MAIN APP ---

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAboutImageVisible, setIsAboutImageVisible] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [direction, setDirection] = useState(0);
  const aboutImageRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Scroll animation observer with optimized settings
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            newSet.add(entry.target.id);
            return newSet;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutImageVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutImageRef.current) {
      observer.observe(aboutImageRef.current);
    }

    return () => {
      if (aboutImageRef.current) {
        observer.unobserve(aboutImageRef.current);
      }
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-300 ${isDark
        ? 'bg-black text-white selection:bg-neon selection:text-black'
        : 'bg-white text-gray-900 selection:bg-neon selection:text-white'
        }`}>

        {/* HEADER */}
        <header className={`fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md transition-colors duration-300 ${isDark ? 'bg-black/95 border-b border-gray-900' : 'bg-white/95 border-b border-gray-200'
          }`}>
          <div className="flex items-center gap-3">
            <img
              src={isDark ? logoViolet : logoBlack}
              alt="Zentsuu Logo"
              className="h-20 w-20 object-contain"
            />
            <div className={`text-xl font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-black'
              }`}>Rodney Onias</div>
          </div>
          <div className="flex items-center gap-8">
            <nav className={`hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
              <a href="#projects" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Projects</a>
              <a href="#skills" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Skills</a>
              <a href="#education" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Education</a>
              <a href="#certificates" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Certificates</a>
              <a href="#gallery" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Gallery</a>
              <a href="#about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>About</a>
              <a href="#contact" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Contact</a>
            </nav>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition-all duration-300 ${isDark
                ? 'border-gray-700 hover:border-neon text-gray-400 hover:text-neon'
                : 'border-gray-300 hover:border-neon text-gray-600 hover:text-neon'
                }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-6 py-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-4 md:space-y-2 z-10 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight sm:leading-[0.9]">
                <div className="block">ASPIRING</div>
                <div className="block">FRONT-END</div>
                <div className={`block ${isDark ? 'text-outline' : 'text-black'}`}>DEVELOPER</div>
                <div className="block">PORTFOLIO</div>
              </h1>
              <div className="h-1 w-24 bg-neon mt-6 mb-6 mx-auto lg:mx-0"></div>
              <p className={`max-w-lg text-sm sm:text-base uppercase tracking-wide mx-auto lg:mx-0 ${isDark ? 'text-gray-100' : 'text-black'
                }`}>
                Transforming designs into pixel-perfect, interactive experiences that not only capture attention but also elevate user engagement.
              </p>

              <a
                href="/Rodney Onias CV.pdf"
                download="Rodney Onias CV.pdf"
                className={`inline-flex items-center gap-2 mt-6 md:mt-8 px-6 py-3 border-2 font-bold uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105 ${isDark
                  ? 'border-neon text-neon hover:bg-neon hover:text-black'
                  : 'border-black text-black hover:bg-black hover:text-white'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download CV
              </a>
            </div>

            <div className="relative h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] flex justify-center items-center order-1 lg:order-2">
              {/* ID Card Positioned Here */}
              <div className="scale-75 sm:scale-90 md:scale-100 lg:scale-125 transform translate-y-10">
                <LanyardBadge />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce-arrow">
              <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Scroll
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isDark ? 'text-neon' : 'text-black'}`}
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          ref={(el) => (sectionRefs.current.projects = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('projects') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 ${isDark ? 'bg-black' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">
              Selected <span className="text-neon">Projects</span>
            </h2>

            <div className="space-y-32">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className={`group grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''
                  }`}>
                  <div className={`relative overflow-hidden aspect-video rounded-lg border transition-all duration-500 ${index % 2 === 1 ? 'md:col-start-2' : ''
                    } ${isDark
                      ? 'bg-gray-900 border-gray-800 group-hover:border-neon'
                      : 'bg-gray-100 border-gray-300 group-hover:border-neon'
                    }`}>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                  </div>
                  <div className={`space-y-6 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                    <h3 className={`text-3xl md:text-5xl font-bold uppercase transition-all duration-500 group-hover:translate-x-2 ${isDark ? 'group-hover:text-neon' : 'text-black group-hover:text-neon'
                      }`}>{project.title}</h3>
                    <p className={`leading-relaxed transition-all duration-500 group-hover:translate-x-1 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-black'
                      }`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 border rounded-full text-xs uppercase tracking-wider transition-all duration-300 group-hover:border-neon group-hover:text-neon ${isDark ? 'border-gray-800 text-gray-500' : 'border-black text-black'
                          }`}>{tag}</span>
                      ))}
                    </div>
                    <div className="pt-4">
                      <a href={project.demoLink} className="inline-block border-b border-neon text-neon pb-1 text-sm font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors">View Project</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          ref={(el) => (sectionRefs.current.skills = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('skills') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 border-t ${isDark ? 'bg-black border-gray-900' : 'bg-white border-gray-200'
            }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">
              My <span className="text-neon">Skills</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {portfolioData.skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className={`group relative rounded-lg p-6 text-center border transition-all duration-300 hover:scale-105 ${isDark
                      ? 'bg-gray-900 border-gray-800 hover:border-neon'
                      : 'bg-gray-50 border-gray-200 hover:border-neon'
                      }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <IconComponent
                        size={40}
                        className={`transition-colors duration-300 group-hover:text-neon ${isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                      />
                      <p className={`text-lg font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-neon ${isDark ? 'text-gray-300' : 'text-black'
                        }`}>
                        {skill.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* EDUCATION */}
        <motion.section
          id="education"
          ref={(el) => (sectionRefs.current.education = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('education') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 border-t ${isDark ? 'bg-black border-gray-900' : 'bg-gray-50 border-gray-200'
            }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">
              Educational <span className="text-neon">Background</span>
            </h2>

            <div className="space-y-8">
              {portfolioData.education.map((edu, index) => (
                <div
                  key={index}
                  className={`group relative rounded-lg p-8 border transition-all duration-500 hover:scale-[1.02] ${isDark
                    ? 'bg-gray-900 border-gray-800 hover:border-neon'
                    : 'bg-white border-gray-200 hover:border-neon'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className={`text-2xl md:text-3xl font-bold uppercase transition-colors duration-300 ${isDark ? 'text-white group-hover:text-neon' : 'text-black group-hover:text-neon'
                        }`}>
                        {edu.degree}
                      </h3>
                      <p className={`text-lg font-semibold mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-800'
                        }`}>
                        {edu.school}
                      </p>
                    </div>
                    <div className={`px-4 py-2 border rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${isDark
                      ? 'border-gray-700 text-gray-400 group-hover:border-neon group-hover:text-neon'
                      : 'border-gray-300 text-gray-600 group-hover:border-neon group-hover:text-neon'
                      }`}>
                      {edu.year}
                    </div>
                  </div>
                  <p className={`leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-700 group-hover:text-gray-900'
                    }`}>
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CERTIFICATES */}
        <motion.section
          id="certificates"
          ref={(el) => (sectionRefs.current.certificates = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('certificates') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 border-t ${isDark ? 'bg-black border-gray-900' : 'bg-gray-50 border-gray-200'
            }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">
              Certificates & <span className="text-neon">Achievements</span>
            </h2>

            {/* Carousel */}
            <div className="relative max-w-3xl mx-auto">
              {/* Certificate Display */}
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <motion.div
                    key={currentCertIndex}
                    custom={direction}
                    initial={{
                      x: direction > 0 ? 1000 : -1000,
                      opacity: 0
                    }}
                    animate={{
                      x: 0,
                      opacity: 1
                    }}
                    exit={{
                      x: direction > 0 ? -1000 : 1000,
                      opacity: 0
                    }}
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className={`group relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-500 hover:scale-[1.02] ${isDark
                      ? 'bg-gray-900 border-gray-800 hover:border-neon'
                      : 'bg-white border-gray-300 hover:border-neon'
                      }`}
                    onClick={() => setSelectedCert(portfolioData.certificates[currentCertIndex])}
                  >
                    <div className="aspect-video overflow-hidden bg-gray-800">
                      <img
                        src={portfolioData.certificates[currentCertIndex].image}
                        alt={portfolioData.certificates[currentCertIndex].name}
                        className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className={`p-6 ${isDark ? 'bg-gray-900' : 'bg-white'
                      }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <Award size={24} className="text-neon" />
                        <h3 className={`text-xl md:text-2xl font-bold uppercase ${isDark ? 'text-white' : 'text-black'
                          }`}>
                          {portfolioData.certificates[currentCertIndex].name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <p className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          {portfolioData.certificates[currentCertIndex].issuer}
                        </p>
                        <span className={`px-3 py-1 border rounded-full text-xs font-bold uppercase tracking-wider ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'
                          }`}>
                          {portfolioData.certificates[currentCertIndex].date}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                        {portfolioData.certificates[currentCertIndex].description}
                      </p>
                      <p className={`text-xs mt-4 italic ${isDark ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                        Click to view full certificate
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {portfolioData.certificates.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        setDirection(-1);
                        setCurrentCertIndex((prev) =>
                          prev === 0 ? portfolioData.certificates.length - 1 : prev - 1
                        );
                      }}
                      className={`absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border transition-all duration-300 ${isDark
                        ? 'bg-gray-900 border-gray-800 hover:border-neon text-gray-400 hover:text-neon'
                        : 'bg-white border-gray-300 hover:border-neon text-gray-600 hover:text-neon'
                        }`}
                      aria-label="Previous certificate"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => {
                        setDirection(1);
                        setCurrentCertIndex((prev) =>
                          prev === portfolioData.certificates.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className={`absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border transition-all duration-300 ${isDark
                        ? 'bg-gray-900 border-gray-800 hover:border-neon text-gray-400 hover:text-neon'
                        : 'bg-white border-gray-300 hover:border-neon text-gray-600 hover:text-neon'
                        }`}
                      aria-label="Next certificate"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Carousel Indicators */}
              {portfolioData.certificates.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {portfolioData.certificates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCertIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentCertIndex
                        ? 'w-8 bg-neon'
                        : `w-2 ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`
                        }`}
                      aria-label={`Go to certificate ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Certificate Modal */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>
            <div
              className="relative max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.name}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.name}</h3>
                <p className="text-gray-300">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* UI/UX GALLERY */}
        <motion.section
          id="gallery"
          ref={(el) => (sectionRefs.current.gallery = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('gallery') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 border-t ${isDark ? 'bg-black border-gray-900' : 'bg-gray-50 border-gray-200'
            }`}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-16">
              UI/UX <span className="text-neon">Gallery</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.gallery.map((item, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-lg border transition-all duration-500 hover:scale-105 ${isDark
                    ? 'bg-gray-900 border-gray-800 hover:border-neon'
                    : 'bg-white border-gray-300 hover:border-neon'
                    }`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                  </div>
                  <div className={`p-4 ${isDark ? 'bg-gray-900' : 'bg-white'
                    }`}>
                    <span className="text-xs uppercase tracking-wider font-bold text-neon">{item.category}</span>
                    <h3 className={`text-lg font-bold mt-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-neon' : 'text-black group-hover:text-neon'
                      }`}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          ref={(el) => (sectionRefs.current.about = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('about') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-24 border-t ${isDark ? 'border-gray-900' : 'border-gray-200'
            }`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center group">
            <div className="space-y-6">
              <div className={`text-neon text-sm font-bold uppercase tracking-widest mb-4 transition-all duration-500 ${isDark ? 'group-hover:tracking-[0.3em] group-hover:text-white' : 'group-hover:tracking-[0.3em]'
                }`}>Who I Am</div>
              <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-8 transition-all duration-500 group-hover:translate-x-2">
                {portfolioData.personal.name} <br /> <span className={`transition-all duration-500 group-hover:text-neon ${isDark ? 'text-outline' : 'text-black'
                  }`}>Onias</span>
              </h2>
              <p className={`text-lg leading-relaxed mb-8 transition-all duration-500 ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-black'
                }`}>
                Passionate frontend developer specializing in building responsive and interactive web applications. I convert designs into clean, efficient code using modern technologies like React and Tailwind.
              </p>
              <a href="#" className={`text-sm font-bold uppercase tracking-widest border-b pb-1 transition-colors inline-block ${isDark
                ? 'border-white hover:text-neon hover:border-neon'
                : 'border-black text-black hover:text-neon hover:border-neon'
                }`}>Read More</a>
            </div>
            <div
              ref={aboutImageRef}
              className={`relative h-full min-h-[400px] overflow-hidden border rounded-lg transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-neon/50 group-hover:rotate-2 ${isDark
                ? 'bg-gray-900 border-gray-800 group-hover:border-neon'
                : 'bg-gray-100 border-gray-300 group-hover:border-neon'
                }`}>
              <img
                src="/pics/reg.jpg"
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-110 group-hover:-rotate-2 ${isAboutImageVisible ? 'animate-fade-to-color' : 'grayscale opacity-70'
                  } group-hover:grayscale-0`}
              />
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.section
          id="contact"
          ref={(el) => (sectionRefs.current.contact = el)}
          initial={{ opacity: 0, y: 30 }}
          animate={visibleSections.has('contact') ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`px-6 py-32 text-center ${isDark ? 'bg-black' : 'bg-white'
            }`}
        >
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
              <p className={`text-sm uppercase tracking-widest ${isDark ? 'text-gray-100' : 'text-gray-700'
                }`}>What's Next?</p>
              <h2 className={`text-6xl md:text-8xl font-black uppercase transition-colors duration-300 cursor-pointer ${isDark ? 'text-outline hover:text-neon' : 'text-black hover:text-neon'
                }`}>
                Let's <br /> Connect
              </h2>
            </div>

            <div className={`flex flex-col md:flex-row justify-between items-center pt-20 border-t ${isDark ? 'border-gray-900' : 'border-gray-300'
              }`}>
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <img
                    src={isDark ? logoViolet : logoBlack}
                    alt="Zentsuu Logo"
                    className="h-20 w-20 object-contain"
                  />
                  <div className="text-2xl font-bold text-neon">ZENTSUU</div>
                </div>
                <p className={`text-s mt-2 ${isDark ? 'text-gray-100' : 'text-gray-500'
                  }`}>© 2025 {portfolioData.personal.name} Onias. All Rights Reserved.</p>
              </div>
              <div className="flex gap-6 mt-8 md:mt-0">
                {portfolioData.personal.socials.map((social, idx) => (
                  <a key={idx} href={social.link} className={`transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </>
  );
}