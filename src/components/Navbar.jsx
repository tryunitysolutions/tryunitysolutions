import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext'

const Navbar = () => {
  const { t } = useLanguage()
  const logoColor = useColorModeValue('logo.png', 'white logo.png')

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      zIndex={1000}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="sm"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={4}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Box
            as="img"
            src={`/${logoColor}`}
            alt="Try Unity Solutions"
            h="40px"
            transition="all 0.3s ease"
          />
        </Link>
      </Flex>
    </Box>
  )
}

export default Navbar 