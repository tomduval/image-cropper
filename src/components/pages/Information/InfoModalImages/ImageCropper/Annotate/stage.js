import React from "react";
import { Stage, Layer } from "react-konva";
import { BoundingBox } from "./boundingBox";
import { URLImage } from "./image.js";
import { useTheme } from "@material-ui/core/styles";
import { useResizeDetector } from "react-resize-detector";
import { useStageKeyboardShortcuts } from "./stageHooks/keyboardShortcuts";
import { useRectInteractions } from "./stageHooks/rectInteractions";
import { usePolygonInteractions } from "./stageHooks/polygonInteractions";
import { transformAbsToRel, transformRelToAbs } from "./utils";
import Polygon from "./polygon";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import IconButton from "@material-ui/core/IconButton";

const AnnotationStage = ({
  imageUrl,
  rectangles = [],
  annotationType = "Object",
  setRectangles = () => {},
  onSaveImage = () => {},
  onEditImage = () => {},
  rectId: selectedId = null,
  onClickRectId: selectShape = () => {},
  allowKeyboardShortcuts = true,
  isCropping = false,
  selectedImage = null,
  face = 0,
}) => {
  const theme = useTheme();
  const [lastSelectedRect, selectRect] = React.useState(null);
  const { width, height, ref } = useResizeDetector();
  const [canvasDimensions, setCanvasDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const [rotation, setRotation] = React.useState();
  const [crop, setCrop] = React.useState();
  const [cropRotation, setCropRotation] = React.useState();
  const [rotationBy90, setRotationBy90] = React.useState(0);
  const stageRef = React.useRef();
  const [img, setImg] = React.useState();
  const [initialImage, setInitialImage] = React.useState();

  useStageKeyboardShortcuts({
    selectShape,
    rectangles,
    selectRect,
    lastSelectedRect,
    selectedId,
    setRectangles,
    onSaveImage,
    allowKeyboardShortcuts,
    canvasDimensions,
  });

  const rectIterations = useRectInteractions({
    selectShape,
    rectangles,
    annotationType,
    canvasDimensions,
    setRectangles,
    selectRect,
  });

  const polygonIterations = usePolygonInteractions({
    allowKeyboardShortcuts,
  });

  let interactions;
  if (isCropping) {
    interactions = polygonIterations;
  } else {
    interactions = rectIterations;
  }

  const handleSave = () => {
    let canvas1 = document.createElement("canvas");
    let context = canvas1.getContext("2d");
    canvas1.width = img.width;
    canvas1.height = img.height;
    context.drawImage(img, 0, 0);
    const url = canvas1.toDataURL("image/jpeg", 0.75);

    // var link = document.createElement("a");
    // link.download = "filename.jpg";
    // link.href = url;
    // link.click();

    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        var file = new File([blob], selectedImage.filename, {
          type: "image/jpeg",
        });
        onEditImage({ src: url, face, file: file });
      });

    setInitialImage(img);
  };

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", flex: "0 1 auto" }}>
      {width && (
        <Stage
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: canvasDimensions.width,
          }}
          ref={stageRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          onClick={!rotation && interactions.onClick}
          onDblClick={!rotation && interactions.onDblClick}
          onMouseDown={!rotation && interactions.onMouseDown}
          onMouseMove={!rotation && interactions.onMouseMove}
          onMouseUp={!rotation && interactions.onMouseUp}
          draggable={isCropping}
          onWheel={e => {
            if (!isCropping) return;

            e.evt.preventDefault();
            var stage = e.target.getStage();
            var oldScale = stage.scaleX();

            var scaleBy = 0.95;

            var pointer = stage.getPointerPosition();

            var mousePointTo = {
              x: (pointer.x - stage.x()) / oldScale,
              y: (pointer.y - stage.y()) / oldScale,
            };

            var newScale =
              e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            stage.scale({ x: newScale, y: newScale });

            var newPos = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };
            stage.position(newPos);
            stage.batchDraw();
          }}
        >
          <Layer>
            <URLImage
              src={
                imageUrl ??
                "https://static.thenounproject.com/png/1174579-200.png"
              }
              maxWidth={width}
              maxHeight={height}
              onChange={d => {
                setCanvasDimensions(d.canvas);
                selectShape(null);
              }}
              onImageChange={img => setImg(img)}
              onSetInitialImage={img => setInitialImage(img)}
              rotation={cropRotation}
              tmpRotation={rotation}
              rotationBy90={rotationBy90}
              crop={crop}
            />
            {isCropping ? (
              <Polygon
                isSquare={polygonIterations.isSquare}
                curMousePos={polygonIterations.curMousePos}
                points={polygonIterations.points}
                isFinished={rotation || polygonIterations.isFinished}
                selectedPoint={polygonIterations.selectedPoint}
                onPointClick={!rotation && polygonIterations.onClickPoint}
                onDragStartPoint={
                  !rotation && polygonIterations.onDragStartPoint
                }
                onDragMovePoint={polygonIterations.onDragMovePoint}
                // onDragEndPoint={polygonIterations.onDragEndPoint}
                onMouseOverStartPoint={
                  !rotation && polygonIterations.onMouseOverStartPoint
                }
                onMouseOutStartPoint={
                  !rotation && polygonIterations.onMouseOutStartPoint
                }
              />
            ) : (
              rectangles &&
              rectangles
                .filter(rect => rect.width)
                .map((rect, i) => {
                  return (
                    <React.Fragment key={i}>
                      <BoundingBox
                        key={i}
                        shapeProps={
                          rect.absolute
                            ? rect
                            : transformRelToAbs(rect, canvasDimensions)
                        }
                        color={
                          rect.annotationType === "sel"
                            ? "blue"
                            : rect.productUuid
                            ? theme.palette.secondary.main
                            : theme.palette.error.main
                        }
                        isSelected={rect.id === selectedId}
                        onSelect={() => {
                          selectShape(rect.id);
                          selectRect(rectangles.find(r => r.id === rect.id));
                        }}
                        onChange={newAttrs => {
                          const rects = rectangles.slice();
                          rects[i] = newAttrs.absolute
                            ? newAttrs
                            : transformAbsToRel(newAttrs, canvasDimensions);
                          setRectangles(rects);
                          selectRect(rects.find(r => r.id === rect.id));
                        }}
                      />
                    </React.Fragment>
                  );
                })
            )}
          </Layer>
        </Stage>
      )}
      {isCropping && (
        <>
          <TextField
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              width: 90,
              height: "35px",
            }}
            type="number"
            id="outlined-basic"
            label="Rotation"
            variant="outlined"
            value={rotation ?? ""}
            InputLabelProps={{
              style: { height: "35px" },
            }}
            InputProps={{
              inputProps: {
                min: -10,
                max: 10,
                style: {
                  height: "35px",
                  padding: "0 2px 0px 10px",
                },
              },
            }}
            focused={true}
            onChange={e => {
              if (e.target.value <= 10 && e.target.value >= -10) {
                setRotation(Number(e.target.value));
                polygonIterations.onSetSquare(
                  0,
                  0,
                  canvasDimensions.width,
                  canvasDimensions.height,
                );
              }
            }}
          />
          <IconButton
            aria-label="rotate90"
            style={{
              position: "absolute",
              bottom: 10,
              left: 110,
              padding: "7px",
            }}
            onClick={() => setRotationBy90(state => state + 1)}
          >
            <RotateRightIcon />
          </IconButton>
          <Button
            style={{ position: "absolute", bottom: 10, right: 10 }}
            variant="contained"
            disabled={img === initialImage}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            style={{ position: "absolute", bottom: 10, right: 100 }}
            variant="contained"
            onClick={() => {
              setCrop(polygonIterations.points);
              setCropRotation(rotation);
              setRotation();
              polygonIterations.onReset();
              stageRef?.current && stageRef.current.scale({ x: 1, y: 1 });
              stageRef?.current && stageRef.current.position({ x: 0, y: 0 });
            }}
          >
            Apply
          </Button>
          <Button
            style={{ position: "absolute", bottom: 10, right: 200 }}
            variant="contained"
            onClick={() => {
              setCrop();
              setRotation();
              setCropRotation();
              polygonIterations.onReset();
              stageRef?.current && stageRef.current.scale({ x: 1, y: 1 });
              stageRef?.current && stageRef.current.position({ x: 0, y: 0 });
            }}
          >
            Reset
          </Button>
        </>
      )}
    </div>
  );
};

export default AnnotationStage;
