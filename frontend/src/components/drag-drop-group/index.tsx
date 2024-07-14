import { Reorder } from "framer-motion";
import DraggableItem from "../drag-drop-item";
import { reorderTodos } from "../../store/todo-list-store/todo-slice";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../../types/todo-list-itens";
import { RootState } from "../../store/todo-list-store";
import "./drag-drop-group.css";

function DraggableGroup({
  setOpenModal,
}: {
  setOpenModal: (
    value: {
      id?: string;
      value?: string;
    } | null
  ) => void;
}) {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleReorder = (newOrder: Todo[]) => {
    dispatch(reorderTodos([...newOrder]));
  };

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      className="todo-list"
      onReorder={handleReorder}
    >
      {todos.map((todo) => (
        <DraggableItem key={todo.id} todo={todo} setOpenModal={setOpenModal} />
      ))}
    </Reorder.Group>
  );
}
export default DraggableGroup;
