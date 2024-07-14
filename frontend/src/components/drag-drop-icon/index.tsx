import { DragControls } from "framer-motion";
import { useState, forwardRef } from "react";

interface DragDropVerticalIconProps {
  dragControls: DragControls;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DragDropVerticalIcon = forwardRef<any, DragDropVerticalIconProps>(
  ({ dragControls }, ref) => {
    const [isGrab, setIsGrab] = useState(false);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill={"none"}
        onMouseDown={() => setIsGrab(true)}
        onMouseUp={() => setIsGrab(false)}
        onMouseLeave={() => setIsGrab(false)}
        style={{
          cursor: isGrab ? "grabbing" : "grab",
          userSelect: "none",
        }}
        ref={ref}
        onPointerDown={(event) => dragControls.start(event)}
      >
        <path
          d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

export default DragDropVerticalIcon;
