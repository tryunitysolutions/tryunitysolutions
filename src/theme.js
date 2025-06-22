import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: {
    body: {
      bg: 'veryLightGray',
      color: 'darkGray',
      _dark: {
        bg: 'nearBlack',
        color: 'lightGray',
      },
    },
  },
};

const colors = {
  brand: {
    50: '#E0F7FA',   // Cyan.50
    100: '#B2EBF2',  // Cyan.100
    200: '#80DEEA',  // Cyan.200
    300: '#4DD0E1',  // Cyan.300
    400: '#26C6DA',  // Cyan.400
    500: '#00BCD4',  // Cyan.500 (Primary Cyan)
    600: '#00ACC1',  // Cyan.600
    700: '#0097A7',  // Cyan.700
    800: '#00838F',  // Cyan.800
    900: '#006064',  // Cyan.900
  },
  lightBlue: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Primary Light Blue
    600: '#1976D2',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0D47A1',
  },
  indigoBlue: {
    50: '#E8EAF6',
    100: '#C5CAE9',
    200: '#9FA8DA',
    300: '#7986CB',
    400: '#5C6BC0',
    500: '#3F51B5', // Primary Indigo Blue
    600: '#3949AB',
    700: '#303F9F',
    800: '#283593',
    900: '#1A237E',
  },
  darkGray: '#333333',
  lightGray: '#F3F4F6',
  veryLightGray: '#FAFAFA',
  nearBlack: '#1A202C',
  lightText: '#4A5568',
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ styles, colors, config });

export default theme; 