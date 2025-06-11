import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAppContext } from "../../store/AppContext/AppContext";

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
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: "SET_STATE",
              payload: "Context State Changed",
            })
          }
        >
          Update Context State
        </Button>
      </div>
      <Link to="/about">
        <Button>
          Go to About Page
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
