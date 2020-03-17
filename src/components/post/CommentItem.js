import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

const CommentItem = ({
    postId,
    comment: { id, text, displayName, avatar, date, userId },
    auth,
    deleteComment
}) => (
        <div className='comment'>
            <div className="avatar">
                <Link to={`/profiles/${userId}`}>
                    <img src={avatar} alt="" />
                    {displayName}
                </Link>
                <br />
                <span><Moment format="DD/MM-h:mm">{date}</Moment></span>
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