import { createTheme } from '@material-ui/core/styles';
import { infoColor } from "assets/jss/material-dashboard-pro-react.js";

const themeInputSecondary = createTheme({
    palette: {
        primary: {
            main: infoColor[0],
            light: infoColor[0],
            dark: infoColor[0],
        }
    },
});

export default themeInputSecondary