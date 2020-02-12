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

const INITIAL_STATE = {
  games: ["0", "1", "2", "3", "4", "5", "6", "7"],
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  resultSelection = () => (
    <div className="userSelection">
      {this.state.games.map(game => (
        <IconButton key={game}>
          <Avatar className="userAvatar" key={game}>
            {game}
          </Avatar>
        </IconButton>
      ))}
    </div>
  );

  render() {
    return (
      <div>
        {this.props.team2 &&
          this.props.team2.player2 &&
          this.props.team2.player2.uid && (
            <div className="userSelection">
              <div className="userSelection">
                <Tooltip title={this.props.team1.player1.username} disabled>
                  <Avatar
                    className="userAvatar"
                    style={{
                      backgroundColor: this.props.team1.player1.color,
                    }}
                  >
                    {this.props.team1.player1.initials}
                  </Avatar>
                </Tooltip>
                <Tooltip title={this.props.team1.player2.username} disabled>
                  <Avatar
                    className="userAvatar"
                    style={{
                      backgroundColor: this.props.team1.player2.color,
                    }}
                  >
                    {this.props.team1.player2.initials}
                  </Avatar>
                </Tooltip>
                VS
                <Tooltip title={this.props.team2.player1.username} disabled>
                  <Avatar
                    className="userAvatar"
                    style={{
                      backgroundColor: this.props.team2.player1.color,
                    }}
                  >
                    {this.props.team2.player1.initials}
                  </Avatar>
                </Tooltip>
                <Tooltip title={this.props.team2.player2.username} disabled>
                  <Avatar
                    className="userAvatar"
                    style={{
                      backgroundColor: this.props.team2.player2.color,
                    }}
                  >
                    {this.props.team2.player2.initials}
                  </Avatar>
                </Tooltip>
              </div>
              {this.resultSelection()}
            </div>
          )}
      </div>
    );
  }
}

Results.propTypes = {
  team1: PropTypes.object,
  team2: PropTypes.object,
};

export default Results;
