import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" component={Layout} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
