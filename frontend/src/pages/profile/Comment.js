import React from 'react';

const Comment = React.memo(({ comment, reactionCounts, userReactions, onReactionClick }) => {
    return (
        <div className="comment">
            <p>{comment.text}</p>
            <div>
                {['like', 'love', 'laugh'].map((reaction) => (
                    <button
                        key={reaction}
                        onClick={() => onReactionClick(comment._id, reaction)}
                    >
                        {reaction} {reactionCounts[comment._id]?.[reaction] || 0}
                    </button>
                ))}
            </div>
        </div>
    );
});

export default Comment;
