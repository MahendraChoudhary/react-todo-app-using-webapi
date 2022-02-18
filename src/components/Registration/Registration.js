import React, { Component } from "react";
import Base from './../Base'
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./RegistrationStyle.css";
import showPwd from "../../images/showPwd.png";
import hidePwd from "../../images/hidePwd.png";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});
export default class Registration extends Base {
  state = {
    signupData: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      full_name: "",
    },
    hidden: true,
    errMsgFirstName: "",
    errMsgLastName: "",
    errMsgPhone: "",
    errMsgEmail: "",
    errMsgPassword: "",
    successMsg: "",
    error: false,
  };
  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  onChangeHandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "password": this.state.signupData.password,
      "email": this.state.signupData.email,
      "firstname":this.state.signupData.first_name,
      "lastname":this.state.signupData.last_name,
      "phonenumber":this.state.signupData.phone,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(
      this.getUrl() + 'Authentication/register',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({
            signupData: {
              first_name: "",
              last_name: "",
              password: "",
              email: "",
              phone: "",
            },
            errMsgFirstName: "",
            errMsgLastName: "",
            errMsgPhone: "",
            errMsgEmail: "",
            errMsgPassword: "",
            error: false,
          });
        }
        setTimeout(() => {
          this.setState({ successMsg: result.message });
        }, 1000);
        if (result.status === 400 && result.errors) {
          if (result.errors['FirstName']) {
            this.setState({
              error: true,
              errMsgFirstName: result.errors['FirstName'][0],
            });
          }
          if (result.errors['LastName']) {
            this.setState({
              error: true,
              errMsgLastName: result.errors['LastName'][0],
            });
          }
          if (result.errors['PhoneNumber']) {
            this.setState({
              error: true,
              errMsgPhone: result.errors['PhoneNumber'][0],
            });
          }
          if (result.errors['Email']) {
            this.setState({
              error: true,
              errMsgEmail: result.errors['Email'][0],
            });
          }
          if (result.errors['Password']) {
            this.setState({
              error: true,
              errMsgPassword: result.errors['Password'][0],
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container className="themed-container mt-2" fluid="sm">
        <div className="text-center">
          <i className="fa fa-2x fa-lock" aria-hidden="true"></i>
          <div className="text-color">Signup</div>
          <div className="hr"></div>
        </div>
        <ThemeProvider theme={theme}>
          <div className="d-flex justify-content-around mb-5">
            <div className="txt-first">
              <TextField
                error={this.state.error}
                name="first_name"
                label="First Name"
                fullWidth
                hintText="Phone"
                color="primary"
                variant="outlined"
                value={this.state.signupData.first_name}
                onChange={this.onChangeHandler}
                autoFocus
                helperText={this.state.errMsgFirstName}
              />
            </div>
            <div className="txt-last">
              <TextField
                error={this.state.error}
                name="last_name"
                label="Last Name"
                color="primary"
                variant="outlined"
                value={this.state.signupData.last_name}
                onChange={this.onChangeHandler}
                fullWidth
                helperText={this.state.errMsgLastName}
              />
            </div>
          </div>
          <div className="signup-wrapper">
            <TextField
              error={this.state.error}
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              variant="outlined"
              value={this.state.signupData.phone}
              onChange={this.onChangeHandler}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
              min={0}
              helperText={this.state.errMsgPhone}
            />
            <TextField
              error={this.state.error}
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={this.state.signupData.email}
              onChange={this.onChangeHandler}
              helperText={this.state.errMsgEmail}
            />
            <div className="show-hide-pwd-wrapper">
              <TextField
                error={this.state.error}
                name="password"
                label="Password"
                type={this.state.hidden ? "password" : "text"}
                fullWidth
                variant="outlined"
                value={this.state.signupData.password}
                onChange={this.onChangeHandler}
                helperText={this.state.errMsgPassword}
              />
              <img
                src={this.state.hidden ? showPwd : hidePwd}
                onClick={this.toggleShow}
                alt="showPwd"
                className="eyeIcon"
              />
            </div>
            <div class=" alert-success pl-5">{this.state.successMsg}</div>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={this.onSubmitHandler}
            >
              SIGN UP
            </Button>
            <p className="already-txt ml-5">
              Already have an account?
              <Link to="/login" className="sign-in-txt">
                Sign In
              </Link>
            </p>
          </div>
        </ThemeProvider>
      </Container>
    );
  }
}
