import React, { Component } from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  //   withEmailVerification,
} from "../Session";
import { withFirebase } from "../Firebase";
import PropTypes from "prop-types";
import { MessagesBase } from "./MessagesBase";
import { MessageItem } from "./MessageItem";

export class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }
  componentDidMount() {
    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }
  render() {
    return (
      <div>
        <h1>Groups</h1>

        <Messages users={this.state.users} />
      </div>
    );
  }
}

export const MessageList = ({ messages, onEditMessage, onRemoveMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

export const Messages = withFirebase(MessagesBase);

const condition = authUser => !!authUser;
MessageList.propTypes = {
  onEditMessage: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.object),
  onRemoveMessage: PropTypes.func,
};

GroupPage.propTypes = {
  firebase: PropTypes.object,
};

export default compose(
  withFirebase,
  //   withEmailVerification,
  withAuthorization(condition)
)(GroupPage);
