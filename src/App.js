import react from "react";
import "./App.css";
import Weather from "./components/Weather";
import { Provider } from "react-redux";
import WeatherStore from "./redux/Store";
const App = () => {
  return (
    <Provider store={WeatherStore}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
};

export default App;
