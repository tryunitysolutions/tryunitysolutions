import React, { useEffect, useState } from 'react'
import { Box, Flex, CSSReset, ColorModeScript, useColorModeValue } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './LanguageContext'
import Sidebar from './components/Sidebar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Team from './sections/Team'
import Contact from './sections/Contact'
import Skills from './sections/Skills'
import MagicCursor from './components/MagicCursor'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import abstractBackground from './assets/lottie/abstract-background.json'
import Loader from './components/Loader'

function AppContent() {
  const { lang } = useLanguage()
  const location = useLocation()
  const currentSectionId = location.hash.substring(1) || 'welcome'

  // Loader state for section transitions
  const [showLoader, setShowLoader] = useState(true);
  const [section, setSection] = useState(currentSectionId);

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
  }, [lang]);

  useEffect(() => {
    // Show loader for 3s on section change
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    setSection(currentSectionId);
    return () => clearTimeout(timer);
  }, [currentSectionId]);

  useEffect(() => {
    const element = document.getElementById(currentSectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentSectionId])

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
  };

  return (
    <Flex overflowX="hidden">
      <Box
        pos="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="-2"
        opacity="0.1"
        overflow="hidden"
      >
        <Lottie animationData={abstractBackground} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Sidebar />
      <Box flex="1" ml={{ base: 0, md: "250px" }} p={4}>
        {showLoader ? (
          <Loader />
        ) : (
          <AnimatePresence mode='wait'>
            {section === 'welcome' && (
              <motion.div
                key="welcome"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="welcome"><Hero /></Box>
              </motion.div>
            )}
            {section === 'about' && (
              <motion.div
                key="about"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="about"><About /></Box>
              </motion.div>
            )}
            {section === 'services' && (
              <motion.div
                key="services"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="services"><Services /></Box>
              </motion.div>
            )}
            {section === 'skills' && (
              <motion.div
                key="skills"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="skills"><Skills /></Box>
              </motion.div>
            )}
            {section === 'projects' && (
              <motion.div
                key="projects"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="projects"><Projects /></Box>
              </motion.div>
            )}
            {section === 'team' && (
              <motion.div
                key="team"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="team"><Team /></Box>
              </motion.div>
            )}
            {section === 'contact' && (
              <motion.div
                key="contact"
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box id="contact"><Contact /></Box>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Box>
    </Flex>
  )
}

function App() {
  // Loader state for initial startup
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <LanguageProvider>
      <CSSReset />
      <ColorModeScript initialColorMode="light" />
      {loading ? <Loader /> : <AppContent />}
      <MagicCursor />
    </LanguageProvider>
  )
}

export default App
