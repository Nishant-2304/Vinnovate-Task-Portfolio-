import "./Loader.css";

function Loader({ onFinish }) {
  return (
    <div className="loader">
      <h1>NASCAR TEAM X</h1>
      <span>LOADING</span>
      <div className="bar" />
      {setTimeout(onFinish, 2200)}
    </div>
  );
}

export default Loader;
