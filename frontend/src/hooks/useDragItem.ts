import { animate, useDragControls, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { removeTodo } from "../store/todo-list-store/todo-slice";
import { useDispatch } from "react-redux";

const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";
const inactiveBackground = "#20202000";
const inactiveOpacity = 1;
const inactiveFill = "#20202000";
const inactiveZIndex = "0";

function useDragItem() {
  const verticalPosition = useMotionValue(0);
  const horizontalPosition = useMotionValue(0);
  const boxShadow = useMotionValue(inactiveShadow);
  const backgroundColor = useMotionValue(inactiveBackground);
  const opacity = useMotionValue(inactiveOpacity);
  const fill = useMotionValue(inactiveFill);
  const zIndex = useMotionValue(inactiveZIndex);
  const controls = useDragControls();
  const iRef = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();

  const handleRemoveTodo = (id: string) => {
    setTimeout(() => {
      dispatch(removeTodo(id));
    }, 300);
  };

  useEffect(() => {
    const touchHandler: React.TouchEventHandler<HTMLElement> = (e) =>
      e.preventDefault();

    const iTag = iRef.current;

    if (iTag) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      iTag.addEventListener("touchstart", touchHandler, { passive: false });

      return () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        iTag.removeEventListener("touchstart", touchHandler, {
          passive: false,
        });
      };
    }
  }, [iRef]);

  useEffect(() => {
    let isActive = false;
    verticalPosition.on("change", (latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)");
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [verticalPosition, boxShadow]);

  useEffect(() => {
    horizontalPosition.on("change", (latest) => {
      if (latest >= 5) {
        animate(backgroundColor, "#CB4946", { duration: 0 });
        animate(fill, "#F2F2F2A3", { duration: 0 });
      } else if (latest <= -5) {
        animate(backgroundColor, "#666666", { duration: 0 });
        animate(fill, "#F2F2F2A3", { duration: 0 });
      } else {
        animate(fill, inactiveFill, { duration: 0 });
        animate(backgroundColor, inactiveBackground, { duration: 0 });
      }
    });
  }, [horizontalPosition, backgroundColor, opacity, fill]);

  return {
    horizontalPosition,
    verticalPosition,
    boxShadow,
    backgroundColor,
    opacity,
    fill,
    zIndex,
    controls,
    iRef,
    handleRemoveTodo,
  };
}

export default useDragItem;
