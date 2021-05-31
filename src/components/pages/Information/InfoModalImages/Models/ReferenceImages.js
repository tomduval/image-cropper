import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import SMImageWrapper from "components/organisms/SMImageWrapper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(theme => {
  return {
    refDialogTitle: {
      // paddingBottom: "8px",
    },
    refDialogContent: {
      // height: "calc(100% - 84px)",
    },
    deleteImageIcon: {
      position: "absolute",
      top: "15px",
      right: "0px",
      "&:hover": {
        cursor: "pointer",
      },
    },
  };
});

export default function ReferenceImages({
  newImages,
  faceOptions,
  product,
  onDeleteImage,
  parentClasses = {},
  viewImage = () => {},
}) {
  const classes = { ...useStyles(), ...parentClasses };

  return (
    <>
      <DialogContent
        dividers
        className={clsx(classes.dialogContent, classes.refDialogContent)}
        style={{ height: "100%" }}
      >
        <div className={classes.sixRowImages}>
          <div className={classes.contentVertical}>
            {Object.values({
              ...faceOptions,
            }).map((value, index) => {
              const image =
                newImages && newImages.find(im => im.face === value.faceId);
              return (
                <div key={index} style={{ position: "relative" }}>
                  <SMImageWrapper
                    imageAvailable="true"
                    textAbove={false}
                    text={value.face}
                    callBack={() =>
                      viewImage({
                        planogramImages: newImages,
                        measurement: product.measurement,
                        models: [],
                        faceId: value.faceId,
                      })
                    }
                    image={image || value}
                    styleImages={{
                      width: "100%",
                      height: "200px",
                      marginBottom: "10px",
                    }}
                    imageStatus={image?.status}
                  />
                  {image && (
                    <HighlightOffIcon
                      onClick={() => onDeleteImage(image)}
                      className={clsx(classes.deleteImageIcon, classes.red)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </>
  );
}
