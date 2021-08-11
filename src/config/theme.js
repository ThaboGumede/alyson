import { extendTheme } from '@chakra-ui/react'

const defaultProjectTheme = {
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    error: { 50: '#FFF5F5', 500: '#E53E3E', 900: '#700f0f' },
    warning: { 50: '#FFFAF0', 500: '#DD6B20', 900: '#62300e' },
    success: { 50: '#F0FFF4', 500: '#38A169', 900: '#133523' },
  },
  textStyles: {
    head: {
      1: { fontSize: '2xl', fontWeight: 700, opacity: 0.9 },
      2: { fontSize: '2xl', fontWeight: 400, opacity: 0.9 },
      3: { fontSize: '2xl', fontWeight: 400, opacity: 0.6 },
      error: { fontSize: '2xl', fontWeight: 400, color: 'red.500', opacity: 0.9 },
      success: { fontSize: '2xl', fontWeight: 400, color: 'green.500', opacity: 0.9 },
    },
    body: {
      1: { fontSize: 'md', fontWeight: 700, opacity: 0.9 },
      2: { fontSize: 'md', fontWeight: 400, opacity: 0.9 },
      3: { fontSize: 'md', fontWeight: 400, opacity: 0.6 },
      error: { fontSize: 'md', fontWeight: 400, color: 'red.500', opacity: 0.9 },
      success: { fontSize: 'md', fontWeight: 400, color: 'green.500', opacity: 0.9 },
    },
    tail: {
      1: { fontSize: 'xs', fontWeight: 700, opacity: 0.9 },
      2: { fontSize: 'xs', fontWeight: 400, opacity: 0.9 },
      3: { fontSize: 'xs', fontWeight: 400, opacity: 0.6 },
      error: { fontSize: 'xs', fontWeight: 400, color: 'red.500', opacity: 0.9 },
      success: { fontSize: 'xs', fontWeight: 400, color: 'green.500', opacity: 0.9 },
    },
  },
}

const getTheme = (projectTheme = defaultProjectTheme) =>
  extendTheme({
    config: {
      initialColorMode: 'light',
    },
    ...projectTheme,
  })

export default getTheme
