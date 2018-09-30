import React, { Component } from "react";
import "./App.css";

import MemberForm from "./components/member-form";

class App extends Component {
  state = {
    response: ""
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
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
