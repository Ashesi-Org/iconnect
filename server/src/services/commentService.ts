import { query } from "../utils/db";
import * as notificationService from "./notificationService";

interface Comment {
  issue_id: number;
  user_id: number;
  comment_text: string;
}

const createComment = async (comment: Comment): Promise<Comment> => {
  const { issue_id, user_id, comment_text } = comment;

  const createCommentText = `
    INSERT INTO comments (issue_id, user_id, comment_text)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const createCommentParams = [issue_id, user_id, comment_text];

  if (!issue_id || !user_id || !comment_text) {
    throw new Error('Missing required parameters');
  }

  try {
    const createdComment = await query(createCommentText, createCommentParams);
    const notificationReceiver = await query('SELECT user_id FROM issues WHERE issue_id = $1', [issue_id]);
    notificationService.notifyUser(notificationReceiver.rows[0].user_id, 'comment', `New comment added to issue ${issue_id}`, issue_id);
    return createdComment.rows[0];
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('Failed to create comment');
  }
};

const getCommentsByIssueId = async (issueId: number): Promise<Comment[]> => {
  const getCommentsText = `
    SELECT *
    FROM comments
    WHERE issue_id = $1`;

  const getCommentsParams = [issueId];

  try {
    const commentsResult = await query(getCommentsText, getCommentsParams);
    return commentsResult.rows;
  } catch (error) {
    console.error('Error getting comments by issue ID:', error);
    throw new Error('Failed to get comments by issue ID');
  }
};

export { createComment, getCommentsByIssueId };
