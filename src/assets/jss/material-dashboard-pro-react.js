/*!

=========================================================
* Material Dashboard PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
import * as variants from 'theme/variants'

const hexToRgb = input => {
  input = input + ''
  input = input.replace('#', '')
  let hexRegex = /[0-9A-Fa-f]/g
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.')
  }
  if (input.length === 3) {
    let first = input[0]
    let second = input[1]
    let last = input[2]
    input = first + first + second + second + last + last
  }
  input = input.toUpperCase(input)
  let first = input[0] + input[1]
  let second = input[2] + input[3]
  let last = input[4] + input[5]
  return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16)
}

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260

const drawerMiniWidth = 80

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
}

// Estilos
const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
}

const container = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  '@media (min-width: 768px)': {
    width: '750px',
  },
  '@media (min-width: 992px)': {
    width: '970px',
  },
  '@media (min-width: 1200px)': {
    width: '1170px',
  },
  '&:before,&:after': {
    display: 'table',
    content: '" "',
  },
  '&:after': {
    clear: 'both',
  },
}

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em',
}

// Se crear variantes con los diferentes colores.
// Se selecciona la variante mediante la clave REACT_APP_THEME definida en la variable de entorno

const theme = variants[process.env.REACT_APP_THEME || 'defaultTheme']

const primaryColor = theme.PRIMARY_COLOR
const miColor = theme.LOGIN_COLOR
const roseColor = theme.SECONDARY_COLOR
const warningColor = theme.WARNING_COLOR
const dangerColor = theme.DANGER_COLOR
const successColor = theme.SUCCESS_COLOR
const infoColor = theme.INFO_COLOR

//Primary color principal notaria!

//notaria 1
//const primaryColor = ["#DC1C2C", "#D02836", "#C53541", "#B9414B", "#AE4E56"];

//notaria 2
// const primaryColor = [
//   "#f44336",
//   "#ef5350",
//   "#e53935",
//   "#f55a4e",
//   "#d32f2f"
// ];

// Segundo color de la notaria

// notaria 2
// const warningColor = [
//   "#0a0a0a",
//   "#191919",
//   "#1c1c1c",
//   "#1e1e1e",
//   "#212121",
//   "#faf2cc",
//   "#fcf8e3"
// ];

//notaria 3

// Prueba verde succes, info y danger

// const successColor = [
//   "#C7FF20",
//   "#BEEF2C",
//   "#B5DF38",
//   "#ACCF44",
//   "#A3BF50",
//   "#d0e9c6",
//   "#dff0d8"
// ];
// const infoColor = [
//   "#CFFF40",
//   "#C5EF48",
//   "#BBDF50",
//   "#B1CF58",
//   "#A7BF60",
//   "#c4e3f3",
//   "#d9edf7"
// ];

// const dangerColor = [
//   "#D7FF60",
//   "#CCEF64",
//   "#C1DF68",
//   "#B6CF6C",
//   "#ABBF70",
//   "#ebcccc",
//   "#f2dede"
// ];

//const roseColor = ["#e91e63", "#4a40ec", "#1bbed8", "#eb3573", "#c2185b"];
//const roseColor = ["#ff7e00", "#ff6600", "#ff8000", "#ec7c26", "#f75e25"];

//const miColor = ["#c981b7"];

const grayColor = [
  '#999',
  '#777',
  '#3C4858',
  '#AAAAAA',
  '#D2D2D2',
  '#DDD',
  '#555555',
  '#333',
  '#eee',
  '#ccc',
  '#e4e4e4',
  '#E5E5E5',
  '#f9f9f9',
  '#f5f5f5',
  '#495057',
  '#e7e7e7',
  '#212121',
  '#c8c8c8',
  '#505050',
]
const blackColor = '#000'
const whiteColor = '#FFF'
const twitterColor = '#55acee'
const facebookColor = '#3b5998'
const googleColor = '#dd4b39'
const linkedinColor = '#0976b4'
const pinterestColor = '#cc2127'
const youtubeColor = '#e52d27'
const tumblrColor = '#35465c'
const behanceColor = '#1769ff'
const dribbbleColor = '#ea4c89'
const redditColor = '#ff4500'

const boxShadow = {
  boxShadow:
    '0 10px 30px -12px rgba(' +
    hexToRgb(blackColor) +
    ', 0.42), 0 4px 25px 0px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 8px 10px -5px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
}

const primaryBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(primaryColor[0]) + ',.4)',
}
const infoBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(infoColor[0]) + ',.4)',
}
const successBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(successColor[0]) + ',.4)',
}
const warningBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(warningColor[0]) + ',.4)',
}
const dangerBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(dangerColor[0]) + ',.4)',
}
const roseBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(roseColor[0]) + ',.4)',
}
const miBoxShadow = {
  boxShadow:
    '0 4px 20px 0 rgba(' + hexToRgb(blackColor) + ',.14), 0 7px 10px -5px rgba(' + hexToRgb(miColor[0]) + ',.4)',
}

const warningCardHeader = {
  background: 'linear-gradient(60deg, ' + warningColor[1] + ', ' + warningColor[2] + ')',
  ...warningBoxShadow,
}
const successCardHeader = {
  background: 'linear-gradient(60deg, ' + successColor[1] + ', ' + successColor[2] + ')',
  ...successBoxShadow,
}
const dangerCardHeader = {
  background: 'linear-gradient(60deg, ' + dangerColor[1] + ', ' + dangerColor[2] + ')',
  ...dangerBoxShadow,
}
const infoCardHeader = {
  background: 'linear-gradient(60deg, ' + infoColor[1] + ', ' + infoColor[2] + ')',
  ...infoBoxShadow,
}
const primaryCardHeader = {
  background: 'linear-gradient(60deg, ' + primaryColor[1] + ', ' + primaryColor[2] + ')',
  ...primaryBoxShadow,
}
const roseCardHeader = {
  background: 'linear-gradient(60deg, ' + roseColor[1] + ', ' + roseColor[2] + ')',
  ...roseBoxShadow,
}
const miCardHeader = {
  background: 'linear-gradient(60deg, ' + miColor[0] + ', ' + miColor[0] + ')',
  ...miBoxShadow,
}

const card = {
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  margin: '25px 0',
  boxShadow: '0 1px 4px 0 rgba(' + hexToRgb(blackColor) + ', 0.14)',
  borderRadius: '6px',
  color: 'rgba(' + hexToRgb(blackColor) + ', 0.87)',
  background: whiteColor,
}

const cardActions = {
  margin: '0 20px 10px',
  paddingTop: '10px',
  borderTop: '1px solid ' + grayColor[8],
  height: 'auto',
  ...defaultFont,
}

const cardHeader = {
  margin: '-20px 15px 0',
  borderRadius: '3px',
  padding: '15px',
}

const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(' +
    hexToRgb(blackColor) +
    ', 0.42), 0 3px 20px 0px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 8px 10px -5px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
}

const tooltip = {
  padding: '10px 15px',
  minWidth: '130px',
  color: whiteColor,
  lineHeight: '1.7em',
  background: 'rgba(' + hexToRgb(grayColor[6]) + ',0.9)',
  border: 'none',
  borderRadius: '3px',
  opacity: '1!important',
  boxShadow:
    '0 8px 10px 1px rgba(' +
    hexToRgb(blackColor) +
    ', 0.14), 0 3px 14px 2px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 5px 5px -3px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
  maxWidth: '200px',
  textAlign: 'center',
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '400',
  textShadow: 'none',
  textTransform: 'none',
  letterSpacing: 'normal',
  wordBreak: 'normal',
  wordSpacing: 'normal',
  wordWrap: 'normal',
  whiteSpace: 'normal',
  lineBreak: 'auto',
}

const title = {
  color: grayColor[2],
  textDecoration: 'none',
  fontWeight: '300',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  '& small': {
    color: grayColor[1],
    fontSize: '65%',
    fontWeight: '400',
    lineHeight: '1',
  },
}

const cardTitle = {
  ...title,
  marginTop: '0',
  marginBottom: '3px',
  minHeight: 'auto',
  '& a': {
    ...title,
    marginTop: '.625rem',
    marginBottom: '0.75rem',
    minHeight: 'auto',
  },
}

const cardSubtitle = {
  marginTop: '-.375rem',
}

const cardLink = {
  '& + $cardLink': {
    marginLeft: '1.25rem',
  },
}

export {
  hexToRgb,
  //variables
  drawerWidth,
  drawerMiniWidth,
  transition,
  container,
  containerFluid,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  miColor,
  grayColor,
  blackColor,
  whiteColor,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  miCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  tooltip,
  title,
  cardTitle,
  cardSubtitle,
  cardLink,
}
