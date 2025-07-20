import React from 'react'
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa'
import { useLanguage } from '../LanguageContext'
import { motion } from 'framer-motion'
import { Helmet } from "react-helmet";

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionFormControl = motion.create(FormControl)
const MotionButton = motion.create(Button)
const MotionHStack = motion.create(HStack)

const Contact = () => {
  const { t } = useLanguage()
  const sectionBg = useColorModeValue('transparent', 'transparent')
  const headingColor = useColorModeValue('gray.800', 'white')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const inputBg = useColorModeValue('white', 'gray.700')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    alert('Message sent!')
  }

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemFadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Try Unity Solutions</title>
        <meta name="description" content="Get in touch with Try Unity Solutions for custom MERN stack web development, business inquiries, and support. We're here to help your business grow." />
        <meta name="keywords" content="Contact Try Unity Solutions, business inquiry, MERN stack support, web development contact" />
        <meta name="author" content="Try Unity Solutions" />
        <link rel="canonical" href="https://tryunitysolutions.vercel.app/#contact" />
      </Helmet>
      <MotionBox
        id="contact"
        p={8}
        bg={sectionBg}
        minH="100vh"
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, amount: 0.3 }}
      >
        <MotionHeading as="h2" size="xl" mb={8} textAlign="center" color={headingColor} variants={fadeIn}>
          {t('sections.contact')}
        </MotionHeading>

        <VStack spacing={6} maxW="lg" mx="auto" p={6} bg={useColorModeValue('white', 'gray.700')} borderRadius="lg" shadow="md">
          <MotionFormControl id="name" variants={itemFadeIn}>
            <FormLabel color={textColor}>{t('contactForm.name')}</FormLabel>
            <Input type="text" placeholder="Your Name" bg={inputBg} borderColor={useColorModeValue('gray.200', 'gray.600')} />
          </MotionFormControl>
          <MotionFormControl id="email" variants={itemFadeIn}>
            <FormLabel color={textColor}>{t('contactForm.email')}</FormLabel>
            <Input type="email" placeholder="Your Email" bg={inputBg} borderColor={useColorModeValue('gray.200', 'gray.600')} />
          </MotionFormControl>
          <MotionFormControl id="message" variants={itemFadeIn}>
            <FormLabel color={textColor}>{t('contactForm.message')}</FormLabel>
            <Textarea placeholder="Your Message" rows={6} bg={inputBg} borderColor={useColorModeValue('gray.200', 'gray.600')} />
          </MotionFormControl>
          <MotionButton colorScheme="brand" size="lg" onClick={handleSubmit} w="full" variants={itemFadeIn}>
            {t('contactForm.sendButton')}
          </MotionButton>
        </VStack>

        <Box textAlign="center" mt={10}>
          <MotionHeading as="h3" size="md" mb={4} color={headingColor} variants={fadeIn}>
            {t('contactForm.findUsOn')}
          </MotionHeading>
          <MotionHStack spacing={6} justify="center" variants={itemFadeIn}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaLinkedin} boxSize={8} color={textColor} _hover={{ color: 'brand.500' }} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaGithub} boxSize={8} color={textColor} _hover={{ color: 'brand.500' }} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaTwitter} boxSize={8} color={textColor} _hover={{ color: 'brand.500' }} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Icon as={FaFacebook} boxSize={8} color={textColor} _hover={{ color: 'brand.500' }} />
            </a>
          </MotionHStack>
        </Box>
      </MotionBox>
    </>
  )
}

export default Contact 