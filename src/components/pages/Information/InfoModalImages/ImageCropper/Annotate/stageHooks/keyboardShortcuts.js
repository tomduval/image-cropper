import { useEventListener, getNewId } from "../utils";

export const useStageKeyboardShortcuts = ({
  selectShape,
  rectangles,
  selectRect,
  lastSelectedRect,
  selectedId,
  setRectangles,
  onSaveImage,
  allowKeyboardShortcuts,
  canvasDimensions,
}) => {
  const keyDownHandler = ({ key, shiftKey, ctrlKey, metaKey, altKey }) => {
    if (["27", "Escape"].includes(String(key))) {
      selectShape(null);
    }

    if (["Backspace", "Delete"].includes(String(key))) {
      const filteredRects = rectangles.filter(rect => rect.id !== selectedId);
      if (JSON.stringify(filteredRects) !== JSON.stringify(rectangles)) {
        setRectangles(rectangles.filter(rect => rect.id !== selectedId));
        let rectIndex = rectangles.findIndex(rect => rect.id === selectedId);
        if (rectIndex === 0) {
          rectIndex = rectangles.length;
        }
        if (rectangles.length === 1) {
          selectShape();
          selectRect();
        } else {
          selectShape(rectangles[rectIndex - 1].id);
          selectRect(rectangles[rectIndex - 1]);
        }
      }
    }

    if (["d", "D"].includes(String(key))) {
      if (lastSelectedRect) {
        let duplicateRect = Object.assign({}, lastSelectedRect);
        const newId = getNewId({ rectangles });
        duplicateRect.id = newId;
        duplicateRect.productUuid = null;
        duplicateRect.boundingBoxes = null;
        duplicateRect.product = null;

        if (rectangles.find(rect => rect.id === lastSelectedRect.id)) {
          duplicateRect.x = lastSelectedRect.x + 5 / canvasDimensions.width;
          duplicateRect.y = lastSelectedRect.y + 5 / canvasDimensions.height;
        } else {
          duplicateRect.x = lastSelectedRect.x;
          duplicateRect.y = lastSelectedRect.y;
        }

        const newRectangles = [...rectangles, duplicateRect];
        setRectangles(newRectangles);
        selectShape(newId);
        selectRect(newRectangles.find(r => r.id === newId));
      }
    }

    if (["s", "S"].includes(String(key))) {
      onSaveImage();
    }

    if (["ArrowUp"].includes(String(key)) && shiftKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, y: r.y - 1 / canvasDimensions.height }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, y: r.y - 1 / canvasDimensions.height }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowDown"].includes(String(key)) && shiftKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, y: r.y + 1 / canvasDimensions.height }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, y: r.y + 1 / canvasDimensions.height }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowRight"].includes(String(key)) && shiftKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, x: r.x + 1 / canvasDimensions.width }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, x: r.x + 1 / canvasDimensions.width }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowLeft"].includes(String(key)) && shiftKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, x: r.x - 1 / canvasDimensions.width }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, x: r.x - 1 / canvasDimensions.width }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    let metaAltKey = altKey || metaKey;

    if (["ArrowUp"].includes(String(key)) && metaAltKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, height: r.height - 1 / canvasDimensions.height }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, height: r.height - 1 / canvasDimensions.height }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowDown"].includes(String(key)) && metaAltKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, height: r.height + 1 / canvasDimensions.height }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, height: r.height + 1 / canvasDimensions.height }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowRight"].includes(String(key)) && metaAltKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, width: r.width + 1 / canvasDimensions.width }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, width: r.width + 1 / canvasDimensions.width }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }

    if (["ArrowLeft"].includes(String(key)) && metaAltKey) {
      if (selectedId !== null) {
        setRectangles([
          ...rectangles.map(r =>
            r.id === selectedId
              ? { ...r, width: r.width - 1 / canvasDimensions.width }
              : r,
          ),
        ]);
        selectRect({
          ...rectangles
            .map(r =>
              r.id === selectedId
                ? { ...r, width: r.width - 1 / canvasDimensions.width }
                : r,
            )
            .find(r => r.id === selectedId),
        });
      }
    }
  };

  useEventListener(
    "keydown",
    keyDownHandler,
    allowKeyboardShortcuts ? window : null,
  );
};
