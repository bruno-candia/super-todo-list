import TodoList from "../todo-list";
import "./sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar--container">
      <div className="sidebar--header">
        <h3 className="title">To do List</h3>
        <p
          style={{
            lineHeight: "1.5",
          }}
        >
          Create a list of things you need to do. You can add, remove, and check
          off items.
        </p>
      </div>
      <TodoList />
    </aside>
  );
}
export default Sidebar;
