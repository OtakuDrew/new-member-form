import React, { Component } from "react";
class ThankYou extends Component {
  state = {};
  render() {
    return (
      <div className="jumbotron">
        <h1>Your information has Been Submitted.</h1>
        <h2>You are free to close this app or Check out our Menu's</h2>
        <h2>
          <a
            href="https://weedmaps.com/deliveries/cali-green-express-2"
            className="m-2"
          >
            SFV Menu
          </a>
          <a href="https://weedmaps.com/deliveries/cali-green-express-simi-valley">
            Simi Menu
          </a>
        </h2>
      </div>
    );
  }
}

export default ThankYou;
