import { Request, Response } from 'express'; // Assuming you're using Express or a similar framework
import { createComment, getCommentsByIssueId } from '../services/commentService';
import { logger } from '../config/logger';
// Controller function to create a new comment
export const createCommentController = async (req: Request, res: Response): Promise<void> => {
  const { issue_id, user_id, comment_text } = req.body; 

  try {
    const newComment = await createComment({ issue_id, user_id, comment_text });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    logger.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment' });
  }
};

// Controller function to get comments by issue ID
export const getCommentsByIssueIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { issueId } = req.params; 

    const comments = await getCommentsByIssueId(Number(issueId));

   
    res.status(200).json({ success: true, comments });
  } catch (error) {
    // Handle any errors that occur during comment retrieval
    logger.error('Error getting comments by issue ID:', error);
    res.status(500).json({ success: false, message: 'Failed to get comments' });
  }
};
