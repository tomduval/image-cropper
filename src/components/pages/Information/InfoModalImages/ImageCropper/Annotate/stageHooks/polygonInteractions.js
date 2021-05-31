import React from "react";
import { useEventListener } from "../utils";

// import { getNewId, transformAbsToRel } from "../utils";

export const usePolygonInteractions = ({ allowKeyboardShortcuts }) => {
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = React.useState(
    false,
  );
  const [isFinished, setIsFinished] = React.useState(false);
  const [points, setPoints] = React.useState([]);
  const [curMousePos, setCurMousePos] = React.useState();
  const [selectedPoint, setSelectedPoint] = React.useState();
  const [isSquare, setIsSquare] = React.useState(false);

  const getPointerLocation = e => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const offset = { x: stage.x(), y: stage.y() };

    var oldScale = stage.scaleX();

    const imageClickX = (pointerPosition.x - offset.x) / oldScale;
    const imageClickY = (pointerPosition.y - offset.y) / oldScale;

    return [imageClickX, imageClickY];
  };

  const handleClick = event => {
    const mousePos = getPointerLocation(event);

    if (isFinished) {
      return;
    }
    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
    } else {
      setPoints([...points, mousePos]);
    }
  };

  const handleMouseMove = event => {
    const mousePos = getPointerLocation(event);
    setCurMousePos(mousePos);
  };
  const handleMouseOverStartPoint = event => {
    if (isFinished || points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(true);
  };
  const handleMouseOutStartPoint = event => {
    event.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(false);
  };
  const calculateXYWH = (index, pos) => {
    let x1y1 = points[0];
    let x1y2 = points[1];
    let x2y2 = points[2];
    let x2y1 = points[3];

    let w, h;
    if (index === 0) {
      x1y1 = pos;
      w = x2y1[0] - x1y1[0];
      h = x1y2[1] - x1y1[1];
    } else if (index === 1) {
      x1y2 = pos;
      x1y1[0] = x1y2[0];
      w = x2y1[0] - x1y1[0];
      h = x1y2[1] - x1y1[1];
    } else if (index === 2) {
      x2y2 = pos;
      w = x2y2[0] - x1y1[0];
      h = x2y2[1] - x1y1[1];
    } else if (index === 3) {
      x2y1 = pos;
      x1y1[1] = x2y1[1];
      w = x2y1[0] - x1y1[0];
      h = x1y2[1] - x1y1[1];
    }

    const [x, y] = [x1y1[0], x1y1[1]];

    return [x, y, w, h];
  };
  const handleDragMovePoint = event => {
    const index = event.target.index - 2;
    const pos = getPointerLocation(event);

    if (isSquare) {
      const [x, y, w, h] = calculateXYWH(index, pos);
      setSquare(x, y, w, h);
    } else {
      setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
      setSelectedPoint(index);
    }
  };
  const handleClickPoint = event => {
    const index = event.target.index - 2;
    setSelectedPoint(index);
  };
  const reset = () => {
    setPoints([]);
    setIsFinished(false);
    setSelectedPoint();
    setIsSquare(false);
  };

  const keyDownHandler = ({ key }) => {
    if (["27", "Escape"].includes(String(key))) {
      reset();
    }
  };

  const setSquare = (x, y, width, height) => {
    setPoints([
      [x, y],
      [x, y + height],
      [x + width, y + height],
      [x + width, y],
    ]);
    setIsFinished(true);
    setIsSquare(true);
  };

  useEventListener(
    "keydown",
    keyDownHandler,
    allowKeyboardShortcuts ? window : null,
  );

  return {
    isSquare: isSquare,
    isFinished: isFinished,
    curMousePos: curMousePos,
    points: points,
    selectedPoint: selectedPoint,
    onSetSquare: setSquare,
    onReset: reset,
    onClick: handleClick,
    onMouseMove: handleMouseMove,
    onMouseOverStartPoint: handleMouseOverStartPoint,
    onMouseOutStartPoint: handleMouseOutStartPoint,
    onClickPoint: handleClickPoint,
    onDragMovePoint: handleDragMovePoint,
  };
};
