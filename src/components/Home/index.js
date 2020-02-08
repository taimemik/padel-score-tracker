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
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const HomePage = () => (
  <div>
    <PlayerForm />
  </div>
);

const condition = authUser => !!authUser;
const INITIAL_STATE = {
  player1: "",
  player2: "",
  player3: "",
  player4: "",
  error: null,
  team1: null,
  team2: null,
  loading: false,
  users: [],
};

class PlayerFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  onCreateTeam1 = (event, authUser) => {
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

  onCreateTeam2 = (event, authUser) => {
    const result = this.props.firebase.teams().push({
      player1: this.state.player3,
      player2: this.state.player4,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    console.log(result.key);
    this.setState({ team2: result.key });
    event.preventDefault();
  };

  onChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  onAvatarClick = event => {
    console.log(event.target);
  };

  onAvatarClick2 = uid => {
    console.log(uid);
  };

  UserList = ({ users }) => (
    <div className="navigation">
      {users.map(user => (
        <Tooltip key={user.uid} title={user.username}>
          <IconButton
            key={user.uid}
            name={user.uid}
            onClick={() => this.onAvatarClick2(user.uid)}
          >
            <Avatar className="userAvatar" key={user.uid}>
              {this.GetInitials(user.username)}
            </Avatar>
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );

  GetInitials = userName => {
    if (userName) {
      var initials = userName.match(/\b\w/g) || [];
      initials = (
        (initials.shift() || "") + (initials.pop() || "")
      ).toUpperCase();
      return initials;
    }
    return "player1";
  };

  getTeam1(authUser) {
    const { error, team1, player2, player1 } = this.state;
    return (
      <div>
        <h4>Team 1</h4>
        {!team1 ? (
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
            <button onClick={event => this.onCreateTeam1(event, authUser)}>
              Save
            </button>
          </div>
        ) : (
          <span>
            {player1} + {player2}
          </span>
        )}
      </div>
    );
  }

  getTeam2(authUser) {
    const { error, team2, player3, player4 } = this.state;
    return (
      <div>
        <h4>Team 2</h4>
        {!team2 ? (
          <div className="flex-container">
            <TextField
              name="player3"
              required
              id="outlined-player3"
              label="Player3"
              variant="outlined"
              onChange={this.onChange}
            />
            <TextField
              name="player4"
              required
              id="outlined-player4"
              label="Player4"
              variant="outlined"
              onChange={this.onChange}
            />
            {error && <p>{error.message}</p>}
            <button onClick={event => this.onCreateTeam2(event, authUser)}>
              Save
            </button>
          </div>
        ) : (
          <span>
            {player3} + {player4}
          </span>
        )}
      </div>
    );
  }

  render() {
    const { player1, player2, team1, users, loading } = this.state;

    const isInvalid = player1 === "" || player2 === "";

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container maxWidth="sm">
            <form>
              {loading && <div>Loading ...</div>}
              <this.UserList users={users} />
              <div className="flex-container">
                {this.getTeam1(authUser)}
                {team1 ? this.getTeam2(authUser) : null}
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
