import "./home.css";
import Sidebar from "../../components/sidebar";

function Home() {
  return (
    <div id="home">
      <header className="header">
        <h1 className="logo">Super To do List</h1>
      </header>
      <main className="container">
        <Sidebar />
        <div>
          <h2>Content</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
            alias quasi iste ratione, at ex, doloremque, magni sit harum odio
            repellat qui fuga nulla aliquid distinctio fugiat? Neque, blanditiis
            cum.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
