import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import PropTypes from "prop-types";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import "./signIn.css";

const SignInPage = () => (
  <div className="flex-container">
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <Container maxWidth="sm">
        <form onSubmit={this.onSubmit}>
          <div className="flex-container">
            <TextField
              name="email"
              required
              id="outlined-required"
              label="Email address"
              variant="outlined"
              value={email}
              onChange={this.onChange}
            />
            <TextField
              name="password"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={this.onChange}
            />

            <Button
              variant="contained"
              color="primary"
              disabled={isInvalid}
              type="submit"
            >
              Sign In
            </Button>

            {error && <p>{error.message}</p>}
          </div>
        </form>
      </Container>
    );
  }
}

SignInFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object,
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
