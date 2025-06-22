import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Text } from '@chakra-ui/react';

const TypingAnimation = ({ text, speed = 100, fontSize, fontWeight, color, loop = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!Array.isArray(text) || text.length === 0) return;

    const currentPhrase = text[currentPhraseIndex];

    let timeoutId;

    if (isDeleting) {
      if (charIndex > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, speed / 2); // Faster deleting
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % text.length);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed);
      } else {
        if (loop) {
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, 1500); // Pause before deleting
        } // If not looping, it stops here
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentPhraseIndex, text, speed, loop]);

  return (
    <Text fontSize={fontSize} fontWeight={fontWeight} color={color}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ marginLeft: '2px' }}
      >
        |
      </motion.span>
    </Text>
  );
};

export default TypingAnimation; 