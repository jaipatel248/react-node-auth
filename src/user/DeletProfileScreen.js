import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { removeUser, signOut } from "../API/auth";
import { isAuthenticated } from "../auth/auth";

class DeletProfileScreen extends Component {
  state = {
    isAuthenticated: true,
  };
  onConfirm = () => {
    removeUser(this.props.userId, isAuthenticated().token).then((data) => {
      if (data.error) {
        console.log("error");
      } else {
        signOut(() => console.log("wef"));
        this.setState({ isAuthenticated: false });
      }
    });
  };
  confirm = () => {
    let flag = window.confirm("Are you sure you want to delete this profile?");
    if (flag) this.onConfirm();
  };
  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div>
        <span onClick={this.confirm} className="btn btn-danger mr-5">
          Delete Profile
        </span>
      </div>
    );
  }
}

export default DeletProfileScreen;
