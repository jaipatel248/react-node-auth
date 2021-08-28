import { Component } from 'react';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }
    handleChange = (name) => (e) => {
        this.setState({ error: '' })
        this.setState({ [name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const {  password, email } = this.state;
        const user = {
             password, email
        }
        this.SignIn(user).then(data => {
            if (data.error) {
                console.log(data.error);
                this.setState({ error: data.error });
            }
            else {
                this.setState({
                    email: '',
                    password: '',
                    error: '',
                })
            }
        })
    }
    SignIn = (user) => {
        return (
            fetch("http://localhost:8080/signin", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(response => {
                return response.json();
            }).catch(err => { console.log(err); })
        )
    }
    render() {
        return (

            <div className="container">
                <h2 className="mt-5 mb-5">
                    Sign Up
                </h2>
                <form>
                    <div className="alert alert-danger" style={{ display: this.state.error ? "block" : "none" }}>
                        {this.state.error}
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Email
                        </label>
                        <input value={this.state.email} onChange={this.handleChange('email')} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Password
                        </label>
                        <input value={this.state.password} onChange={this.handleChange('password')} type="password" className="form-control" />
                    </div>
                    <button onClick={this.onSubmit} className="btn btn-primary mt-1">Submit</button>
                </form>
            </div>
        );
    }
}

export default SignIn;