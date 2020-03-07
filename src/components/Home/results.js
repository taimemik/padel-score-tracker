import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import SetResult from "./setResult";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const INITIAL_STATE = {
  results: [{ team1Result: 0, team2Result: 0, setId: 1 }],
  setId: 1,
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
    let id = this.state.setId;
    let array = [...this.state.results];
    let index = array.findIndex(res => res.setId === id);
    const resultTest = array.find(res => res.setId === id);
    resultTest.team1Result = newValue;
    array[index] = resultTest;
    this.setState({ results: array });
  };

  setTeamResult2 = newValue => {
    let id = this.state.setId;
    let array = [...this.state.results];
    let index = array.findIndex(res => res.setId === id);
    const resultTest = array.find(res => res.setId === id);
    resultTest.team2Result = newValue;
    array[index] = resultTest;
    this.setState({ results: array });
  };

  addNewSet = () => {
    let id = this.state.setId;

    const results = this.state.results;
    results.push({
      team1Result: 0,
      team2Result: 0,
      setId: id + 1,
    });

    this.setState({
      results: results,
      setId: id + 1,
    });
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
                  <span
                    style={{
                      paddingTop: "25px",
                    }}
                  >
                    VS
                  </span>
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
              {this.state.results.map(result => (
                <div className="userSelection" key={result.setId}>
                  <SetResult
                    setTeamResult={this.setTeamResult1}
                    result={result.team1Result}
                    name={"result1." + result.setId}
                    isInverted={false}
                    isDisabled={result.setId !== this.state.setId}
                  />
                  <span>-</span>
                  <SetResult
                    setTeamResult={this.setTeamResult2}
                    result={result.team2Result}
                    name={"result2." + result.setId}
                    isInverted={true}
                    isDisabled={result.setId !== this.state.setId}
                  />
                </div>
              ))}

              <div className="userSelection">
                <IconButton aria-label="add new set" onClick={this.addNewSet}>
                  <AddCircleOutlineIcon />
                </IconButton>
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
