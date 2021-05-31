import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CachedIcon from "@material-ui/icons/Cached";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { createImageUrl } from "utils/images";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  imageContainer: {
    paddingRight: "10px",
    paddingLeft: "10px",
    display: "flex",
    flexDirection: "column",
    minWidth: "100px",
    marginBottom: "10px",
  },
  addImageContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: `1px dashed ${theme.palette.text.light}`,
  },
  line: {
    position: "absolute",
    width: "100%",
    height: "2px",
    backgroundImage: `linear-gradient(to right, transparent 50%, ${theme.palette.text.light} 50%)`,
    backgroundSize: "20px 100%",
  },
  line1: {
    top: 0,
    left: "-6px",
  },
  line2: {
    bottom: 0,
    left: "-5px",
  },
  line3: {
    top: "50%",
    left: "-67%",
    width: "137%",
    transform: "rotate(90deg)",
  },
  line4: {
    top: "50%",
    right: "-67%",
    width: "137%",
    transform: "rotate(90deg)",
  },
  imgIcon: {
    display: "flex",
    flexDirection: "vertical",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5px",
  },
  iconLightGrey: {
    color: theme.palette.grey[600],
  },
  iconGreen: {
    color: theme.palette.secondary.main,
    height: "16px",
    width: "16px",
  },
  iconBlue: {
    color: theme.palette.blue.main,
    height: "16px",
    width: "16px",
  },
  iconOrange: {
    color: "#D5D5D5",
    height: "16px",
    width: "16px",
  },
  textNearIconNarrowDark: {
    margin: "0px",
    marginLeft: "5px",
    color: theme.palette.text.dark,
    fontSize: "16px",
  },
  images: {
    position: "relative",
    padding: "3px",
    height: "100px",
    width: "80px",
    margin: "auto",
    marginTop: "10px",
    "& img": {
      height: "100%",
      width: "100%",
      borderRadius: "5px",
      objectFit: "contain",
    },
  },
  absoluteCenter: {
    position: "absolute",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: "#32323275",
    },
    height: "100%",
    width: "100%",
    padding: "30% 30% 30% 30%",
    top: "0px",
    left: "0px",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      color: theme.palette.secondary.main,
    },
  },
  lightTextGrey: {
    color: `${theme.palette.grey[700]} !important`,
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  capitalize: {
    textTransform: "capitalize",
  },
}));

function SMImageWrapper({
  imageStatus,
  textAbove = true,
  text,
  callBack,
  image,
  addImage,
  createImageUrl: createUrl,
  context = "low",
  styleImages = {},
}) {
  const classes = useStyles();
  return !addImage ? (
    <div className={classes.imageContainer}>
      {text && textAbove ? (
        <span>
          <div className={classes.imgIcon}>
            {imageStatus === "true" ? (
              <CheckCircleIcon className={classes.iconGreen} />
            ) : imageStatus === "complete" ? (
              <CheckCircleIcon className={classes.iconGreen} />
            ) : imageStatus === "loading" ? (
              <CachedIcon className={classes.iconBlue} />
            ) : imageStatus === "new" ? (
              <FiberNewIcon className={classes.iconGreen} />
            ) : imageStatus === "uploading" ? (
              <CloudUploadIcon className={classes.iconGreen} />
            ) : image && image.url ? (
              <CheckCircleIcon className={classes.iconGreen} />
            ) : (
              <FiberManualRecordIcon className={classes.iconOrange} />
            )}
            <p className={classes.textNearIconNarrowDark}>{text}</p>
          </div>
        </span>
      ) : (
        <span style={{ height: textAbove ? "27px" : "15px" }}></span>
      )}
      <Paper
        className={classes.images}
        elevation={5}
        onClick={image && image.url && (() => callBack(image))}
        style={{
          ...styleImages,
          border: imageStatus ? "1px solid" : "",
          borderColor:
            imageStatus === "complete"
              ? "green"
              : imageStatus === "loading"
              ? "blue"
              : imageStatus === "new"
              ? "purple"
              : imageStatus === "uploading"
              ? "orange"
              : imageStatus === "edit"
              ? "red"
              : "unset",
        }}
      >
        {image && image.url && (
          <>
            <img
              alt="logo"
              src={createUrl ? createImageUrl(image, context) : image.url}
            />
            <ZoomInIcon className={classes.absoluteCenter} />
          </>
        )}
      </Paper>
      {!textAbove && (
        <>
          <Typography
            variant="button"
            className={clsx(
              classes.lightTextGrey,
              classes.capitalize,
              classes.flexBetween,
            )}
          >
            <span> {text}</span>
            <span className={clsx(classes.bold)}> Updated </span>
          </Typography>
          <Typography
            variant="button"
            className={clsx(
              classes.lightTextGrey,
              classes.capitalize,
              classes.flexBetween,
            )}
          >
            <span> </span>
            <span>
              {image ? new Date(image.updatedAt).toLocaleString() : "---"}
            </span>
          </Typography>
        </>
      )}
    </div>
  ) : (
    <div className={`${classes.imageContainer}`}>
      <span style={{ height: "27px" }}></span>
      <Paper
        className={`${classes.images} ${classes.addImageContainer}`}
        elevation={0}
      >
        <div className={`${classes.line} ${classes.line1}`}></div>
        <div className={`${classes.line} ${classes.line2}`}></div>
        <div className={`${classes.line} ${classes.line3}`}></div>
        <div className={`${classes.line} ${classes.line4}`}></div>
        <AddCircleOutlineIcon
          fontSize="large"
          className={classes.iconLightGrey}
        />
      </Paper>
    </div>
  );
}

export default SMImageWrapper;
