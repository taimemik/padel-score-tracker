import React from 'react';
import { withFirebase } from '../Firebase';
import Link from '@material-ui/core/Link';
const SignOutLink = ({ firebase }) => (

  <Link onClick={firebase.doSignOut} href="#">Signout</Link>
);
export default withFirebase(SignOutLink);