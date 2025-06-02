import { Link } from "react-router-dom";
import { useAppContext } from "../store/AppContext";

const HomePage = () => {
  const { state, dispatch } = useAppContext();
  return (
    <div className="flex flex-col p-2">
      <h1>Welcome to the Home Page</h1>
      <div>This is the main page of the application.</div>
      <div>
        <p className="mt-4">
          The App context state value is: <b>{state.stateValue}</b>
        </p>
        <button
          onClick={() =>
            dispatch({
              type: "SET_STATE",
              payload: "Context State Changed",
            })
          }
        >
          Update Context State
        </button>
      </div>
      <Link to="/about">
        <button>
          Go to About Page
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
