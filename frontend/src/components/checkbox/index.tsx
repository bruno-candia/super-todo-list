import { motion } from "framer-motion";
import { Todo } from "../../types/todo-list-itens";
import useCheckbox from "../../hooks/useCheckbox";
import "./checkbox.css";

interface CheckboxProps {
  todo: Todo;
}

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

function Checkbox({ todo }: CheckboxProps) {
  const { handleCheckboxChange, setIsChecked, isChecked } = useCheckbox();

  return (
    <button
      className="button"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
      onClick={handleCheckboxChange}
    >
      <input
        type="checkbox"
        className="checkbox"
        onChange={() => setIsChecked((prev) => !prev)}
        id={todo.id}
      />
      <div className="checkbox-container">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          stroke="currentColor"
          className="svg-icon"
          initial={false}
          animate={isChecked ? "checked" : "unchecked"}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            variants={tickVariants}
          />
        </motion.svg>
      </div>
    </button>
  );
}
export default Checkbox;
