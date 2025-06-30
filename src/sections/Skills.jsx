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
  Progress,
  ProgressLabel,
  Button
} from '@chakra-ui/react'
import {
  FaHtml5,
  FaReact,
  FaJs,
  FaBootstrap,
  FaCss3,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaMobileAlt,
  FaDesktop,
  FaPalette,
  FaLayerGroup,
  FaSass,
  FaDatabase
} from 'react-icons/fa'
import {
  SiTailwindcss,
  SiMaterialdesign,
  SiChakraui,
  SiDart,
  SiMongodb,
  SiLaravel,
  SiElectron,
  SiFlutter,
  SiAdobexd,
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiFirebase,
  SiMysql
} from 'react-icons/si'
import skillsData from '../locales/skills.json'
import { useLanguage } from '../LanguageContext'
import { motion } from 'framer-motion'
import { AtSignIcon, StarIcon, InfoIcon } from '@chakra-ui/icons'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionText = motion.create(Text)
const MotionProgress = motion.create(Progress)

const skillIcons = {
  // Chakra UI
  AtSignIcon,
  StarIcon,
  InfoIcon,
  // React Icons
  FaHtml5,
  FaReact,
  FaJs,
  FaBootstrap,
  FaCss3,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaMobileAlt,
  FaDesktop,
  FaPalette,
  FaLayerGroup,
  FaSass,
  FaDatabase,
  SiMongodb,
  SiFirebase,
  SiMysql,
  fallback: FaDatabase // fallback icon
}

console.log('skillsData:', skillsData)

const Skills = () => {
  const { t } = useLanguage()
  const sectionBg = useColorModeValue('transparent', 'transparent')
  const headingColor = useColorModeValue('gray.800', 'white')
  const subHeadingColor = useColorModeValue('gray.700', 'gray.200')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const iconColor = useColorModeValue('brand.700', 'brand.500')
  const progressBg = useColorModeValue('gray.100', 'gray.700')
  const progressColor = useColorModeValue('brand.500', 'brand.300')
  const trackColor = useColorModeValue('gray.200', 'gray.600')

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
      id="skills"
      p={8}
      bg={sectionBg}
      minH="100vh"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
    >
      <MotionHeading as="h2" size="xl" mb={8} textAlign="center" color={headingColor} variants={fadeIn}>
        {t('sections.skills')}
      </MotionHeading>

      {(!skillsData || Object.keys(skillsData).length === 0) && (
        <Text color="red.500" textAlign="center">No skills data loaded.</Text>
      )}

      <VStack spacing={8} align="stretch">
        {Object.entries(skillsData).map(([category, data]) => (
          <MotionBox key={category} variants={itemVariants}>
            <MotionHeading as="h3" size="lg" mb={4} color={subHeadingColor} variants={fadeIn}>
              {data.title}
            </MotionHeading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {data.skills.map((skill, index) => {
                const SkillIcon = skillIcons[skill.icon] || skillIcons.fallback;
                if (!skillIcons[skill.icon]) {
                  console.warn(`Icon "${skill.icon}" not found for skill "${skill.name}". Using fallback.`);
                }
                return (
                  <MotionBox
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    shadow="md"
                    variants={itemVariants}
                    data-skill
                    cursor="pointer"
                    whileHover={{ scale: 1.03, boxShadow: 'lg' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Flex align="center" mb={2}>
                      {SkillIcon && <Icon as={SkillIcon} w={6} h={6} mr={3} color={iconColor} />}
                      <MotionText fontWeight="bold" fontSize="lg" color={textColor} variants={fadeIn}>
                        {skill.name}
                      </MotionText>
                    </Flex>
                    <MotionText fontSize="md" color={textColor} mb={3} variants={fadeIn}>
                      {skill.description}
                    </MotionText>
                    <MotionProgress
                      value={skill.progress}
                      size="sm"
                      colorScheme="brand"
                      bg={progressBg}
                      borderRadius="full"
                      variants={fadeIn}
                    >
                    </MotionProgress>
                  </MotionBox>
                )
              })}
            </SimpleGrid>
          </MotionBox>
        ))}
      </VStack>
    </MotionBox>
  )
}

export default Skills 