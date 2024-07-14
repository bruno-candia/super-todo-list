import DragDropGroup from "../drag-drop-group";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/todo-list-store";
import { motion } from "framer-motion";
import { useState } from "react";
import { addTodo, updateTodo } from "../../store/todo-list-store/todo-slice";
import "./todo-list.css";

function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const completedTodos = todos.filter((todo) => todo.completed);
  const dispatch = useDispatch();
  const [isOpenModal, setOpenModal] = useState<{
    id?: string;
    value?: string;
  } | null>(null);

  return (
    <div className="todo-list-container">
      <div className="todo-list-info">
        <p>
          <span>
            {completedTodos.length}/{todos.length}
          </span>
          • Tasks
        </p>
      </div>

      <div
        className="todo-list-content"
        style={{
          position: "relative",
        }}
      >
        <DragDropGroup setOpenModal={setOpenModal} />

        <div className="todo-list-actions">
          <motion.div
            layout
            data-isopen={isOpenModal !== null}
            initial={{ borderRadius: 16 }}
            style={{
              position: "absolute",
              zIndex: 1,
              background: "#666666",
              bottom: 0,
              left: 0,
            }}
            className="parent"
          >
            <div data-isopen={isOpenModal !== null} className="form-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  color: "black",
                  padding: "4px",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    background: "transparent",
                    border: "none",
                    marginBottom: "8px"
                  }}
                  onClick={() => setOpenModal(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </button>
              </div>

              <form
                action=""
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  setOpenModal(null);

                  if (isOpenModal && isOpenModal.id) {
                    dispatch(
                      updateTodo({
                        id: isOpenModal.id,
                        title: isOpenModal.value || "",
                        tag: "Personal",
                        completed: false,
                      })
                    );
                  } else if (isOpenModal && !isOpenModal.id) {
                    dispatch(
                      addTodo({
                        id: Math.random().toString(),
                        title: isOpenModal.value || "",
                        tag: "Personal",
                        completed: false,
                      })
                    );
                  }
                }}
              >
                <input
                  type="text"
                  placeholder={
                    isOpenModal && isOpenModal.id
                      ? "Edit item"
                      : "Add a new item"
                  }
                  value={(isOpenModal && isOpenModal.value) || ""}
                  onChange={(e) => {
                    setOpenModal({
                      ...isOpenModal,
                      value: e.target.value,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "none",
                    outline: "none",
                    borderRadius: "16px",
                  }}
                />
                <button
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "none",
                    outline: "none",
                    borderRadius: "16px",
                    backgroundColor: "black",
                    color: "white",
                    marginTop: "8px",
                  }}
                  type="submit"
                >
                  {isOpenModal && isOpenModal.id ? "Edit" : "Add"}
                </button>
              </form>
            </div>
          </motion.div>
          <button className="add-button" onClick={() => setOpenModal({})}>
            + Add an Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
