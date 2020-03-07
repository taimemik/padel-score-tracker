import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import Rating from "@material-ui/lab/Rating";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Box from "@material-ui/core/Box";

const INITIAL_STATE = {
  games: ["0", "1", "2", "3", "4", "5", "6", "7"],
  hover: -1,
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

class SetResult extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  setHover = newValue => {
    this.setState({ hover: newValue });
  };

  render() {
    return (
      <div
        className={
          this.props.isInverted ? "invertedScoreSelection" : "scoreSelection"
        }
      >
        <StyledRating
          disabled={this.props.isDisabled}
          name={this.props.name}
          max={7}
          defaultValue={0}
          value={this.props.result}
          onChange={(event, newValue) => {
            this.props.setTeamResult(newValue);
          }}
          onChangeActive={(event, newHover) => {
            this.setHover(newHover);
          }}
          precision={1}
          icon={<FiberManualRecordIcon fontSize="inherit" />}
        />
        {(this.state.hover !== -1 || this.props.result !== null) && (
          <Box
            ml={2}
            className={
              this.props.isInverted ? "invertedRatingBox" : "ratingBox"
            }
          >
            {this.state.hover !== -1 ? this.state.hover : this.props.result}
          </Box>
        )}
      </div>
    );
  }
}

SetResult.propTypes = {
  result: PropTypes.number,
  setTeamResult: PropTypes.func,
  name: PropTypes.string,
  isInverted: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default SetResult;
