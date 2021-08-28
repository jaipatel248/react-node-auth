import { Component } from "react";
import { Redirect } from "react-router-dom";
import { MDBSpinner } from "mdb-react-ui-kit";
import { signIn } from "../API/auth";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "imjp@gmail.com",
      password: "123456",
      error: "",
      reDirectToReferancs: false,
      loading: false,
    };
  }
  authinticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };
  handleChange = (name) => (e) => {
    this.setState({ error: "" });
    this.setState({ [name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { password, email } = this.state;
    const user = {
      password,
      email,
    };
    signIn(user).then((data) => {
      if (data.error) {
        console.log(data.error);
        this.setState({ error: data.error, loading: false });
      } else {
        this.authinticate(data, () => {
          this.setState({ reDirectToReferancs: true });
        });
        this.setState({
          email: "",
          password: "",
          error: "",
        });
      }
    });
  };

  render() {
    const { reDirectToReferancs, loading } = this.state;
    if (reDirectToReferancs) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        <form>
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "block" : "none" }}
          >
            {this.state.error}
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
          {(loading && (
            <MDBSpinner className="mt-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          )) || (
            <button onClick={this.onSubmit} className="btn btn-primary mt-3">
              Submit
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default SignIn;
