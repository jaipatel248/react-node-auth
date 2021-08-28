import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { getUser, Update } from "../API/auth";
import { isAuthenticated } from "../auth/auth";
import DeletProfileScreen from "./DeletProfileScreen";

class EditScreen extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
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
      this.setState({
        id: data._id,
        name: data.name,
        email: data.email,
        password: data.password,
      });
    });
  }
  handleChange = (name) => (e) => {
    this.setState({ error: "" });
    this.setState({ [name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, id } = this.state;
    const user = {
      name,
      password,
      email,
    };
    console.log(user);
    Update(id, isAuthenticated().token, user).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error });
      } else {
        this.setState({
          redirectToSign: true,
        });
      }
    });
  };
  render() {
    if (this.state.redirectToSign) {
      return <Redirect to={`/user/${this.state.id}`}></Redirect>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="mt-5 mb-5">Edit Profile</h2>
          </div>
        </div>
        <form>
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "block" : "none" }}
          >
            {this.state.error}
          </div>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              value={this.state.name}
              onChange={this.handleChange("name")}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              value={this.state.email}
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              value={this.state.password}
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
            />
          </div>
          <button onClick={this.onSubmit} className="btn btn-primary mt-1">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditScreen;
