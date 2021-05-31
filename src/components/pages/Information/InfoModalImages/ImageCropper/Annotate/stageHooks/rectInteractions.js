import React from "react";

import { getNewId, transformAbsToRel } from "../utils";

const DEFAULT_REACT_WIDTH = 100;
const DEFAULT_REACT_HEIGHT = 100;

export const useRectInteractions = ({
  selectShape,
  rectangles,
  annotationType,
  canvasDimensions,
  setRectangles,
  selectRect,
}) => {
  const [isAddingBoxDrag, setIsAddingBoxDrag] = React.useState(false);

  const getPointerLocation = e => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = { x: stage.x(), y: stage.y() };

    const imageClickX = pointerPosition.x - offset.x;
    const imageClickY = pointerPosition.y - offset.y;

    return { x: imageClickX, y: imageClickY };
  };

  const removeSelection = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.name === "Url Image";

    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const addBoundingBox = e => {
    if (!rectangles) {
      return;
    }
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.name === "Url Image";

    let newId = getNewId({ rectangles });

    if (clickedOnEmpty) {
      const pointerLocation = getPointerLocation(e);
      const newRectangles = [
        ...rectangles,
        transformAbsToRel(
          createRectangle({
            id: newId,
            annotationType: annotationType,
            x: pointerLocation.x,
            y: pointerLocation.y,
          }),
          canvasDimensions,
        ),
      ];
      setRectangles(newRectangles);
      selectShape(newId);
      selectRect(newRectangles.find(r => r.id === newId));
    }
  };

  const addBoxDrag = e => {
    if (!rectangles) {
      return;
    }

    const clickedOnEmpty =
      e.target === e.target.getStage() || e.target.attrs.name === "Url Image";

    let newId = getNewId({ rectangles });

    if (clickedOnEmpty) {
      const pointerLocation = getPointerLocation(e);
      const newRectangles = [
        ...rectangles,
        createRectangleDrag({
          id: newId,
          x: pointerLocation.x,
          y: pointerLocation.y,
          annotationType: annotationType,
          absolute: true,
        }),
      ];
      setRectangles(newRectangles);
      setIsAddingBoxDrag(true);
      selectShape(newId);
    }
  };

  const changeAddBoxDrag = e => {
    if (isAddingBoxDrag) {
      const pointerLocation = getPointerLocation(e);
      const rect = rectangles[rectangles.length - 1];
      rectangles.pop();
      const newRectangles = [
        ...rectangles,
        changeCreateRectangleDrag({
          id: rect.id,
          rect: rect,
          x: pointerLocation.x,
          y: pointerLocation.y,
          annotationType: annotationType,
          absolute: true,
        }),
      ];
      setRectangles(newRectangles);
      selectShape(rect.id);
    }
  };

  const finishAddBoxDrag = e => {
    if (isAddingBoxDrag) {
      const rect = rectangles[rectangles.length - 1];
      if (rect.width < 20 && rect.height < 20) {
        rectangles.pop();
        setRectangles([...rectangles]);
        selectShape();
      } else {
        rectangles.pop();
        let rectTrans = transformAbsToRel(
          { ...rect, absolute: false },
          canvasDimensions,
        );
        setRectangles([...rectangles, rectTrans]);
        selectShape(rectTrans.id);
        selectRect(rectTrans);
      }
      setIsAddingBoxDrag(false);
    }
  };

  return {
    onClick: removeSelection,
    onDblClick: addBoundingBox,
    onMouseDown: addBoxDrag,
    onMouseMove: changeAddBoxDrag,
    onMouseUp: finishAddBoxDrag,
  };
};

const createRectangle = ({ x, y, id, annotationType }) => {
  return {
    x: x - DEFAULT_REACT_WIDTH / 2,
    y: y - DEFAULT_REACT_HEIGHT / 2,
    width: DEFAULT_REACT_WIDTH,
    height: DEFAULT_REACT_HEIGHT,
    annotationType: annotationType,
    id: id,
  };
};

const createRectangleDrag = ({ id, x, y, annotationType, absolute }) => {
  return {
    x: x,
    y: y,
    width: 0,
    height: 0,
    id: id,
    annotationType: annotationType,
    absolute: absolute,
  };
};

const changeCreateRectangleDrag = ({
  id,
  rect,
  x,
  y,
  annotationType,
  absolute,
}) => {
  let width = x - rect.x;
  let height = y - rect.y;
  if (x <= rect.x) {
    width = rect.width;
  }
  if (y <= rect.y) {
    height = rect.height;
  }
  return {
    x: rect.x,
    y: rect.y,
    width: width,
    height: height,
    id: id,
    annotationType: annotationType,
    absolute: absolute,
  };
};
