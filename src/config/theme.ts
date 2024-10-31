import { dimensions, height, width } from 'src/utils/dimensions'

/**
 * Theme For Styled Components
 * -
 */
export const appTheme = {
  primary: '#8513A4',
  secondary: '#fff',
  secondary2: '#ddd',
  semi: '#E1D3E5',
  themeBlack: '#000',

  // primaryBColor: '#8513A4',
  // primaryHColor: '#fff',
  size: dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`
}

/**
 * Theme For Expo Navigation Header
 * -
 */
export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.primary,
    border: appTheme.secondary,
    card: appTheme.primary,
    notification: appTheme.primary,
    primary: appTheme.primary,
    text: appTheme.primary
  }
}
