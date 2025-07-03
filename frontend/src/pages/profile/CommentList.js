import React from 'react';
import Comment from './Comment'; // Import the new Comment component

const CommentsList = ({ comments, userReactions, reactionCounts, handleReactionClick }) => {
    return (
        <div>
            {comments.map((comment, index) => (
                <Comment
                    key={comment._id}
                    comment={comment}
                    reactionCounts={reactionCounts}
                    userReactions={userReactions}
                    onReactionClick={handleReactionClick}
                />
            ))}
        </div>
    );
};
export default CommentsList;