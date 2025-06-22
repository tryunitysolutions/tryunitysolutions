import React from 'react';
import { Box, useColorMode, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/lottie/loader.json';

const MotionBox = motion(Box);

const companyName = 'Try Unity Solutions';

function useTypewriter(text, speed = 50) {
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

const Loader = () => {
  const { colorMode } = useColorMode();
  const typedName = useTypewriter(companyName, 50);

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      zIndex={2000}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <VStack spacing={8} w="full" maxW="xs" align="center">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          w={{ base: '120px', md: '180px' }}
        >
          <Lottie animationData={loaderAnimation} loop style={{ width: '100%', height: '100%' }} />
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          fontSize={{ base: 'lg', md: '2xl' }}
          fontWeight="bold"
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
          fontFamily="monospace"
          minH="1.5em"
          textAlign="center"
        >
          {typedName}
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

export default Loader; 