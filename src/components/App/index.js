import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import CssBaseline from '@material-ui/core/CssBaseline';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


function App() {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth="sm">
          <Typography component="div" style={{}} >
            <CssBaseline />
            <Navigation />

            <hr />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              exact
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />

          </Typography>
        </Container>


      </Router>
    </ThemeProvider>
  );
}

export default withAuthentication(App);