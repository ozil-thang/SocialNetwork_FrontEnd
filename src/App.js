import React, { Fragment, Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/route/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post'
import { HubConnectionBuilder } from '@aspnet/signalr'
import { ADD_COMMENT, REMOVE_COMMENT } from './actions/types'

export default class App extends Component {

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    await store.dispatch(loadUser());
    console.log('App componentdidmount')

    const state = store.getState();
    console.log('state', state)

    const likeHubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/likeHub").build();
    likeHubConnection.start().then(() => console.log('LikeHub connection started'))
      .catch(err => console.log(err));

    likeHubConnection.on("updateLike", (count, userId, type, postId) => {
      console.log('like hub connection call')

      let isLike = undefined;
      if (state.auth.user.id === userId) {
        if (type === "Like") {
          isLike = true;
        }
        if (type === "UnLike") {
          isLike = false;
        }
      }

      store.dispatch({
        type: "UPDATE_LIKE",
        payload: { postId, count, isLike }
      })

    })

    const commentHubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/commentHub").build();
    commentHubConnection.start().then(() => console.log('CommentHub connection started'))
      .catch(err => console.log(err))

    commentHubConnection.on("updateComment", (commentDto, count, postId, type) => {

      if(type === 'add'){
        store.dispatch({
          type: ADD_COMMENT,
          payload: { postId, commentDto, count }
        });
      }
      else{
        store.dispatch({
          type: REMOVE_COMMENT,
          payload: {postId, commentDto, count}
        })
      }
      
    })

  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/posts/:id' component={Post} />
                <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path="/profiles" component={Profiles} />
                <Route exact path="/profiles/:id" component={Profile} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
    )
  }
}