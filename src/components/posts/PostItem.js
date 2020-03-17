import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLike, removeLike, deletePost } from '../../actions/post'
import Moment from 'react-moment';


const PostItem = ({ auth,
    post: { id, userId, text, displayName, avatar, likesCount, commentsCount, date, video, photo, isLike },
    addLike,
    removeLike,
    deletePost
}) => {

    return (
        <div className="post">
            <div className="avatar">
                <Link to={`/profiles/${userId}`}>
                    <img src={avatar} alt="" />
                    {displayName}
                </Link>
                <br />
                <span><Moment format="DD/MM-h:mm">{date}</Moment></span>
            </div>
            <p>{text}</p>
            {
                photo && <img src={photo} alt="" />
            }
            {
                video && (<video controls>
                    <source src={video} type="video/mp4" />
                </video>)
            }

            <Fragment>
                {
                    (isLike) ? (
                        <Fragment>
                            <button
                                type='button'
                                className='btn btn-primary'>
                                <i className='fas fa-thumbs-up' />{' '}
                                <span>{likesCount > 0 && <span>{likesCount}</span>}</span>
                            </button>
                            <button
                                onClick={() => removeLike(id)}
                                type='button'
                                className='btn btn-light'>
                                <i className='fas fa-thumbs-down' />
                            </button>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <button
                                    onClick={() => addLike(id)}
                                    type='button'
                                    className='btn btn-light'>
                                    <i className='fas fa-thumbs-up' />{' '}
                                    <span>{likesCount > 0 && <span>{likesCount}</span>}</span>
                                </button>
                            </Fragment>
                        )
                }

                <Link to={`/posts/${id}`} className='btn btn-primary'>
                    Discussion{' '}
                    {commentsCount > 0 && (
                        <span className='comment-count'>{commentsCount}</span>
                    )}
                </Link>
                {!auth.loading && userId === auth.user.id && (
                    <button
                        onClick={() => deletePost(id)}
                        type='button'
                        className='btn btn-danger'
                    >
                        <i className='fas fa-times' />
                    </button>
                )}
            </Fragment>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
