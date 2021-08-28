import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../API/auth";
import { isAuthenticated } from "../auth/auth";
import DeletProfileScreen from "./DeletProfileScreen";

class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      redirectToSign: false,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }
  init(userId) {
    getUser(userId, isAuthenticated().token).then((data) => {
      this.setState({ user: data });
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello: {`${this.state.user.name}`}</p>
            <p>Email: {`${this.state.user.email}`}</p>
          </div>
        </div>
        <div className="col-md-6">
          {isAuthenticated().user &&
            isAuthenticated().user._id === this.state.user._id && (
              <div className="d-inline-block mt-5">
                <Link
                  className="btn btn-primary mr-5"
                  to={`/user/edit/${this.state.user._id}`}
                >
                  Edit Profile
                </Link>
                <DeletProfileScreen
                  userId={this.state.user._id}
                ></DeletProfileScreen>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default ProfileScreen;
