import React from "react";

import Button from "@material-ui/core/Button";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rotateButton: {
    position: "fixed",
    bottom: "50%",
    padding: "2px",
    backgroundColor: "black",
    borderRadius: "100%",
    minWidth: "40px",
    height: "40px",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  rotateButtonLeft: {
    left: "20px",
  },
  rotateButtonRight: {
    right: "20px",
  },
  closeIcon: {
    color: "white",
    fontSize: "30px",
  },
});

export const PrevNextButton = ({ name, rotate, styles }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        ...styles,
      }}
      onClick={rotate}
    >
      <Button
        classes={{
          root: classes.rotateButton,
        }}
        style={{ ...styles }}
      >
        {name === "left" ? (
          <ArrowLeftIcon classes={{ root: classes.closeIcon }} />
        ) : (
          <ArrowRightIcon classes={{ root: classes.closeIcon }} />
        )}
      </Button>
    </div>
  );
};
