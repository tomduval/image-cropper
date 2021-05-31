import { useEffect, useRef } from "react";

// Hook
export function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => {
        // event.preventDefault();
        savedHandler.current(event);
      };

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
}

export const orientationsToFaceRotation = (orientation, face = 1) => {
  if (!orientation) {
    return [face, 0];
  }
  switch (orientation) {
    case 0:
      return [1, 0];
    case 1:
      return [1, 90];
    case 12:
      return [1, 180];
    case 13:
      return [1, 270];
    case 2:
      return [2, 0];
    case 3:
      return [2, 90];
    case 14:
      return [2, 180];
    case 15:
      return [2, 270];
    case 4:
      return [3, 0];
    case 5:
      return [3, 90];
    case 16:
      return [3, 180];
    case 17:
      return [3, 270];
    case 6:
      return [7, 0];
    case 7:
      return [7, 90];
    case 18:
      return [7, 180];
    case 19:
      return [7, 270];
    case 8:
      return [8, 0];
    case 9:
      return [8, 90];
    case 20:
      return [8, 180];
    case 21:
      return [8, 270];
    case 10:
      return [9, 0];
    case 11:
      return [9, 90];
    case 22:
      return [9, 180];
    case 23:
      return [9, 270];
    default:
      return [0, 0];
  }
};

export const faceRotationToOrientation = faceRotation => {
  const faceRotation2 = JSON.stringify(faceRotation);
  switch (faceRotation2) {
    case JSON.stringify([1, 0]):
      return 0;
    case JSON.stringify([1, 90]):
      return 1;
    case JSON.stringify([1, 180]):
      return 12;
    case JSON.stringify([1, 270]):
      return 13;
    case JSON.stringify([2, 0]):
      return 2;
    case JSON.stringify([2, 90]):
      return 3;
    case JSON.stringify([2, 180]):
      return 14;
    case JSON.stringify([2, 270]):
      return 15;
    case JSON.stringify([3, 0]):
      return 4;
    case JSON.stringify([3, 90]):
      return 5;
    case JSON.stringify([3, 180]):
      return 16;
    case JSON.stringify([3, 270]):
      return 17;
    case JSON.stringify([7, 0]):
      return 6;
    case JSON.stringify([7, 90]):
      return 7;
    case JSON.stringify([7, 180]):
      return 18;
    case JSON.stringify([7, 270]):
      return 19;
    case JSON.stringify([8, 0]):
      return 8;
    case JSON.stringify([8, 90]):
      return 9;
    case JSON.stringify([8, 180]):
      return 20;
    case JSON.stringify([8, 270]):
      return 21;
    case JSON.stringify([9, 0]):
      return 10;
    case JSON.stringify([9, 90]):
      return 11;
    case JSON.stringify([9, 180]):
      return 22;
    case JSON.stringify([9, 270]):
      return 23;
    default:
      return 0;
  }
};

export const getNewId = ({ rectangles }) => {
  return window.uuidv4();
};

export const transformRelToAbs = (rect, dimensions) => {
  const rect2 = { ...rect };
  rect2.width = rect2.width * dimensions.width;
  rect2.height = rect2.height * dimensions.height;
  rect2.x = rect2.x * dimensions.width;
  rect2.y = rect2.y * dimensions.height;
  return rect2;
};

export const transformAbsToRel = (rect, dimensions) => {
  const rect2 = { ...rect };
  rect2.width = rect2.width / dimensions.width;
  rect2.height = rect2.height / dimensions.height;
  rect2.x = rect2.x / dimensions.width;
  rect2.y = rect2.y / dimensions.height;
  return rect2;
};
