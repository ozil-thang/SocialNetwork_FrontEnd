import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import OnlineUsers from './OnlineUsers'

const Posts = ({ getPosts, post: { posts, loading } }) => {

    useEffect(() => {
        getPosts();
        console.log('Posts useEffect')
    }, [getPosts]);

    return loading ? (
        <Spinner />
    ) : (
            <div className="posts-page">
                <div className="posts">
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <PostForm />
                    <br />
                    <div>
                        {posts.map(post => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                </div>
                <div className="online-user">
                    <OnlineUsers />
                </div>
            </div>
        )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts)
