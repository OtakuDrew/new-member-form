import React, { Component } from "react";
import "./App.css";

import MemberForm from "./components/member-form";

class App extends Component {
  state = {
    response: ""
  };

  render() {
    return (
      <main className="container-fluid">
        <div className="container outer">
          <MemberForm />
        </div>
      </main>
    );
  }
}

export default App;
