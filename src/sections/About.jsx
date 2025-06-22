import React from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { FaCheckCircle } from 'react-icons/fa'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionImage = motion.create(Image)

const About = () => {
  const { t } = useLanguage()
  const sectionBg = useColorModeValue('transparent', 'transparent')
  const headingColor = useColorModeValue('gray.800', 'white')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const logoPath = useColorModeValue('/pictures/logo.png', '/pictures/white logo.png')

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <MotionBox
      id="about"
      p={8}
      bg={sectionBg}
      minH="100vh"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
    >
      <VStack spacing={8} align="center">
        <MotionImage
          src={logoPath}
          alt="Try Unity Solutions Logo"
          boxSize={{ base: "180px", md: "200px" }}
          mb={4}
          objectFit="contain"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <MotionHeading as="h2" size="xl" textAlign="center" color={headingColor} variants={fadeIn}>
          {t('about.title')}
        </MotionHeading>

        <MotionText
          fontSize="lg"
          textAlign="center"
          color={textColor}
          maxW="800px"
          whiteSpace="pre-line"
          variants={fadeIn}
        >
          {t('about.description')}
        </MotionText>

        <MotionBox w="full" maxW="800px" variants={fadeIn}>
          <Heading as="h3" size="lg" mb={4} color={headingColor}>
            {t('about.servicesTitle')}
          </Heading>
          <List spacing={3}>
            {t('about.services', { returnObjects: true }).map((service, index) => (
              <ListItem key={index} color={textColor}>
                <ListIcon as={FaCheckCircle} color="brand.500" />
                {service}
              </ListItem>
            ))}
          </List>
        </MotionBox>

        <MotionBox w="full" maxW="800px" variants={fadeIn}>
          <Heading as="h3" size="lg" mb={4} color={headingColor}>
            {t('about.skillsTitle')}
          </Heading>
          <VStack align="stretch" spacing={4}>
            {Object.entries(t('about.skills', { returnObjects: true })).map(([key, value]) => (
              <Box key={key}>
                <Text fontWeight="bold" color={textColor} mb={2}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>
                <Text color={textColor}>{value}</Text>
              </Box>
            ))}
          </VStack>
        </MotionBox>
      </VStack>
    </MotionBox>
  )
}

export default About 