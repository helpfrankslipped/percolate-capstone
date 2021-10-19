import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../store/reviewActions";
import { getAuth } from "firebase/auth";

const auth = getAuth();
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { user: auth.currentUser };
    this.handleLike = this.handleLike.bind(this);
  }
  handleLike() {
    const likeClick = this.props.likeClick;
    const { uid, displayName, photoURL } = this.state.user;
    console.log("This is the user Info!!!!", displayName);
    likeClick(this.props.reviewId, uid, displayName, photoURL);
  }
  render() {
    const likeCount = this.props.likeCount;
    const { handleLike } = this;
    return `${likeCount}` ? (
      <div className='like_button' onClick={handleLike}>
        Like {likeCount ? `(${likeCount})` : null}
      </div>
    ) : null;
  }
}
const mapState = (state) => {
  return {
    loggedInPerson: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  likeClick: (reviewId, userId, displayName, photoURL) =>
    dispatch(likeClick(reviewId, userId, displayName, photoURL)),
});

export default connect(mapState, mapDispatch)(LikeButton);