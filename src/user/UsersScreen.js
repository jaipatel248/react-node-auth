import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import avatar from "../images/avatar.jpg";

class UsersScreen extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      redirectToSign: false,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthenticated().token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ users: data });
      });
  }
  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Users</h2>
          </div>
          <div className="row">
            {users.map((u, i) => (
              <div key={i} className="card col-md-4">
                <img
                  src={avatar}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {u.name} ({u.email})
                  </h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to={`/user/${u._id}`} className="btn btn-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UsersScreen;
