import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const SignUpPage = () => (
  <div className="flex-container">
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="flex-container">
          <TextField
            name="username"
            required
            id="outlined-required-name"
            label="Full Name"
            variant="outlined"
            value={username}
            onChange={this.onChange}
          />
          <TextField
            name="email"
            required
            id="outlined-required-email"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={this.onChange}
          />
          <TextField
            name="passwordOne"
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            onChange={this.onChange}
            value={passwordOne}
          />
          <TextField
            name="passwordTwo"
            id="outlined-password-input2"
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={this.onChange}
            value={passwordTwo}
          />
          <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
            Sign Up
          </Button>

          {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}

const SignUpLink = () => (
  <Typography>

    Don't have an account? <Link href={ROUTES.SIGN_UP}>
      Link
  </Link>

  </Typography>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };