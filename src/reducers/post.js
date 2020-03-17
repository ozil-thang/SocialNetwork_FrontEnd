import { GET_POSTS, POST_ERROR, UPDATE_LIKE, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';

const initialState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case UPDATE_LIKE:
            {
                if (payload.isLike === true) {
                    console.log('like reducer')
                    console.log(payload)
                    return {
                        ...state,
                        loading: false,
                        posts: state.posts.map(post => post.id === payload.postId ? { ...post, likesCount: payload.count, isLike: true } : post),
                        post: (state.post != null && state.post.id === payload.postId) ? { ...state.post, likesCount: payload.count, isLike: true } : state.post
                    }
                }
                if (payload.isLike === false) {
                    console.log('unlike reducer')
                    console.log(payload)
                    return {
                        ...state,
                        loading: false,
                        posts: state.posts.map(post => post.id === payload.postId ? { ...post, likesCount: payload.count, isLike: false } : post),
                        post: (state.post != null && state.post.id === payload.postId) ? { ...state.post, likesCount: payload.count, isLike: false } : state.post
                    }
                }
                console.log('normal reducer')
                console.log(payload)
                return {
                    ...state,
                    loading: false,
                    posts: state.posts.map(post => post.id === payload.postId ? { ...post, likesCount: payload.count } : post),
                    post: (state.post != null && state.post.id === payload.postId) ? { ...state.post, likesCount: payload.count } : state.post
                }
            }


        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => post.id === payload.postId ? { ...post, commentsCount: payload.count } : post),
                post: state.post == null ? state.post : { ...state.post, comments: [payload.commentDto, ...state.post.comments] },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => post.id === payload.postId ? { ...post, commentsCount: payload.count } : post),
                post: state.post == null ? state.post : { ...state.post, comments: state.post.comments.filter(c => c.id !== payload.commentDto.id) },
                loading: false
            };
        default:
            return state
    }
}
