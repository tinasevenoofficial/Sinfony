import * as variants from 'theme/variants'

const theme = variants[process.env.REACT_APP_THEME || 'defaultTheme']

const white = '#FFFFFF'

const defaultTheme = {
  primary: {
    light: theme.PRIMARY_COLOR[0],
    main: theme.PRIMARY_COLOR[1],
    dark: theme.PRIMARY_COLOR[2],
    contrastText: white,
  },
  secondary: {
    light: theme.SECONDARY_COLOR[0],
    main: theme.SECONDARY_COLOR[1],
    dark: theme.SECONDARY_COLOR[2],
    contrastText: white,
  },
}

const themes = {
  notaria: defaultTheme,
  Nota10bga: defaultTheme,
  Nota26bta: defaultTheme,
  Nota3bga: defaultTheme,
  Nota14med: defaultTheme,
  Nota2bga: defaultTheme,
  Nota51bta: defaultTheme,
  Notaria27bta: defaultTheme,
  Nota16bta: defaultTheme,
  Nota2flo: defaultTheme,
  Nota5bga: defaultTheme,
  Nota1mon: defaultTheme,
  Nota2rio: defaultTheme,
  Nota72bta: defaultTheme,
  Nota21cal: defaultTheme,
  Nota2zip: defaultTheme,
  Nota9bga: defaultTheme,
  Nota4cal: defaultTheme,
  Nota3env: defaultTheme 
}

const getTheme = (theme) => theme ? themes[theme] : themes.notaria

export default getTheme