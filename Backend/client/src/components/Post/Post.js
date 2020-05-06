import React, { Fragment, useEffect, useState } from 'react';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import { Link } from 'react-router-dom';
import PostComments from './PostComments/PostComments';

const Post = (props) => {
    const { post, getPost } = props;
    
    useEffect(() => {
        getPost(props.match.params.post_id);
    }, [getPost]);
    
    const [ commentText, setCommentText ] = useState('');

    const onChangeHandler = (e) => {
        setCommentText(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.addComment(commentText, post._id);
        setCommentText('');
    }

    return props.loading || props.post === null ? <Spinner /> : <Fragment>
        <Link to="/posts" className="btn">Back To Posts</Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src={post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={commentText}
            onChange={onChangeHandler}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {
      props.post.comments.length === 0 ? null : <PostComments post={props.post} authUserId={props.authUserId} />      
      }
    </Fragment>
}

const mapStateToProps = state => {
    return {
        post: state.post.post,
        loading: state.post.loading,
        authUserId: state.auth.user._id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: (id) => dispatch(actions.getSinglePost(id)),
        addComment: (commentText, post_id) => dispatch(actions.addComment(commentText, post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);