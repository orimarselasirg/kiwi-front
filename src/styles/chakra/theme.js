import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import { accordionTheme } from './accordion'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  fonts: {
    body: 'Roboto'
  },
  colors: {
    brand: {
      primary: '#EB9119',
      primaryDarkVariant: '#E17614',
      primaryLightVariant: '#F5C782',
      sec: '#F09135',
      select: '#F88319',
      complementaryBlue: '#147EE1',
      analogousRed: '#E11417',
      analogousYellow: '#E1DE14',
      triadicGreenLight: '#7EE114',
      triadicGreenDark: '#14E177',
      grayLight: '#E2E8F0',
      dark: '#424242',
      light: '#ECEFF1'
    }
  },
  styles: {
    global: (props) => ({
      '#root, html, body': {
        h: '100vh',
        w: '100%',
        color: mode('brand.dark', 'brand.light')(props),
        overflow: 'auto'
      },
      '*::-webkit-scrollbar': {
        // display: 'none'
      },
      '*': {
        WebkitTapHighlightColor: 'transparent'
      },
      body: {
        bg: mode('brand.dark', 'brand.light')(props)
        // overflow: 'auto'
      }
    })
  },
  components: { Accordion: accordionTheme }
})

export default theme
