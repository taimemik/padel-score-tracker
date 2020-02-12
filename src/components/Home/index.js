import React, { Component } from "react";
import { withAuthorization } from "../Session";
import Results from "./results";
import PlayerForm from "./playerForm";

const condition = authUser => !!authUser;
const INITIAL_STATE = {
  error: null,
  team1: {
    teamId: null,
    player1: { uid: null, username: null, initials: null, color: null },
    player2: { uid: null, username: null, initials: null, color: null },
  },
  team2: {
    teamId: null,
    player1: { uid: null, username: null, initials: null, color: null },
    player2: { uid: null, username: null, initials: null, color: null },
  },
  loading: false,
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.setTeam1 = this.setTeam1.bind(this);
    this.setTeam2 = this.setTeam2.bind(this);
  }
  setTeam1(team1) {
    this.setState({
      team1: team1,
    });
  }
  setTeam2(team2) {
    this.setState({
      team2: team2,
    });
  }

  render() {
    return (
      <div>
        <PlayerForm setTeam1={this.setTeam1} setTeam2={this.setTeam2} />
        <Results {...this.state.team1} {...this.state.team2} />
      </div>
    );
  }
}
export default withAuthorization(condition)(HomePage);
