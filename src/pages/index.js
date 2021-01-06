import React from "react";
import NavBar from "../components/navBar";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log("soy la home cabrones");
  }

  render() {
    return <NavBar />;
  }
}

export default Home;
