import { animate, motion, Reorder } from "framer-motion";
import DragDropVerticalIcon from "../drag-drop-icon";
import Checkbox from "../checkbox";
import useDragItem from "../../hooks/useDragItem";
import { Todo } from "../../types/todo-list-itens";
import "./drag-drop-item.css";

interface DraggableItemProps {
  todo: Todo;
  setOpenModal: (
    value: {
      id?: string;
      value?: string;
    } | null
  ) => void;
}

function DraggableItem({ todo, setOpenModal }: DraggableItemProps) {
  const {
    verticalPosition,
    horizontalPosition,
    controls,
    boxShadow,
    backgroundColor,
    fill,
    zIndex,
    iRef,
    handleRemoveTodo,
    opacity,
  } = useDragItem();

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        height: "48px",
        opacity,
        borderRadius: "16px",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        justifyContent: "space-between",
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        style={{
          fill,
        }}
        viewBox="0 0 256 256"
      >
        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
      </motion.svg>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        style={{
          justifySelf: "flex-end",
          fill,
        }}
        viewBox="0 0 256 256"
      >
        <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
      </motion.svg>
      <motion.div
        drag="x"
        id={todo.id}
        style={{
          x: horizontalPosition,
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          height: "100%",
          zIndex,
        }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ left: 0.3, right: 0.3 }}
        whileTap={{ cursor: "grabbing" }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragStart={() => {
          zIndex.set("2");
        }}
        onDragEnd={() => {
          zIndex.set("1");
          horizontalPosition.on("change", (latest) => {
            if (latest > 35) {
              handleRemoveTodo(todo.id);
              animate(opacity, 0, { duration: 0 });
            }
            if (latest < -35) {
              setOpenModal({
                id: todo.id,
                value: todo.title,
              });
            }
          });
        }}
      >
        <Reorder.Item
          value={todo}
          id={todo.id}
          style={{
            boxShadow,
            y: verticalPosition,
          }}
          aria-disabled={todo.completed}
          dragListener={false}
          dragControls={controls}
          className="item"
        >
          <div className="item--left">
            <Checkbox todo={todo} />
            <p>{todo.title}</p>
          </div>
          <div className="item--right">
            <DragDropVerticalIcon ref={iRef} dragControls={controls} />
          </div>
        </Reorder.Item>
      </motion.div>
    </motion.div>
  );
}

export default DraggableItem;
