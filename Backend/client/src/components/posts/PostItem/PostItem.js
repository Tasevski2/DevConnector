import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions/index';

const PostItem = (props) => {
    const { post } = props;

    return <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${post.user}`}>
                <img
                    className="round-img"
                    src={`${post.avatar}`}
                    alt=""
                />
                <h4>{post.name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{post.text}</p>
            <p className="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
            </p>
            <button type="button" className="btn btn-light" onClick={() => props.likeAPost(post._id)}>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span>  {props.posts[props.index].likes.length}</span>
            </button>
            <button type="button" className="btn btn-light" onClick={() => props.unlikePost(post._id)}>
                <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-primary">
                Discussion <span className='comment-count'>{post.comments.length}</span>
            </Link>
            {
                props.post.user === props.authUserId && <button
                    onClick={() => props.deletePost(post._id)}
                    type="button"
                    className="btn btn-danger"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            }
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
         posts: state.post.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeAPost: (id,post_id) => dispatch(actions.likeAPost(id,post_id)),
        unlikePost: (post_id) => dispatch(actions.unlikePost(post_id)),
        deletePost: (post_id) => dispatch(actions.deletePost(post_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);