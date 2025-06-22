import React from 'react'
import {
  Box,
  Flex,
  VStack,
  Image,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaHome,
  FaInfoCircle,
  FaLaptopCode,
  FaUsers,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaTools,
  FaFolderOpen,
  FaGlobe,
} from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { useLanguage } from '../LanguageContext'
import { motion } from 'framer-motion'

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()
  const logoColor = useColorModeValue('pictures/logo.png', 'pictures/white logo.png')

  // Use useColorModeValue to select colors from the new palette
  const sidebarBg = useColorModeValue('white', 'darkCharcoal')
  const iconColor = useColorModeValue('lightText', 'lightGray')
  const activeLinkBg = useColorModeValue('brand.500', 'brand.500')
  const activeLinkColor = useColorModeValue('white', 'white')
  const mobileNavBg = useColorModeValue('white', 'darkCharcoal')
  const mobileIconColor = useColorModeValue('darkGray', 'lightGray')
  const mobileActiveIconColor = useColorModeValue('brand.500', 'brand.300')

  const navItems = [
    { id: 'welcome', label: t('sections.home'), icon: FaHome },
    { id: 'about', label: t('sections.aboutUs'), icon: FaInfoCircle },
    { id: 'services', label: t('sections.services'), icon: FaLaptopCode },
    { id: 'skills', label: t('sections.skills'), icon: FaTools },
    { id: 'projects', label: t('sections.portfolio'), icon: FaFolderOpen },
    { id: 'team', label: t('sections.team'), icon: FaUsers },
    { id: 'contact', label: t('sections.contact'), icon: FaEnvelope },
  ]

  console.log('t(\'sections.home\') returns:', t('sections.home'))

  const handleLanguageToggle = () => {
    setLang((prevLang) => (prevLang === 'en' ? 'ur' : 'en'))
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={sidebarBg}
        borderColor={useColorModeValue('inherit', 'gray.700')}
        borderRightWidth="1px"
        w="250px"
        display={{ base: 'none', md: 'block' }}
      >
        <VStack h="full" justify="space-between" alignItems="flex-start" w="full">
          <Flex px="4" py="5" alignItems="center" justifyContent="center" w="full">
            <Image src={`/${logoColor}`} alt="Try Unity Solutions Logo" boxSize="180px" />
            {/* <Text fontSize="2xl" ml="3" fontWeight="bold" color={useColorModeValue('darkGray', 'F3F4F6')}>
              Try Unity Solutions
            </Text> */}
          </Flex>

          <VStack as="ul" spacing={1} w="full" alignItems="flex-start" flex="1" px="4">
            {navItems.map((item) => (
              <Box as="li" key={item.id} w="full">
                <Link to={`/#${item.id}`}>
                  <Flex
                    align="center"
                    p="3"
                    w="full"
                    borderRadius="md"
                    _hover={{
                      bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    bg={location.hash === `#${item.id}` ? activeLinkBg : 'transparent'}
                    color={location.hash === `#${item.id}` ? activeLinkColor : useColorModeValue('darkGray', 'lightGray')}
                  >
                    <Box as={item.icon} size="18px" color={location.hash === `#${item.id}` ? activeLinkColor : iconColor} />
                    <Text ml="3" fontSize="md" color={location.hash === `#${item.id}` ? activeLinkColor : useColorModeValue('darkGray', 'lightGray')}>
                      {item.label}
                    </Text>
                  </Flex>
                </Link>
              </Box>
            ))}
          </VStack>

          <HStack spacing={2} w="full" px="4" pb="4">
            <IconButton
              aria-label="Toggle language"
              icon={<Icon as={FaGlobe} boxSize="24px" />}
              onClick={handleLanguageToggle}
              variant="ghost"
              color={useColorModeValue('gray.800', 'white')}
              justifyContent="flex-start"
              w="full"
            />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <Icon as={FaMoon} boxSize="24px" /> : <Icon as={FaSun} boxSize="24px" />}
              onClick={toggleColorMode}
              variant="ghost"
              color={useColorModeValue('gray.800', 'white')}
              justifyContent="flex-start"
              w="full"
            />
          </HStack>
        </VStack>
      </Box>

      {/* Mobile Bottom Navigation */}
      <Box
        pos="fixed"
        bottom="0"
        left="0"
        right="0"
        zIndex="sticky"
        bg={mobileNavBg}
        borderTopWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        display={{ base: 'flex', md: 'none' }}
        justifyContent="space-around"
        alignItems="center"
        p={2}
        boxShadow="lg"
      >
        {navItems.map((item) => (
          <Link to={`/#${item.id}`} key={item.id}>
            <IconButton
              aria-label={item.label}
              icon={<Icon as={item.icon} boxSize="24px" />}
              variant="ghost"
              color={location.hash === `#${item.id}` ? mobileActiveIconColor : mobileIconColor}
              _hover={{
                color: mobileActiveIconColor,
              }}
            />
          </Link>
        ))}

        <IconButton
          aria-label="Toggle language"
          icon={<Icon as={FaGlobe} boxSize="24px" />}
          onClick={handleLanguageToggle}
          variant="ghost"
          color={useColorModeValue('gray.800', 'white')}
          justifyContent="flex-start"
          w="full"
        />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <Icon as={FaMoon} boxSize="24px" /> : <Icon as={FaSun} boxSize="24px" />}
          onClick={toggleColorMode}
          variant="ghost"
          color={useColorModeValue('gray.800', 'white')}
          justifyContent="flex-start"
          w="full"
        />
      </Box>
    </>
  )
}

export default Sidebar
