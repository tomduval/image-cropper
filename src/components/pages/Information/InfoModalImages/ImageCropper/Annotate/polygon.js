import React from "react";

import { Line, Rect } from "react-konva";

const Polygon = ({
  curMousePos,
  points,
  isFinished,
  selectedPoint,
  isSquare = false,
  onPointClick = () => {},
  onDragStartPoint = () => {},
  onDragMovePoint = () => {},
  // onDragEndPoint = () => {},
  onMouseOverStartPoint = () => {},
  onMouseOutStartPoint = () => {},
}) => {
  if (points.length === 0) return <></>;

  const flattenedPoints = points
    .concat(isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

  const findPoint = (points, i1, i2, distance) => {
    return [
      distance * points[i1][0] + (1 - distance) * points[i2][0],
      distance * points[i1][1] + (1 - distance) * points[i2][1],
    ];
  };

  const makeGrid = (points, i1, i2, i3, i4) => {
    let grid = [];
    for (var i = 1; i < 10; i++) {
      let distance = i / 10;
      grid.push([
        ...findPoint(points, i1, i2, distance),
        ...findPoint(points, i3, i4, 1 - distance),
      ]);
    }
    return grid;
  };

  let crossLines;
  if (points.length === 4 && isFinished) {
    crossLines = [
      ...makeGrid(points, 0, 1, 2, 3),
      ...makeGrid(points, 1, 2, 3, 0),
    ];
  }

  return (
    <>
      <Line
        points={flattenedPoints}
        stroke="black"
        strokeWidth={0.5}
        closed={isFinished}
      />
      {points.map((point, index) => {
        const width = isSquare ? 12 : 3;
        const x = point[0] - width / 2;
        const y = point[1] - width / 2;
        const startPointAttr =
          index === 0
            ? {
                hitStrokeWidth: 12,
                onMouseOver: onMouseOverStartPoint,
                onMouseOut: onMouseOutStartPoint,
              }
            : null;
        return (
          <Rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={width}
            fill="white"
            stroke={selectedPoint === index ? "red" : "black"}
            strokeWidth={isSquare ? 6 : 1}
            onClick={onPointClick}
            onDragStart={onDragStartPoint}
            onDragMove={onDragMovePoint}
            // onDragEnd={onDragEndPoint}
            draggable
            {...startPointAttr}
          />
        );
      })}
      {crossLines &&
        crossLines.map((l, index) => {
          return (
            <Line
              key={index}
              points={l}
              stroke="blue"
              strokeWidth={0.5}
              closed={false}
            />
          );
        })}
    </>
  );
};

export default Polygon;
