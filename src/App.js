import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./pages/Auth/Auth";

export const App = () => {
  if (true) {
    return <Auth />;
  }
  return <div className="App"></div>;
};
