import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "./actions";
import Board from "./pages/board/Board";
import Navbar from "./components/Navbar/navbar.component";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/landing/Landing.jsx";
import setDefaultColors from "./utilities/setDefaultColors";
import colors from "./utilities/colorThemes";

import "./App.scss";

window.colors = colors;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUser();
    //setDefaultColors();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/board/:id" component={Board} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
