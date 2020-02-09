import React, { Component } from "react";
import { withAuthorization } from "../Session";
import Button from "@material-ui/core/Button";
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
  player1: null,
  player2: null,
  player3: null,
  player4: null,
  error: null,
  team1: null,
  team2: null,
  loading: false,
  users: [],
  colors: ["#ff7878", "yellow", "#9191f5", "#ef42ef", "#00ffd0", "#ff8100"],
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
        color: this.state.colors[
          Math.floor(Math.random() * this.state.colors.length)
        ],
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

  onCreateTeams = (event, authUser) => {
    const result = this.props.firebase.teams().push({
      player1: this.state.player1,
      player2: this.state.player2,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    this.setState({ team1: result.key });
    const result2 = this.props.firebase.teams().push({
      player1: this.state.player3,
      player2: this.state.player4,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    this.setState({ team2: result2.key });
    event.preventDefault();
  };

  onPlayerSelectedTeam1 = uid => {
    console.log(uid);
    if (!this.playerAlreadySelected(uid)) {
      if (!this.state.player1) {
        this.setState({ player1: uid });
      } else {
        if (!this.state.player2) {
          this.setState({ player2: uid });
        }
      }
    }
  };

  onPlayerSelectedTeam2 = uid => {
    console.log(uid);
    if (!this.playerAlreadySelected(uid)) {
      if (!this.state.player3) {
        this.setState({ player3: uid });
      } else {
        if (!this.state.player4) {
          this.setState({ player4: uid });
        }
      }
    }
  };

  playerAlreadySelected = uid => {
    let isSelected = false;
    if (this.state.player1 && this.state.player1 === uid) {
      this.setState({ player1: null });
      isSelected = true;
    }
    if (this.state.player2 && this.state.player2 === uid) {
      this.setState({ player2: null });
      isSelected = true;
    }
    if (this.state.player3 && this.state.player3 === uid) {
      this.setState({ player3: null });
      isSelected = true;
    }
    if (this.state.player4 && this.state.player4 === uid) {
      this.setState({ player4: null });
      isSelected = true;
    }
    return isSelected;
  };

  UserListTeam1 = ({ users }) => (
    <div className="userSelection">
      {users.map(user => (
        <Tooltip
          key={user.uid}
          title={user.username}
          disabled={
            this.state.team1 &&
            this.state.team2 &&
            (this.state.team1 !== user.uid && this.state.team2 !== user.uid)
          }
        >
          <IconButton
            disabled={
              this.state.team1 &&
              this.state.team2 &&
              (this.state.team1 !== user.uid && this.state.team2 !== user.uid)
            }
            className={this.IsSelectedTeam1(user.uid) ? "buttonSelected" : null}
            key={user.uid}
            name={user.uid}
            onClick={() => this.onPlayerSelectedTeam1(user.uid)}
          >
            <Avatar
              className="userAvatar"
              style={{
                backgroundColor: user.color,
              }}
              key={user.uid}
            >
              {this.GetInitials(user.username)}
            </Avatar>
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );

  UserListTeam2 = ({ users }) => (
    <div className="userSelection">
      {users.map(user => (
        <Tooltip key={user.uid} title={user.username}>
          <IconButton
            className={this.IsSelectedTeam2(user.uid) ? "buttonSelected" : null}
            key={user.uid}
            name={user.uid}
            onClick={() => this.onPlayerSelectedTeam2(user.uid)}
          >
            <Avatar
              className="userAvatar"
              style={{
                backgroundColor: user.color,
              }}
              key={user.uid}
            >
              {this.GetInitials(user.username)}
            </Avatar>
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );

  IsSelectedTeam1 = uid => {
    if (
      (this.state.player1 && this.state.player1 === uid) ||
      (this.state.player2 && this.state.player2 === uid)
    ) {
      return true;
    }
    return false;
  };

  IsSelectedTeam2 = uid => {
    if (
      (this.state.player3 && this.state.player3 === uid) ||
      (this.state.player4 && this.state.player4 === uid)
    ) {
      return true;
    }
    return false;
  };

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

  render() {
    const { player1, player2, player3, player4, users, loading } = this.state;

    const isInvalid = !player1 || !player2 || !player3 || !player4;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container maxWidth="sm">
            <form>
              <div className="teamSelection">
                {loading && <div>Loading ...</div>}
                <h4>Team 1</h4>
                <this.UserListTeam1
                  users={users.filter(
                    u =>
                      u.uid !== this.state.player3 &&
                      u.uid !== this.state.player4
                  )}
                />
                <h4>Team 2</h4>
                <this.UserListTeam2
                  users={users.filter(
                    u =>
                      u.uid !== this.state.player1 &&
                      u.uid !== this.state.player2
                  )}
                />

                <Button
                  className="teamButton"
                  variant="contained"
                  color="primary"
                  disabled={isInvalid}
                  type="submit"
                  onClick={event => this.onCreateTeams(event, authUser)}
                >
                  Save teams
                </Button>
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
