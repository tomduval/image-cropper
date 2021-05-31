import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import PhotoSizeSelectLargeIcon from "@material-ui/icons/PhotoSizeSelectLarge";
import PhotoSizeSelectSmallIcon from "@material-ui/icons/PhotoSizeSelectSmall";
import clsx from "clsx";
import ImageCropper from "components/pages/Information/InfoModalImages/ImageCropper";

const useStyles = makeStyles(theme => {
  return {
    dialogActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: "25px",
      marginTop: "auto",
    },
    dialogActionButtonContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    dialogActionButton: {
      fontSize: "14px",
      width: "80%",
      borderRadius: "50px",
    },
    contentBackground: {
      backgroundColor: theme.palette.grey[300],
      width: "100%",
    },
    imageContainer: {
      position: "relative",
      display: "flex",
      paddingTop: "10px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 10px",
      "&:first-child": {
        marginLeft: "0",
      },
      "&:last-child": {
        marginRight: "0",
      },
    },
    image: {
      backgroundColor: theme.palette.secondary.main,
      width: "75px",
      height: "85px",
      borderRadius: "13px",
    },
    face: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0",
    },
    dialogContentImage: {
      width: "100%",
      height: "calc(100% - 170px)",
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },
    zoomIn: {
      position: "absolute",
      top: "25px",
      right: "20px",
      backgroundColor: theme.palette.grey[900],
      borderRadius: "100%",
      height: "40px",
      width: "40px",
      boxShadow: `0 4px 20px -1px ${theme.palette.grey[800]}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        boxShadow: `0 -4px 20px -1px ${theme.palette.grey[800]}`,
        cursor: "pointer",
      },
    },
    toggleButtonGroup: {
      position: "absolute",
      top: "20px",
    },
    dropzone: {
      height: "100%",
      "&:focus": {
        outline: "none",
      },
    },
    active: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.dark,
      border: "1px solid #bdbdbd",
      fontWeight: "bold",
      height: "50px",
      "&:hover": {
        color: theme.palette.grey[50],
        backgroundColor: theme.palette.secondary.main,
      },
    },
    passive: {
      color: theme.palette.text.dark,
      backgroundColor: theme.palette.grey[50],
      border: "1px solid #bdbdbd",
      fontWeight: "bold",
      height: "50px",
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    twoD: {
      borderTopLeftRadius: "15px",
      borderBottomLeftRadius: "15px",
    },
    threeD: {
      borderTopRightRadius: "15px",
      borderBottomRightRadius: "15px",
    },
    deleteImageIcon: {
      position: "absolute",
      top: "0px",
      right: "-5px",
    },
  };
});

export default function StageModel({
  selectedImage,
  association,
  parentClasses = {},
  isFullScreen,
  handleToggleFullScreen,
  onEditImage,
}) {
  const classes = { ...parentClasses, ...useStyles() };
  const product = (association && association.product) || {};

  return (
    <>
      {!isFullScreen && (
        <DialogTitle
          id="customized-dialog-title"
          disableTypography
          className={classes.dialogTitle}
        >
          <Typography
            color="primary"
            variant="subtitle1"
            className={clsx(
              classes.bold,
              classes.flexBetween,
              classes.capitalize,
            )}
          >
            <span
              style={{
                fontSize: product.name.length > 30 ? "10px" : "15px",
                lineHeight: "1.4",
              }}
            >
              {product.name}
            </span>
            {/* <span>Updated:</span> */}
          </Typography>
          <Typography
            variant="button"
            className={clsx(classes.lightTextGrey, classes.flexBetween)}
          >
            <span> UPC: {product.upc}</span>
            <span> H: {product?.measurement?.height}</span>
            <span> W: {product?.measurement?.width}</span>
            <span> D: {product?.measurement?.depth}</span>
            <span className={classes.lowercase}>
              {/* {currentModel
                ? new Date(currentModel.updatedAt).toLocaleString()
                : "---"} */}
            </span>
          </Typography>
        </DialogTitle>
      )}

      <DialogContent
        dividers
        className={clsx(classes.dialogContent)}
        style={{
          padding: !isFullScreen ? "0 0 10px" : "0",
          height: isFullScreen && "100%",
        }}
      >
        <>
          <ImageCropper
            selectedImage={selectedImage}
            onEditImage={onEditImage}
          />

          <div className={classes.zoomIn} onClick={handleToggleFullScreen}>
            {isFullScreen ? (
              <PhotoSizeSelectSmallIcon className={classes.white} />
            ) : (
              <PhotoSizeSelectLargeIcon className={classes.white} />
            )}
          </div>
        </>
      </DialogContent>
    </>
  );
}
