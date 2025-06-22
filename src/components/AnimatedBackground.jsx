import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const gradientColor1 = useColorModeValue('brand.100', 'gray.900')
  const gradientColor2 = useColorModeValue('brand.200', 'gray.700')

  const variants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  }

  return (
    <motion.div
      variants={variants}
      animate="animate"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
        backgroundSize: '220% 220%',
        backgroundImage: `linear-gradient(20deg, ${gradientColor1}, ${gradientColor2})`,
      }}
    />
  )
}

export default AnimatedBackground 