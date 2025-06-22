import React, { useState } from 'react'
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  VStack,
  HStack,
  Tag,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import teamData from '../locales/team.json'
import { useLanguage } from '../LanguageContext'
import { FaCode, FaHeart } from 'react-icons/fa'

const MotionBox = motion.create(Box)
const MotionHeading = motion.create(Heading)
const MotionImage = motion.create(Image)
const MotionText = motion.create(Text)
const MotionButton = motion.create(Button)

const Team = () => {
  const { t } = useLanguage()
  const [selectedMember, setSelectedMember] = useState(null)
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

  const openModal = (member) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedMember(null)
    setIsModalOpen(false)
  }

  return (
    <MotionBox
      id="team"
      p={8}
      bg={sectionBg}
      minH="100vh"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, amount: 0.3 }}
    >
      <MotionHeading as="h2" size="xl" mb={8} textAlign="center" color={headingColor} variants={fadeIn}>
        {t('sections.team')}
      </MotionHeading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {teamData.members.map((member) => (
          <MotionBox
            key={member.id}
            variants={cardVariants}
            whileHover={{ scale: 1.02, boxShadow: cardHoverShadow }}
            transition={{ duration: 0.2 }}
            bg={cardBg}
            borderRadius="lg"
            overflow="hidden"
            borderTopRightRadius="3xl"
            data-team-member
            cursor="pointer"
            onClick={() => openModal(member)}
          >
            <MotionImage
              src={member.image}
              alt={member.name}
              w="full"
              h="300px"
              objectFit="cover"
            />
            <Box p={6}>
              <MotionHeading as="h3" size="lg" mb={2} color={headingColor} variants={fadeIn}>
                {member.name}
              </MotionHeading>
              
              <MotionText fontSize="md" fontWeight="medium" color="brand.500" mb={3} variants={fadeIn}>
                {member.role}
              </MotionText>
              
              <MotionText fontSize="md" color={textColor} mb={4} noOfLines={3} variants={fadeIn}>
                {member.description}
              </MotionText>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMember?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedMember && (
              <VStack spacing={6} align="stretch">
                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    w={{ base: 'full', md: '200px' }}
                    h={{ base: '300px', md: '200px' }}
                    objectFit="cover"
                    borderRadius="lg"
                  />
                  <Box>
                    <Text fontSize="lg" fontWeight="medium" color="brand.500" mb={2}>
                      {selectedMember.role}
                    </Text>
                    <Text color={textColor}>{selectedMember.description}</Text>
                  </Box>
                </Flex>

                <Box>
                  <HStack mb={3}>
                    <Icon as={FaCode} color="brand.500" />
                    <Heading as="h4" size="md" color={headingColor}>
                      Technologies
                    </Heading>
                  </HStack>
                  <Flex wrap="wrap" gap={2}>
                    {selectedMember.technologies.map((tech, index) => (
                      <Tag
                        key={index}
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        bg={tagBg}
                        color={tagColor}
                      >
                        {tech}
                      </Tag>
                    ))}
                  </Flex>
                </Box>

                <Box>
                  <HStack mb={3}>
                    <Icon as={FaHeart} color="brand.500" />
                    <Heading as="h4" size="md" color={headingColor}>
                      Hobbies
                    </Heading>
                  </HStack>
                  <Flex wrap="wrap" gap={2}>
                    {selectedMember.hobbies.map((hobby, index) => (
                      <Tag
                        key={index}
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        bg={tagBg}
                        color={tagColor}
                      >
                        {hobby}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionBox>
  )
}

export default Team 