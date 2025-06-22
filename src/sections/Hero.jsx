import React from 'react'
import { Box, Flex, Heading, Text, Button, useColorModeValue, Image } from '@chakra-ui/react'
import { useLanguage } from '../LanguageContext'
import TypingAnimation from '../components/TypingAnimation'
import Lottie from 'lottie-react'
import heroAnimation from '../assets/lottie/hero.json'
import servicesData from '../locales/services.json'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)

const Hero = () => {
  const { t } = useLanguage()
  const sectionBg = useColorModeValue('transparent', 'transparent')
  const welcomeTextColor = useColorModeValue('gray.700', 'gray.200')
  const nameHeadingColor = useColorModeValue('gray.800', 'white')
  const taglineColor = useColorModeValue('gray.700', 'gray.200')
  const descriptionColor = useColorModeValue('gray.700', 'gray.200')
  const buttonColor = useColorModeValue('white', 'white')
  const buttonBg = useColorModeValue('brand.700', 'brand.500')
  const buttonHoverBg = useColorModeValue('brand.800', 'brand.600')
  const logoColor = useColorModeValue('pictures/logo.png', 'pictures/white logo.png')

  const serviceTitles = servicesData.coreServices.map(service => service.name)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <MotionBox
      id="welcome"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={10}
      px={4}
      bg={sectionBg}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Flex
        flex="1"
        direction="column"
        alignItems={{ base: 'center', md: 'flex-start' }}
        textAlign={{ base: 'center', md: 'left' }}
        mb={{ base: 10, md: 0 }}
      >
        <MotionBox mb={6} variants={itemVariants}>
          <Image
            src={`/${logoColor}`}
            alt="Try Unity Solutions"
            h="180px"
            mb={4}
            transition="all 0.3s ease"
          />
        </MotionBox>
        <MotionText fontSize="xl" color={welcomeTextColor} mb={2} variants={itemVariants}>
          {t('hero.welcome')}
        </MotionText>
        <MotionHeading as="h1" size="2xl" fontWeight="bold" color={nameHeadingColor} mb={4} variants={itemVariants}>
          {t('hero.name')}
        </MotionHeading>
        <MotionBox mb={6} variants={itemVariants}>
          <TypingAnimation
            text={serviceTitles}
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="light"
            color={taglineColor}
            loop={true}
          />
        </MotionBox>
        <Text fontSize="lg" mt={4} mb={6} color={descriptionColor}>
          {t('about.description')}
        </Text>
        <MotionButton
          as="button"
          colorScheme="brand"
          size="lg"
          color={buttonColor}
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
          variants={itemVariants}
          onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {t('contactForm.sendButton')}
        </MotionButton>
      </Flex>

      <MotionBox
        flex="1"
        w="full"
        maxW={{ base: '300px', md: '500px' }}
        variants={itemVariants}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
      >
        <Lottie animationData={heroAnimation} loop={true} autoplay={true} />
      </MotionBox>
    </MotionBox>
  )
}

export default Hero 