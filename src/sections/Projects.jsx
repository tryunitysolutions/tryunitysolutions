import React, { useState } from 'react'
import { Box, Heading, SimpleGrid, Image, Text, useColorModeValue, VStack, HStack, Tag, Icon, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import projectsData from '../locales/projects.json'
import { useLanguage } from '../LanguageContext'
import { FaReact, FaNodeJs, FaDatabase, FaDesktop, FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaPhp } from 'react-icons/fa'
import { SiElectron, SiMysql, SiChakraui, SiExpress, SiFramer } from 'react-icons/si'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionImage = motion.create(Image)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)

const Projects = () => {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sectionBg = useColorModeValue('transparent', 'transparent')
  const headingColor = useColorModeValue('gray.800', 'white')
  const cardBg = useColorModeValue('white', 'gray.700')
  const cardHoverShadow = useColorModeValue('lg', 'dark-lg')
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const tagBg = useColorModeValue('brand.100', 'brand.900')
  const tagColor = useColorModeValue('brand.700', 'brand.300')
  const buttonBg = useColorModeValue('brand.500', 'brand.300')
  const buttonHoverBg = useColorModeValue('brand.600', 'brand.400')

  const fadeIn = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const techIcons = {
    'React.js': FaReact,
    'Node.js': FaNodeJs,
    'MongoDB': FaDatabase,
    'Minimal admin dashboard layout with responsive design': FaDesktop,
    'Electron': SiElectron,
    'HTML': FaHtml5,
    'CSS': FaCss3Alt,
    'JS': FaJs,
    'BOOTSTRAP': FaBootstrap,
    'PHP': FaPhp,
    'MYSQL': SiMysql,
    'Chakra UI': SiChakraui,
    'Framer Motion': SiFramer,
    'Express.js': SiExpress
  }

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  return (
    <MotionBox
      id="projects"
      p={8}
      bg={sectionBg}
      minH="100vh"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
    >
      <MotionHeading as="h2" size="xl" mb={8} textAlign="center" color={headingColor} variants={fadeIn}>
        {t('sections.portfolio')}
      </MotionHeading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {projectsData.map((project) => (
          <MotionBox
            key={project.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03, boxShadow: 'lg' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            bg={cardBg}
            borderRadius="lg"
            overflow="hidden"
          >
            <MotionImage
              src={project.images.dashboard}
              alt={project.title}
              w="full"
              h="200px"
              objectFit="cover"
            />
            <Box p={6}>
              <MotionHeading as="h3" size="lg" mb={3} color={headingColor} variants={fadeIn}>
                {project.title}
              </MotionHeading>
              
              <MotionText fontSize="md" color={textColor} mb={4} noOfLines={3} variants={fadeIn}>
                {project.description}
              </MotionText>

              <MotionButton
                w="full"
                bg={buttonBg}
                color="white"
                _hover={{ bg: buttonHoverBg }}
                onClick={() => openModal(project)}
                variants={fadeIn}
              >
                See More
              </MotionButton>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProject && (
              <VStack spacing={6} align="stretch">
                <Text color={textColor}>{selectedProject.description}</Text>

                {selectedProject.features && (
                  <Box>
                    <Heading as="h4" size="md" mb={3} color={headingColor}>
                      Features
                    </Heading>
                    <VStack align="start" spacing={2}>
                      {selectedProject.features.map((feature, index) => (
                        <HStack key={index}>
                          <Box w="2px" h="4" bg="brand.500" />
                          <Text color={textColor}>{feature}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                )}

                {selectedProject.techStack && (
                  <Box>
                    <Heading as="h4" size="md" mb={3} color={headingColor}>
                      Technologies Used
                    </Heading>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                      {Object.entries(selectedProject.techStack).flatMap(([key, value]) => {
                        // Split by comma and trim whitespace
                        const techList = value.split(',').map(t => t.trim())
                        return techList.map((tech, idx) => {
                          const TechIcon = techIcons[tech]
                          return (
                            <Tag
                              key={key + tech + idx}
                              size="lg"
                              borderRadius="full"
                              variant="solid"
                              bg={tagBg}
                              padding={3}
                              fontSize="15px"
                              textAlign="center"
                              fontWeight="bold"
                              color={textColor}
                            >
                              <HStack spacing={2}>
                                {TechIcon && <Icon as={TechIcon} />}
                                <Text>{tech}</Text>
                              </HStack>
                            </Tag>
                          )
                        })
                      })}
                    </SimpleGrid>
                  </Box>
                )}

                {selectedProject.images && (
                  <Box>
                    <Heading as="h4" size="md" mb={3} color={headingColor}>
                      Screenshots
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {Object.entries(selectedProject.images).map(([key, image]) => (
                        <Image
                          key={key}
                          src={image}
                          alt={`${selectedProject.title} - ${key}`}
                          borderRadius="md"
                          objectFit="cover"
                          w="full"
                          h="300px"
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button
              as="a"
              href={selectedProject?.live !== 'not deployed' ? selectedProject?.live : undefined}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="teal"
              isDisabled={selectedProject?.live === 'not deployed'}
            >
              See Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  )
}

export default Projects 