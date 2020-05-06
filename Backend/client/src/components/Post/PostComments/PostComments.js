import React from 'react';
import PostComment from './PostComment/PostComment';

const PostComments = (props) => {
    return <div className="comments">
        {
            props.post.comments.map((comment, index) => <PostComment
                key={index}
                comment={comment}
                post_id={props.post._id}
                authUserId={props.authUserId}
            />)
        }
    </div>
}

export default PostComments;