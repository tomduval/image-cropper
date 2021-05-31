import React from "react";
import AnnotationStage from "components/pages/Information/InfoModalImages/ImageCropper/Annotate/stage";

const ImageCropper = ({ selectedImage, onEditImage }) => {
  if (!selectedImage) return <></>;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AnnotationStage
        imageUrl={
          selectedImage.url ||
          `${selectedImage.baseUrl}/${selectedImage.folder}/${selectedImage.uuid}.${selectedImage.extension}`
        }
        isCropping={true}
        onEditImage={onEditImage}
        face={selectedImage.face}
        selectedImage={selectedImage}
      />
    </div>
  );
};

export default ImageCropper;
