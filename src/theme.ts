import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    dark: {
      50: '#1e1e1e',
      100: '#2a2a2a',
      200: '#303030',
      300: '#383838',
      400: '#5a5a5a',
      500: '#6f6f6f',
      600: '#a4a4a4',
      700: '#b9b9b9',
      800: '#d4d4d4',
      900: '#eeeeee',
    },
    // Add more colors as needed
  },
  styles: {
    global: (props : any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark.50' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'dark.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props : any) => ({
        bg: props.colorMode === 'dark' ? 'dark.600' : 'dark.300',
        color: props.colorMode === 'dark' ? 'white' : 'dark.900',
      }),
    },
    // Add more component styles as needed
  },
});



// 3. extend the theme
// const theme = extendTheme({ config })

export default theme