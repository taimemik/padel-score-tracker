import React, { Component } from "react";
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

const INITIAL_STATE = {
  player1: { uid: null, username: null, initials: null, color: null },
  player2: { uid: null, username: null, initials: null, color: null },
  player3: { uid: null, username: null, initials: null, color: null },
  player4: { uid: null, username: null, initials: null, color: null },
  error: null,
  team1: null,
  team2: null,
  loading: false,
  users: [],
  colors: ["#ff7878", "yellow", "#9191f5", "#ef42ef", "#00ffd0", "#ff8100"],
  teamSaved: null,
};

class PlayerForm extends Component {
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
      player1: this.state.player1.uid,
      player2: this.state.player2.uid,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    this.props.setTeam1({
      team1: {
        teamId: result.key,
        player1: this.state.player1,
        player2: this.state.player2,
      },
    });
    const result2 = this.props.firebase.teams().push({
      player1: this.state.player3.uid,
      player2: this.state.player4.uid,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
      createdBy: authUser.uid,
    });
    this.props.setTeam2({
      team2: {
        teamId: result2.key,
        player1: this.state.player3,
        player2: this.state.player4,
      },
    });
    this.setState({ teamSaved: true });
    event.preventDefault();
  };

  onPlayerSelectedTeam1 = user => {
    if (!this.playerAlreadySelected(user.uid)) {
      if (!this.state.player1.uid) {
        this.setState({
          player1: {
            uid: user.uid,
            username: user.username,
            initials: this.GetInitials(user.username),
            color: user.color,
          },
        });
      } else {
        if (!this.state.player2.uid) {
          this.setState({
            player2: {
              uid: user.uid,
              username: user.username,
              initials: this.GetInitials(user.username),
              color: user.color,
            },
          });
        }
      }
    }
  };

  onPlayerSelectedTeam2 = user => {
    if (!this.playerAlreadySelected(user.uid)) {
      if (!this.state.player3.uid) {
        this.setState({
          player3: {
            uid: user.uid,
            username: user.username,
            initials: this.GetInitials(user.username),
            color: user.color,
          },
        });
      } else {
        if (!this.state.player4.uid) {
          this.setState({
            player4: {
              uid: user.uid,
              username: user.username,
              initials: this.GetInitials(user.username),
              color: user.color,
            },
          });
        }
      }
    }
  };

  playerAlreadySelected = uid => {
    console.log(uid);
    let isSelected = false;
    if (this.state.player1 && this.state.player1.uid === uid) {
      this.setState({ player1: { uid: null, username: null, initials: null } });
      isSelected = true;
    }
    if (this.state.player2 && this.state.player2.uid === uid) {
      this.setState({ player2: { uid: null, username: null, initials: null } });
      isSelected = true;
    }
    if (this.state.player3 && this.state.player3.uid === uid) {
      this.setState({ player3: { uid: null, username: null, initials: null } });
      isSelected = true;
    }
    if (this.state.player4 && this.state.player4.uid === uid) {
      this.setState({ player4: { uid: null, username: null, initials: null } });
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
            onClick={() => this.onPlayerSelectedTeam1(user)}
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
            onClick={() => this.onPlayerSelectedTeam2(user)}
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
      (this.state.player1.uid && this.state.player1.uid === uid) ||
      (this.state.player2.uid && this.state.player2.uid === uid)
    ) {
      return true;
    }
    return false;
  };

  IsSelectedTeam2 = uid => {
    if (
      (this.state.player3.uid && this.state.player3.uid === uid) ||
      (this.state.player4.uid && this.state.player4.uid === uid)
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
    const {
      player1,
      player2,
      player3,
      player4,
      users,
      loading,
      teamSaved,
    } = this.state;

    const isInvalid = !player1 || !player2 || !player3 || !player4;
    const isVisible = !teamSaved;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container maxWidth="sm">
            <form>
              {isVisible && (
                <div className="teamSelection">
                  {loading && <div>Loading ...</div>}
                  {}
                  <h4>Team 1</h4>
                  <this.UserListTeam1
                    users={users.filter(
                      u =>
                        u.uid !== this.state.player3.uid &&
                        u.uid !== this.state.player4.uid
                    )}
                  />
                  <h4>Team 2</h4>
                  <this.UserListTeam2
                    users={users.filter(
                      u =>
                        u.uid !== this.state.player1.uid &&
                        u.uid !== this.state.player2.uid
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
              )}
            </form>
          </Container>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

PlayerForm.propTypes = {
  firebase: PropTypes.object,
  history: PropTypes.object,
  setTeam1: PropTypes.func,
  setTeam2: PropTypes.func,
};

export default compose(
  withRouter,
  withFirebase
)(PlayerForm);
