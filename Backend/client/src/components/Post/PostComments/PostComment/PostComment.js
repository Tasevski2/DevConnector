import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const PostComment = (props) => {
    const { comment } = props;

    return <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/profile/${comment.user}`}>
                <img
                    className="round-img"
                    src={comment.avatar}
                    alt=""
                />
                <h4>{comment.name}</h4>
            </Link>
        </div>
        <div>
            <p className="my-1">{comment.text}</p>
            <p className="post-date">
                Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
            </p>
            {
                comment.user === props.authUserId && <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => props.deleteComment(props.post_id, comment._id)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            }
        </div>

    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (post_id, comment_id) => dispatch(actions.deleteComment(post_id, comment_id))
    }
}

export default connect(null, mapDispatchToProps)(PostComment);