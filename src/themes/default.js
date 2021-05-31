import tinycolor from "tinycolor2";

const primary = "#323232";
const secondary = "#00CB00";
const white = "#ffffff";
const error = "#FF0000";
const warning = "#FF8700";
const success = secondary;
const info = "#9013FE";
const gray = "#666666";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(primary)
        .darken(darkenRate)
        .toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#202020",
    },
    secondaryOnDark: {
      main: secondary,
      light: tinycolor(secondary)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(secondary)
        .darken(darkenRate)
        .toHexString(),
      contrastText: "#202020",
    },
    error: {
      main: error,
      light: tinycolor(error)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(error)
        .darken(darkenRate)
        .toHexString(),
    },
    tertiary: {
      main: gray,
      light: "#A2A2A2",
      medium: "#424242",
      dark: "#323232",
      contrastText: "#FFFFFF",
    },
    blue: {
      main: "#00aeff",
      light: "#69e0ff",
      dark: "#007fcb",
      contrastText: "#FFFFFF",
    },
    green: {
      main: "#00ca00",
      light: "#62fe4b",
      xlight: "#d4efc0",
      dark: "#009800",
      contrastText: "#FFFFFF",
    },
    orange: {
      main: "#FF8700",
      // light: "#62fe4b",
      // xlight: "#d4efc0",
      // dark: "#009800",
      // contrastText: "#FFFFFF",
    },
    bone: {
      light: "#f0f0f0",
      medium: "#e0e0e0",
      dark: "#d0d0d0",
      contrastText: "#121212",
    },
    warning: {
      main: warning,
      light: tinycolor(warning)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(warning)
        .darken(darkenRate)
        .toHexString(),
    },
    success: {
      main: success,
      light: tinycolor(success)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(success)
        .darken(darkenRate)
        .toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info)
        .lighten(lightenRate)
        .toHexString(),
      dark: tinycolor(info)
        .darken(darkenRate)
        .toHexString(),
    },
    text: {
      primary: primary,
      secondary: tinycolor(primary)
        .lighten(lightenRate)
        .toHexString(),
      white: white,
      hint: "#B9B9B9",
      light: "#A2A2A2",
      medium: "#666666",
      dark: "#323232",
    },
    background: {
      default: "#d5d4d4",
      light: "#F3F5FF",
    },
    loginBackground: {
      default: "#282828",
    },
    loginCardBackground: {
      start: "#424242",
      end: "#616161",
    },
    appBarBackground: {
      start: "#171717",
      end: "#4c4c4c",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MuiMenu: {
      paper: {
        // boxShadow:"0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
      },
    },
    MuiSelect: {
      icon: {
        color: "#B9B9B9",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#00CA0050 !important",
          color: "#121212",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "#00CA0050",
          color: "#121212",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        //backgroundColor: "white",
        // backgroundColor: "#00ff00",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: primary,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
      },
      head: {
        fontSize: "0.95rem",
      },
      body: {
        fontSize: "0.95rem",
      },
    },
    MUIDataTable: {
      responsiveScrollFullHeight: {
        overflowY: "hidden",
      },
    },
    MUIDataTableToolbar: {
      titleText: {
        fontWeight: "bold",
      },
    },
    MuiDropzoneArea: {
      root: {
        "&:focus": {
          outline: "unset",
        },
      },
    },
    MuiDropzoneSnackbar: {
      successAlert: {
        backgroundColor: secondary,
      },
      infoAlert: {
        backgroundColor: primary,
      },
    },
    MuiDialog: {
      container: {
        backgroundColor: "#00000069",
      },
    },
    MuiToggleButtonGroup: {
      root: {
        //backgroundColor: "green",
      },
    },
    MuiSelected: {
      root: {
        // border: "1px solid black",
        //height: "100px",
        //width: "80px",
        //margin: "auto",
        //marginTop: "100px",
        backgroundcolor: "blue",
      },
    },
  },
};
