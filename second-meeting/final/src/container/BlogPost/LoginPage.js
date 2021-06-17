import React, { Component } from "react";

import Header from "parts/Header";

import Button from "elements/Button";

import { connect } from "react-redux";

import { login } from "store/actions/login";

import { getWithExpiry } from "utils/setExpiryLocalStorage";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
    };

    if (getWithExpiry("token")) return this.props.history.push("/me");

    this.handleChange = this.handleChange.bind(this);
    this._login = this._login.bind(this);
  }

  handleChange(event) {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  _login = (event) => {
    const { data } = this.state;
    if (data.email === "" || data.password2 === "") {
      toast.error("Tolong isi dan lengkapi field!");

    } else {
      const payload = {
        email: data.email,
        password: data.password,
      };
      this.props.login(payload, this.props);
    }

    event.preventDefault();
  };

  render() {
    return (
      <>
        <Header {...this.props} isCentered />
        <section className="container" style={{ margin: "auto" }}>
          <div className="wrapper" style={{ margin: "140px 0" }}>
            <form onSubmit={this._login}>
              <div className="row">
                <div className="col-6" style={{ margin: "0 auto" }}>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Masukkan email..."
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6" style={{ margin: "0 auto" }}>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Masukkan password..."
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6" style={{ margin: "0 auto" }}>
                  <Button className="btn px-4" type="submit" isPrimary>
                    Login
                  </Button>
                  <Button
                    className="btn btn-light px-4 ml-3"
                    type="link"
                    href="/register"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

export default connect(mapStateToProps, { login })(LoginPage);
