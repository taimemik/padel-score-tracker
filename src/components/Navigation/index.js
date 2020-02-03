import React from "react";
import Link from "@material-ui/core/Link";

import SignOutLink from "../SignOut/link";
import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul className="navigation">
    <li>
      <Link href={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link href={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link href={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link href={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <Link href={ROUTES.GROUPS}>Groups</Link>
    </li>
    <li>
      <SignOutLink />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navigation">
    <li>
      <Link href={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link href={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
