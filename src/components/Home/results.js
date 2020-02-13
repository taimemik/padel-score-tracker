import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import SetResult from "./setResult";

const INITIAL_STATE = {
  result1: 0,
  result2: 0,
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

  setTeamResult1 = newValue => {
    console.log("result1" + newValue);
    this.setState({ result1: newValue });
  };

  setTeamResult2 = value => {
    console.log("result2" + value);
    this.setState({ result2: value });
  };

  render() {
    return (
      <div>
        {this.props.team2 &&
          this.props.team2.player2 &&
          this.props.team2.player2.uid && (
            <div>
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
              </div>
              <div className="userSelection">
                <SetResult
                  setTeamResult={this.setTeamResult1}
                  result={this.state.result1}
                  name={"result1"}
                  isInverted={false}
                />
                <span> -</span>
                <SetResult
                  setTeamResult={this.setTeamResult2}
                  result={this.state.result2}
                  name={"result2"}
                  isInverted={true}
                />
              </div>
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
