import React, { Component } from "react";
import { AuthUserContext } from "../Session";
import Firebase from "firebase";
import { MessageList } from "./index";
import PropTypes from "prop-types";
export class MessagesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      loading: false,
      messages: [],
      limit: 5,
    };
  }
  componentDidMount() {
    this.onListenForMessages();
  }
  onListenForMessages = () => {
    this.setState({ loading: true });
    this.props.firebase
      .messages()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", snapshot => {
        const messageObject = snapshot.val();
        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key,
          }));
          this.setState({
            messages: messageList,
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: Firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({ text: "" });
    event.preventDefault();
  };
  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      //   editedAt: this.props.firebase.serverValue.TIMESTAMP,
      editedAt: Firebase.database.ServerValue.TIMESTAMP,
    });
  };
  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };
  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    );
  };
  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}
MessagesBase.propTypes = {
  firebase: PropTypes.object,
  users: PropTypes.object,
};
