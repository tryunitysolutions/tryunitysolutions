import React from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Button
} from '@chakra-ui/react'
import {
  FaHtml5,
  FaReact,
  FaJs,
  FaBootstrap,
  FaCss3,
  FaVuejs,
  FaDatabase,
  FaGlobe,
  FaLaptopCode,
  FaMobileAlt,
  FaDesktop,
  FaPalette,
  FaLayerGroup,
  FaGraduationCap
} from 'react-icons/fa'
import servicesData from '../locales/services.json'
import { useLanguage } from '../LanguageContext'
import { motion } from 'framer-motion'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)

const serviceIcons = {
  FaHtml5: FaHtml5,
  FaReact: FaReact,
  FaJs: FaJs,
  FaBootstrap: FaBootstrap,
  FaCss3: FaCss3,
  FaVuejs: FaVuejs,
  FaDatabase: FaDatabase,
  FaGlobe: FaGlobe,
  FaLaptopCode: FaLaptopCode,
  FaMobileAlt: FaMobileAlt,
  FaDesktop: FaDesktop,
  FaPalette: FaPalette,
  FaLayerGroup: FaLayerGroup,
  FaGraduationCap: FaGraduationCap
};

const Services = () => {
  const { t } = useLanguage()
  const sectionBg = useColorModeValue('transparent', 'transparent')
  const headingColor = useColorModeValue('darkGray', 'F3F4F6')
  const subHeadingColor = useColorModeValue('darkGray', 'lightGray')
  const textColor = useColorModeValue('lightText', 'lightGray')
  const iconColor = useColorModeValue('brand.700', 'brand.500')

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <MotionBox
      id="services"
      p={8}
      bg={sectionBg}
      minH="100vh"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
    >
      <MotionHeading as="h2" size="xl" mb={8} textAlign="center" color={headingColor} variants={fadeIn}>
        {t('sections.services')}
      </MotionHeading>

      <VStack spacing={8} align="stretch">
        {/* Core Services Section */}
        <MotionBox variants={itemVariants}>
          <MotionHeading as="h3" size="lg" mb={4} color={subHeadingColor} variants={fadeIn}>
            {t('services.coreServicesTitle')}
          </MotionHeading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {servicesData.coreServices.map((item, index) => {
              const ServiceIcon = serviceIcons[item.icon];
              return (
                <MotionBox 
                  key={index} 
                  p={4} 
                  borderWidth="1px" 
                  borderRadius="lg" 
                  shadow="md" 
                  variants={itemVariants}
                  data-service
                  cursor="pointer"
                  onClick={() => openModal(item)}
                >
                  <Flex align="center" mb={2}>
                    {ServiceIcon && <Icon as={ServiceIcon} w={6} h={6} mr={3} color={iconColor} />}
                    <MotionText fontWeight="bold" fontSize="lg" color={textColor} variants={fadeIn}>{item.name}</MotionText>
                  </Flex>
                  <MotionText fontSize="md" color={textColor} variants={fadeIn}>{item.description}</MotionText>
                </MotionBox>
              )
            })}
          </SimpleGrid>
        </MotionBox>

        {/* Languages Section */}
        {servicesData.languages && (
          <MotionBox variants={itemVariants}>
            <MotionHeading as="h3" size="lg" mb={4} color={subHeadingColor} variants={fadeIn}>
              Languages
            </MotionHeading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {servicesData.languages.map((item, index) => {
                const ServiceIcon = serviceIcons[item.icon];
                return (
                  <MotionBox 
                    key={index} 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    shadow="md" 
                    variants={itemVariants}
                    data-service
                    cursor="pointer"
                    onClick={() => openModal(item)}
                  >
                    <Flex justify="space-between" mb={2}>
                      <Flex align="center">
                        {ServiceIcon && <Icon as={ServiceIcon} w={5} h={5} mr={2} color={iconColor} />}
                        <MotionText fontWeight="bold" color={textColor} variants={fadeIn}>{item.name}</MotionText>
                      </Flex>
                      <MotionText fontSize="sm" color={textColor} variants={fadeIn}>{item.experience}</MotionText>
                    </Flex>
                  </MotionBox>
                )
              })}
            </SimpleGrid>
          </MotionBox>
        )}

        {/* Databases Section */}
        {servicesData.databases && (
          <MotionBox variants={itemVariants}>
            <MotionHeading as="h3" size="lg" mb={4} color={subHeadingColor} variants={fadeIn}>
              Databases
            </MotionHeading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {servicesData.databases.map((item, index) => {
                const ServiceIcon = serviceIcons[item.icon];
                return (
                  <MotionBox 
                    key={index} 
                    p={4} 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    shadow="md" 
                    variants={itemVariants}
                    data-service
                    cursor="pointer"
                    onClick={() => openModal(item)}
                  >
                    <Flex justify="space-between" mb={2}>
                      <Flex align="center">
                        {ServiceIcon && <Icon as={ServiceIcon} w={5} h={5} mr={2} color={iconColor} />}
                        <MotionText fontWeight="bold" color={textColor} variants={fadeIn}>{item.name}</MotionText>
                      </Flex>
                      <MotionText fontSize="sm" color={textColor} variants={fadeIn}>{item.experience}</MotionText>
                    </Flex>
                  </MotionBox>
                )
              })}
            </SimpleGrid>
          </MotionBox>
        )}
      </VStack>
    </MotionBox>
  )
}

export default Services