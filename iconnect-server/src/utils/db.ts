import { logger } from '../config/logger';
import { pool } from '../config/psql';
import { Issue } from '../types';

// Function for querying
const query = async (text: string, params: any[] = []) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  logger.info('Query executed in', duration, 'ms');
  return res;
};


// utility function for grouping comments, attachments by issue
const processIssueDetails = (rows: any[]): Issue[] => {
  const groupedComments: { [key: number]: any[] } = {};
  const groupedAttachments: { [key: number]: any[] } = {};

  rows.forEach((row: any) => {
    const issueId = row.issue_id;

    if (!groupedComments[issueId]) {
      groupedComments[issueId] = [];
    }
    if (row.comment_id) {
      groupedComments[issueId].push({
        comment_id: row.comment_id,
        user_id: row.user_id,
        comment_text: row.comment_text,
        created_at: row.comment_created_at,
      });
    }

    if (!groupedAttachments[issueId]) {
      groupedAttachments[issueId] = [];
    }
    if (row.attachment_id) {
      groupedAttachments[issueId].push({
        attachment_id: row.attachment_id,
        attachment_url: row.attachment_url,
        created_at: row.attachment_created_at,
      });
    }
  });

  // Map to Issue objects with related comments and attachments
  const issuesWithDetails: Issue[] = rows.map((row: any) => ({
    issue_id: row.issueid,
    user_id: row.userid,
    category_id: row.category_id,
    title:row.title,
    description: row.description,
    status: row.status,
    priority: row.priority,
    anonymous: row.anonymous,
    attachment_url: row.attachment_url,
    created_at: row.issue_created_at,
    updated_at: row.issue_updated_at,
    assignmentStatus: row.assignment_status,
    category: {
      category_id: row.category_id,
      name: row.category_name,
      created_at: row.category_created_at,
      updated_at: row.category_updated_at,
    },
    comments: groupedComments[row.issue_id] || [],
    attachments: groupedAttachments[row.issue_id] || [],
  }));

  return issuesWithDetails;
};


export { query, processIssueDetails };
