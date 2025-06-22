import React, { useState, useEffect } from 'react'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const MotionBox = motion(Box)
const MotionText = motion(Text)

const MagicCursor = () => {
  const { t, lang } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [hoverLabel, setHoverLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for cursor movement
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Cursor size transforms
  const cursorSize = useTransform(cursorX, [0, 1000], [20, isHovering ? 40 : 20])

  // Theme colors
  const cursorColor = useColorModeValue('brand.500', 'brand.300')
  const cursorBg = useColorModeValue('white', 'gray.800')
  const cursorBorder = useColorModeValue('brand.200', 'brand.600')
  const labelColor = useColorModeValue('gray.800', 'white')
  const labelBg = useColorModeValue('white', 'gray.700')

  const getNavigationLabel = (element) => {
    const text = element.textContent?.toLowerCase().trim()
    if (text) {
      return t('cursor.goToSection') + ': ' + text
    }
    return t('cursor.goToSection')
  }

  const getThemeLabel = () => {
    const isDark = document.documentElement.classList.contains('chakra-ui-dark')
    return isDark ? t('cursor.toggleTheme') + ': Light' : t('cursor.toggleTheme') + ': Dark'
  }

  const getLanguageLabel = () => {
    return lang === 'en' ? t('cursor.changeLanguage') + ': اردو' : t('cursor.changeLanguage') + ': English'
  }

  const getTeamMemberLabel = (element) => {
    const name = element.textContent?.trim()
    if (name) {
      return t('cursor.viewMore') + ': ' + name
    }
    return t('cursor.viewMore')
  }

  const getServiceLabel = (element) => {
    const service = element.textContent?.trim()
    if (service) {
      return t('cursor.viewMore') + ': ' + service
    }
    return t('cursor.viewMore')
  }

  const getSkillLabel = (element) => {
    const skill = element.textContent?.trim()
    if (skill) {
      return t('cursor.viewMore') + ': ' + skill
    }
    return t('cursor.viewMore')
  }

  useEffect(() => {
    // Check if device is mobile/touch
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 
                    window.matchMedia('(hover: none)').matches
    setIsVisible(!isMobile)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 10) // Offset to center cursor
      mouseY.set(e.clientY - 10)
    }

    const handleMouseEnter = (e) => {
      const target = e.target;

      // Check if target is an Element node
      if (target instanceof Element) {
        const isInteractive = target.closest('a, button, [role="button"], [role="link"]');
        const isCard = target.closest('[data-card]');

        if (isInteractive || isCard) {
          setIsHovering(true);

          // Set hover label based on element type and content
          if (target.closest('[role="button"]')) {
            if (target.closest('[aria-label*="theme"]')) {
              setHoverLabel(getThemeLabel());
            } else if (target.closest('[aria-label*="language"]')) {
              setHoverLabel(getLanguageLabel());
            }
          } else if (target.closest('a')) {
            setHoverLabel(getNavigationLabel(target));
          } else if (target.closest('[data-team-member]')) {
            setHoverLabel(getTeamMemberLabel(target));
          } else if (target.closest('[data-service]')) {
            setHoverLabel(getServiceLabel(target));
          } else if (target.closest('[data-skill]')) {
            setHoverLabel(getSkillLabel(target));
          } else if (target.closest('button')) {
            setHoverLabel(t('cursor.clickAction'));
          }
        } else {
          setIsHovering(false);
          setHoverLabel('');
        }
      } else {
        setIsHovering(false);
        setHoverLabel('');
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setHoverLabel('')
    }

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseenter', handleMouseEnter, true)
      document.addEventListener('mouseleave', handleMouseLeave, true)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [isVisible, mouseX, mouseY, t, lang])

  if (!isVisible) return null

  return (
    <>
      <MotionBox
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
        }}
        position="fixed"
        top={0}
        left={0}
        pointerEvents="none"
        zIndex={9999}
        borderRadius="full"
        border="2px solid"
        borderColor={cursorBorder}
        bg={cursorBg}
        boxShadow={`0 0 10px ${cursorColor}40`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && (
          <MotionBox
            position="absolute"
            top="-30px"
            left="50%"
            transform="translateX(-50%)"
            bg={labelBg}
            px={2}
            py={1}
            borderRadius="md"
            boxShadow="md"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Text
              fontSize="xs"
              fontWeight="medium"
              color={labelColor}
              whiteSpace="nowrap"
              pointerEvents="none"
            >
              {hoverLabel}
            </Text>
          </MotionBox>
        )}
      </MotionBox>
    </>
  )
}

export default MagicCursor
