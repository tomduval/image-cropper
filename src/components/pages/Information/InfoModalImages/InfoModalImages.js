import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import StageModel from "./Models/StageModel";
import ReferenceImages from "./Models/ReferenceImages";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createImageUrl } from "utils/images";

const useStyles = makeStyles(theme => {
  return {
    white: {
      color: theme.palette.grey[50],
    },
    green: {
      color: theme.palette.secondary.main,
    },
    red: {
      color: theme.palette.error.main,
    },
    lightGrey: {
      color: `${theme.palette.text.light} !important`,
    },
    lightTextGrey: {
      color: `${theme.palette.grey[700]} !important`,
    },
    bgGreen: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    bgRed: {
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.main,
      },
    },
    bgLightBlue: {
      backgroundColor: "#2196f3",
      "&:hover": {
        backgroundColor: "#2196f3",
      },
    },
    bold: {
      fontWeight: "bold",
    },
    fullWidth: {
      width: "100%",
    },
    flex: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    flexBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    flexCenter: {
      display: "flex",
      alignItems: "center",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    lowercase: {
      textTransform: "lowercase",
    },
    dialogTitle: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    dialogContent: {
      position: "relative",
      display: "flex",
      height: "calc(100% - 153px)",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "8px 24px",
      },
    },
    sixRowImages: {
      display: "flex",
      overflowY: "scroll",
      width: "100%",
      paddingTop: "10px",
      minHeight: "170px",
    },
    contentHoz: {
      display: "flex",
      justifyContent: "flex-end",
    },
    contentVertical: {
      display: "flex",
      flexDirection: "column",
    },
    paperScrollPaper: {
      position: "relative",
      height: "100%",
      maxWidth: "initial!important",
    },
    modelsContainer: {
      display: "flex",
      height: "100%",
      maxHeight: "100%",
    },
    modelsReferenceImages: {
      width: "20%",
    },
    modelsStage: {
      borderRight: `1px solid ${theme.palette.grey[900]}`,
      borderLeft: `1px solid ${theme.palette.grey[900]}`,
    },
    modelsComments: {
      width: "30%",
      display: "flex",
      flexFlow: "column",
      height: "100%",
    },
    circularButton: {
      position: "absolute",
      color: theme.palette.grey[50],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    closeButton: {
      width: "25px",
      height: "25px",
      color: theme.palette.grey[900],
      right: theme.spacing(1),
      top: theme.spacing(1),
      "&:hover": {
        cursor: "pointer",
      },
    },
    load: {
      position: "absolute",
      color: theme.palette.secondary.main,
      left: "calc((100% - 30px) / 2)",
      top: "calc((100% - 30px) / 2)",
    },
  };
});

export default function InfoDialog({
  open,
  handleToggleInfoModal,
  endpoint,
  association,
  infoModalType,
  isAdminUser,
  onDeleteAsset,
  setNewImagesObj,
  newImagesObj,
  onSubmit,
  onIssue,
  onApprove,
  onCancel,
  onSubmitForApproval,
  onGenerateReport,
  handleDeleteAsset,
  somethingToUpload,
  newTexturesObj,
  setNewTexturesObj,
  newModelObj,
  setNewModelObj,
  debounceComponent,
}) {
  const classes = useStyles();
  const [fullScreen, setFullScreen] = useState(false);
  const [imageViewDialogResource, setImageViewDialogResource] = useState({});
  const [edit, setEdit] = React.useState(infoModalType === "upload");
  const images = association && association.images.filter(im => !im.deletedAt);
  const product = (association && association.product) || {};
  const [showReport, setShowReport] = useState(false);

  const toggleEditMode = () => {
    setEdit(prevState => !prevState);
    setShowReport(false);
  };

  const toggleReportMode = () => {
    setEdit(false);
    setShowReport(prevState => !prevState);
  };

  const handleImageViewDialog = resource => {
    setImageViewDialogResource(resource);
    // setIsOpenImageViewDialog(prevState => !prevState);
  };

  const faceOptions = {
    0: { face: "Front", faceId: 1 },
    1: { face: "Left", faceId: 2 },
    3: { face: "Top", faceId: 3 },
    4: { face: "Back", faceId: 7 },
    5: { face: "Right", faceId: 8 },
    6: { face: "Bottom", faceId: 9 },
    7: { face: "Front/Left", faceId: 11 },
    8: { face: "Left/Back", faceId: 12 },
    9: { face: "Back/Right", faceId: 13 },
    10: { face: "Right/Front", faceId: 14 },
  };

  const handleNewImages = event => {
    let images = {};
    const faces = Object.values(faceOptions).map(c => c.faceId);
    event.forEach(image => {
      const filenameSplit = image.name.split(".");
      if (filenameSplit.length === 3) {
        const face = parseInt(filenameSplit[1]);
        if (faces.includes(face)) {
          const reader = new FileReader();
          reader.onload = e => {
            images[face] = {
              file: image,
              src: e.target.result,
              status: "new",
            };
            setNewImagesObj({ ...newImagesObj, ...images });
          };
          reader.readAsDataURL(image);
        }
      }
    });
  };

  const handleEditImages = img => {
    let images = {};
    images[img.face] = {
      file: img.file,
      src: img.src,
      status: "edit",
    };
    setNewImagesObj({ ...newImagesObj, ...images });
  };

  const handleDeleteImage = image => {
    if (image.status) {
      delete newImagesObj[image.face];
      setNewImagesObj({ ...newImagesObj });
    }

    if (image.uuid) {
      handleDeleteAsset(image.uuid, "images");
    }
  };

  let oldImagesObj = {};
  (images || []).forEach(image => {
    oldImagesObj[image.face] = {
      ...image,
      uuid: image.uuid,
      src: createImageUrl(image, "real"),
      slimSrc: createImageUrl(image, "medium"),
    };
  });

  const combinedImagesObj = { ...oldImagesObj, ...newImagesObj };

  const newImages = Object.keys(combinedImagesObj).map(face => ({
    ...combinedImagesObj[face],
    uuid: combinedImagesObj[face].uuid,
    face: parseInt(face),
    url: combinedImagesObj[face].src,
    slimUrl: combinedImagesObj[face].slimSrc || combinedImagesObj[face].src,
    status: combinedImagesObj[face].status,
  }));

  if (!association?.models) {
    return (
      <Dialog
        open={open}
        onClose={handleToggleInfoModal}
        classes={{
          paperScrollPaper: classes.paperScrollPaper,
        }}
        fullWidth
      >
        <CircularProgress className={classes.load} size={30} />
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleToggleInfoModal}
      classes={{
        paperScrollPaper: classes.paperScrollPaper,
      }}
      fullWidth
    >
      <div className={classes.modelsContainer}>
        {!fullScreen && (
          <div className={classes.modelsReferenceImages}>
            <ReferenceImages
              newImages={newImages}
              faceOptions={faceOptions}
              product={product}
              parentClasses={classes}
              infoModalType={infoModalType}
              onDeleteImage={handleDeleteImage}
              isAdminUser={isAdminUser || association.imagingIssueAt}
              viewImage={resource => handleImageViewDialog(resource)}
              debounceComponent={debounceComponent}
            />
          </div>
        )}
        <div
          className={classes.modelsStage}
          style={{
            width: !fullScreen ? "50%" : "100%",
          }}
        >
          <StageModel
            selectedImage={newImages.find(
              im => im.face === imageViewDialogResource.faceId,
            )}
            newImages={newImages}
            association={association}
            parentClasses={classes}
            newTexturesObj={newTexturesObj}
            setNewTexturesObj={setNewTexturesObj}
            newModelObj={newModelObj}
            setNewModelObj={setNewModelObj}
            infoModalType={infoModalType}
            onSubmit={onSubmit}
            onIssue={onIssue}
            onApprove={onApprove}
            onCancel={onCancel}
            onSubmitForApproval={onSubmitForApproval}
            onGenerateReport={onGenerateReport}
            onToggleEditMode={toggleEditMode}
            onToggleReportMode={toggleReportMode}
            onEditImage={handleEditImages}
            onAddImage={handleNewImages}
            somethingToUpload={somethingToUpload}
            isFullScreen={fullScreen}
            handleToggleFullScreen={() =>
              setFullScreen(prevState => !prevState)
            }
            isAdminUser={isAdminUser || association.modelingIssueAt}
            viewImage={resource => handleImageViewDialog(resource)}
            edit={edit}
            showReport={showReport}
            showReportComponent={() => {}}
          />
        </div>
      </div>
    </Dialog>
  );
}
