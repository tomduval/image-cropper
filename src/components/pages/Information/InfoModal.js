import React from "react";
import { useDispatch } from "react-redux";
import InfoModalImages from "./InfoModalImages/InfoModalImages";

export default function InfoDialog({
  open,
  handleToggleInfoModal = () => {},
  jobActions = {},
  endpoint = null,
  job: association = null,
  infoModalType: initialInfoModalType = null,
  isAdminUser = true,
  debounceComponent = () => {},
}) {
  const dispatch = useDispatch();
  const [newImagesObj, setNewImagesObj] = React.useState({});
  const [newTexturesObj, setNewTexturesObj] = React.useState({});
  const [newModelObj, setNewModelObj] = React.useState(null);

  const associationUuid = association?.uuid;

  const infoModalType =
    Object.keys(newImagesObj).length > 0 ||
    Object.keys(newTexturesObj).length > 0 ||
    newModelObj
      ? "upload"
      : initialInfoModalType;

  const approve = () => {
    dispatch(
      jobActions.approveAsset(
        association.uuid,
        endpoint,
        () => {},
        () => {},
      ),
    );
    handleToggleInfoModal();
  };

  const cancel = () => {
    handleToggleInfoModal();
  };

  const submitAndGenerateReport = () => {
    dispatch(
      jobActions.show(association.uuid, data => {
        const primaryModel = data?.models
          .filter(m => !m.deletedAt)
          .filter(m => m.extension === "fbx");

        if (primaryModel) {
          let currentModel = primaryModel.length > 0 ? primaryModel[0] : null;
          dispatch(jobActions.generateReport(currentModel.uuid));
        }
      }),
    );
  };

  const submit = () => {
    if (endpoint === "images") {
      let uploadingImagesObj = { ...newImagesObj };
      Object.keys(newImagesObj).forEach(face => {
        const formData = new FormData();
        formData.append("files_in", newImagesObj[face].file);
        uploadingImagesObj[face] = {
          ...uploadingImagesObj[face],
          status: "uploading",
        };
        setNewImagesObj({ ...uploadingImagesObj });

        dispatch(
          jobActions.uploadAsset(
            associationUuid,
            "images",
            formData,
            () => {
              delete uploadingImagesObj[face];
              setNewImagesObj({ ...uploadingImagesObj });
            },
            error => {
              uploadingImagesObj[face] = {
                ...uploadingImagesObj[face],
                status: "new",
              };
              setNewImagesObj({ ...uploadingImagesObj });
            },
          ),
        );
      });
    } else if (endpoint === "models") {
      const uploadTextures = () => {
        let uploadingTexturesObj = { ...newTexturesObj };

        if (Object.keys(newTexturesObj).length === 0) {
          submitAndGenerateReport();
        }

        let i = 0;
        Object.keys(newTexturesObj).forEach(channel => {
          const formData = new FormData();
          formData.append("files_in", newTexturesObj[channel].file);
          uploadingTexturesObj[channel] = {
            ...uploadingTexturesObj[channel],
            status: "uploading",
          };
          setNewTexturesObj({ ...uploadingTexturesObj });

          dispatch(
            jobActions.uploadAsset(
              associationUuid,
              "textures",
              formData,
              () => {
                delete uploadingTexturesObj[channel];
                setNewTexturesObj({ ...uploadingTexturesObj });

                i += 1;
                if (i === Object.keys(newTexturesObj).length) {
                  submitAndGenerateReport();
                }
              },
              error => {
                uploadingTexturesObj[channel] = {
                  ...uploadingTexturesObj[channel],
                  status: "new",
                };
                setNewTexturesObj({ ...uploadingTexturesObj });
              },
            ),
          );
        });
      };

      if (newModelObj) {
        const formData = new FormData();
        formData.append("files_in", newModelObj.file);
        dispatch(
          jobActions.uploadAsset(
            associationUuid,
            "models",
            formData,
            () => {
              setNewModelObj(null);
              uploadTextures();
            },
            error => {
              setNewModelObj({ ...newModelObj, status: "new" });
            },
          ),
        );
      } else {
        uploadTextures();
      }
    }
  };

  const issue = () => {
    handleToggleInfoModal();

    dispatch(
      jobActions.issueAsset(
        associationUuid,
        endpoint,
        () => {},
        error => {},
      ),
    );
  };

  const submitForApproval = () => {
    handleToggleInfoModal();

    dispatch(
      jobActions.submitAsset(
        associationUuid,
        endpoint,
        () => {},
        error => {},
      ),
    );
  };

  const handleDeleteAsset = (assetUuid, assetType) => {
    dispatch(
      jobActions.removeAsset(
        associationUuid,
        assetUuid,
        assetType,
        () => {},
        () => {},
      ),
    );
  };

  let somethingToUpload =
    Object.keys(newImagesObj).length > 0 ||
    newModelObj ||
    Object.keys(newTexturesObj).length > 0;

  return endpoint === "images" ? (
    <InfoModalImages
      open={open}
      handleToggleInfoModal={handleToggleInfoModal}
      onIssue={issue}
      onCancel={cancel}
      onSubmit={submit}
      onSubmitForApproval={submitForApproval}
      onApprove={approve}
      association={association}
      newImagesObj={newImagesObj}
      setNewImagesObj={setNewImagesObj}
      infoModalType={infoModalType}
      handleDeleteAsset={handleDeleteAsset}
      isAdminUser={isAdminUser || association.imagingIssueAt}
      somethingToUpload={somethingToUpload}
    />
  ) : endpoint === "models" ? (
    <></>
  ) : (
    <></>
  );
}
