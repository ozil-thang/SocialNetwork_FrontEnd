import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
    postId,
    comment: { id, text, displayName, avatar, date, userId },
    auth,
    deleteComment
}) => (
        <div className='comment'>
            <div className="avatar">
                <a href="/">
                    <img src={avatar} alt="" />
                    {displayName}
                </a>
                <br />
                <span><Moment format="DD/MM-hh:mm">{date}</Moment></span>
            </div>
            <p>{text}</p>
            {!auth.loading && userId === auth.user.id && (
                <button
                    onClick={() => deleteComment(id)}
                    type='button'
                    className='btn btn-danger'
                >
                    <i className='fas fa-times' />
                </button>
            )}
        </div>
    );

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteComment }
)(CommentItem);