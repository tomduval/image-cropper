import React from "react";
import Box from "@material-ui/core/Box";

export default function Container({
  size = 0,
  def = false,
  styles = {},
  children,
}) {
  const boxStyles = {
    ...{
      paddingTop: `${def ? 8 * size : !size ? "50px" : `${24 * size}px`}`,
      height: "100%",
      position: "relative",
      overflow: !def && "auto",
    },
    ...styles,
  };
  return (
    <Box p={size} style={boxStyles}>
      {children}
    </Box>
  );
}
