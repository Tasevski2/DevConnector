import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import PostItem from './PostItem/PostItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Posts = (props) => {
    const { getAllPosts } = props;

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts])

    const [postBody, setPostBody ] = useState('');

    const onChangeHandler = (e) => {
        setPostBody(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.createPost(postBody);
        setPostBody('');
    }

    return props.loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><FontAwesomeIcon icon={faUser}/> Welcome to the community!</p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={postBody}
            onChange={e => onChangeHandler(e)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      <div className="posts">
          {
              props.posts.length === 0 ? <p>No posts posted yet</p> : props.posts.map((post, index) => <PostItem 
                key={post._id}
                index={index}
                post={post}
                authUserId={props.authUserId}
              />)
          }
      </div>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        posts: state.post.posts,
        loading: state.post.loading,
        authUserId: state.auth.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllPosts: () => dispatch(actions.getAllPosts()),
        createPost: (text) => dispatch(actions.createPost(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);