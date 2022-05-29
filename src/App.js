import React, {} from "react";
import "./App.css";
import "./styles/main_styles.css";
import "./styles/responsive.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Advanced from "./Pages/Advanced";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/advanced" component={Advanced}></Route>
      </Router>
    </div>
  );
}

export default App;
