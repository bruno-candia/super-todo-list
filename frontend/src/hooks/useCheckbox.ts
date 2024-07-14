import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/todo-list-store";
import { completeTodo } from "../store/todo-list-store/todo-slice";

function useCheckbox() {
  const [isChecked, setIsChecked] = useState(false);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  function handleCheckboxChange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { id } = e.target as HTMLButtonElement;
    const item = todos.find((item) => item.id === id);
    if (item) {
      dispatch(completeTodo(item.id));
    }
  }

  return { isChecked, setIsChecked, handleCheckboxChange };
}

export default useCheckbox;
