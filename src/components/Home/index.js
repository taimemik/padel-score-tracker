import React, { Component } from "react";
import { withAuthorization } from "../Session";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";
import Firebase from "firebase";

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <PlayerForm />
  </div>
);

const condition = authUser => !!authUser;
const INITIAL_STATE = {
  player1: "",
  player2: "",
  error: null,
  team1: null,
};

class PlayerFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onCreateTeam = (event, authUser) => {
    const result = this.props.firebase.teams().push({
      player1: this.state.player1,
      player2: this.state.player2,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    console.log(result.key);
    this.setState({ team1: result.key });
    event.preventDefault();
  };

  onChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { player1, player2, error } = this.state;

    const isInvalid = player1 === "" || player2 === "";

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container maxWidth="sm">
            <form onSubmit={event => this.onCreateTeam(event, authUser)}>
              <div className="flex-container">
                <h2>Team 1</h2>
                {!this.state.team1 ? (
                  <div className="flex-container">
                    <TextField
                      name="player1"
                      required
                      id="outlined-player1"
                      label="Player1"
                      variant="outlined"
                      onChange={this.onChange}
                    />
                    <TextField
                      name="player2"
                      required
                      id="outlined-player2"
                      label="Player2"
                      variant="outlined"
                      onChange={this.onChange}
                    />

                    {error && <p>{error.message}</p>}
                    <button type="submit">Save</button>
                  </div>
                ) : (
                  <span>
                    {this.state.player1} + {this.state.player2}
                  </span>
                )}
              </div>
            </form>
          </Container>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

PlayerFormBase.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object,
};

const PlayerForm = compose(
  withRouter,
  withFirebase
)(PlayerFormBase);

export default withAuthorization(condition)(HomePage);
