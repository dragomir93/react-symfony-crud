import { createTheme } from '@mui/material';
import Colors from './Colors';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 1025,
  xl: 1280,
};

const darkMaterialTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: Colors.primaryLight,
      main: Colors.primaryMain,
      dark: Colors.primaryDark,
      contrastText: Colors.primaryContrastText,
    },
    text: {
      primary: Colors.white,
      secondary: Colors.white,
      disabled: Colors.textDisabled,
      hint: Colors.textHint,
      icon: Colors.textIcon,
    },
    divider: Colors.themeDivider,
    background: {
      paper: Colors.backgroundDefault,
      default: Colors.backgroundBodyLight,
      secondary: Colors.backgroundSecondary,
    },
    success: {
      light: Colors.primaryLight,
      main: Colors.primaryMain,
      dark: Colors.primaryDark,
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: Colors.redErrorColorMain,
    },
    customColors: Colors,
  },
  typography: {
    textTransform: 'none',
    fontFamily: 'TTNormsPro-Regular',
    button: {
      textTransform: 'none',
      fontSize: '0.88rem',
    },
  },
  breakpoints: {
    values: breakpoints,
  },
  overrides: {
    MuiButton: {
      outlined: {
        color: Colors.primaryContrastText,
      },
    },
    MuiIconButton: {
      root: {
        color: Colors.primaryContrastText,
      },
    },
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px #2C2C2E inset',
        },
      },
    },
  },
});

export default darkMaterialTheme;
