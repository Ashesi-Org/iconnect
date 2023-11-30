import { logger } from "../config/logger";
import { Issue } from "../types";
import { processIssueDetails, query } from "../utils/db";
import { getIssueQuery, getUserIssuesQueryUser } from "./queries";




const getIssueById = async (issueId: number): Promise<Issue | null> => {
  try {
    const result = await query(getIssueQuery, [issueId]);
    const issues = result.rows;
    return issues.length ? issues[0] : null;
  } catch (error) {
    console.error('Error retrieving issue by ID:', error);
    throw new Error('Failed to retrieve issue by ID');
  }
};


const getIssuesByUserWithDetails = async (userId: number): Promise<Issue[]> => {

  logger.info(`Retrieving issues by user: ${userId}`);

  try {
    const result = await query(getUserIssuesQueryUser, [userId]);
    return processIssueDetails(result.rows);
  } catch (error) {
    console.error('Error retrieving issues by user with details:', error);
    throw new Error('Failed to retrieve issues by user with details');
  }
};


const getIssuesByDepartmentWithDetails = async (departmentId: number): Promise<Issue[]> => {
  const queryText = `
    SELECT issues.*, categories.name AS category_name, comments.*, attachments.*,
      CASE
        WHEN issues.resolver_user_id IS NOT NULL THEN 'Assigned'
        ELSE 'Not Assigned'
      END AS assignment_status
    FROM issues
    LEFT JOIN categories ON issues.category_id = categories.category_id
    LEFT JOIN comments ON issues.issue_id = comments.issue_id
    LEFT JOIN attachments ON issues.issue_id = attachments.issue_id
    WHERE issues.category_id = $1`;

  const queryParams = [departmentId];

  try {
    const result = await query(queryText, queryParams);
    return processIssueDetails(result.rows);
  } catch (error) {
    console.error('Error retrieving issues by department with details:', error);
    throw new Error('Failed to retrieve issues by department with details');
  }
};


const getAssignedOrNotAssignedIssues = async (assigned: Boolean) => {
  let queryText = `
    SELECT issues.*, categories.name AS category_name, comments.*, attachments.*
    FROM issues
    LEFT JOIN categories ON issues.category_id = categories.category_id
    LEFT JOIN comments ON issues.issue_id = comments.issue_id
    LEFT JOIN attachments ON issues.issue_id = attachments.issue_id
  `;

  if (assigned) {
    queryText += 'WHERE issues.issue_id IN (SELECT issue_id FROM assigned_issues)';
  } else if (assigned === false) {
    queryText += 'WHERE issues.issue_id NOT IN (SELECT issue_id FROM assigned_issues)';
  }

  try {
    const result = await query(queryText);
    const issues = processIssueDetails(result.rows);
    return issues;
  } catch (error) {
    console.error('Error retrieving issues by assignment status:', error);
    throw new Error('Failed to retrieve issues by assignment status');
  }
};



const assignIssueToResolver = async (issueId: number, resolverId: number) => {
  const insertQuery = `
    INSERT INTO assigned_issues (issue_id, assigned_resolver_id)
    VALUES ($1, $2)
    ON CONFLICT (issue_id, assigned_resolver_id) DO UPDATE SET assigned_resolver_id = $2
  `;

  const queryParams = [issueId, resolverId];

  try {
    const result = await query(insertQuery, queryParams);
    return result.rows[0];
  } catch (error) {
    console.error('Error assigning issue to resolver:', error);
    throw new Error('Failed to assign issue to resolver');
  }
};



const createIssueWithAttachment = async (issueData: Issue, attachmentData: any): Promise<Issue> => {
  const { user_id, category_id, description, status, priority } = issueData;

  const createIssueText = `
    INSERT INTO issues (user_id, category_id, description, status, priority)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  const createIssueParams = [user_id, category_id, description, status, priority];
  const createAttachmentText = 'INSERT INTO attachments (issue_id, attachment_url) VALUES ($1, $2) RETURNING *';

  try {
    // Create the issue
    const createdIssue = await query(createIssueText, createIssueParams);

    // Create the attachment
    const issueId = createdIssue.rows[0].issue_id;
    const attachmentParams = [issueId, attachmentData.attachment_url];
    const createdAttachment = await query(createAttachmentText, attachmentParams);

    // Return the updated issue with attachment
    return {
      ...createdIssue.rows[0],
      attachments: [createdAttachment.rows[0]],
    };
  } catch (error) {
    console.error('Error creating issue with attachment:', error);
    throw new Error('Failed to create issue with attachment');
  }
};

// TODO: create issue without attachement

const createIssue = async (issueData: Issue): Promise<Issue> => {
  const { user_id, category_id, title, description, status, priority, anonymous, attachment_url } = issueData;
  const createIssueText = `
    INSERT INTO issues (user_id, category_id, title, description, status, priority, is_anonymous, attachment_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

  const createIssueParams = [user_id, category_id, title, description, status, priority, anonymous, attachment_url];

  try {
    // Create the issue
    const createdIssue = await query(createIssueText, createIssueParams);

    // Return the updated issue with attachment
    return {
      ...createdIssue.rows[0],
    };
  } catch (error) {
    console.error('Error creating issue :', error);
    throw new Error('Failed to create issue');
  }
};


const updateIssue = async (issueId: number, updatedIssueData: Partial<Issue>): Promise<Issue> => {
  // logic to update the existing issue in the database

  const updateIssueText = `
      UPDATE issues
      SET description = $1, title = $2, priority = $3
      WHERE issue_id = $4
      RETURNING *;

  `;
  const updateIssueParams = [
    updatedIssueData.description,
    updatedIssueData.title,
    updatedIssueData.priority,
    issueId
  ];

  try {
    const updatedIssue = await query(updateIssueText, updateIssueParams);
    return updatedIssue.rows[0];
  } catch (error) {
    console.error('Error updating issue:', error);
    throw new Error('Failed to update issue');
  }
};

const deleteIssue = async (issueId: number): Promise<void> => {
  // logic to delete the issue from the database
  const deleteIssueText = `
    DELETE FROM issues
    WHERE issue_id = $1`;
  const deleteIssueParams = [issueId];
  try {
    await query(deleteIssueText, deleteIssueParams);
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw new Error('Failed to delete issue');
  }
};


const updateIssueStatus = async (issueId: number, newStatus: string): Promise<Issue> => {
  logger.info(issueId)
  const updateStatusText = `
    UPDATE issues
    SET status = $1
    WHERE issue_id = $2
    RETURNING *`;

  const updateStatusParams = [newStatus, issueId];

  try {
    const updatedIssue = await query(updateStatusText, updateStatusParams);
    return updatedIssue.rows[0];
  } catch (error) {
    console.error('Error updating issue status:', error);
    throw new Error('Failed to update issue status');
  }
};


const updateIssuePriority = async (issueId: number, newPriority: string): Promise<Issue> => {
  //logic to update the priority of the issue in the database
  const updatePriorityText = `
    UPDATE issues
    SET priority = $1
    WHERE issue_id = $2
    RETURNING *`;

  const updatePriorityParams = [newPriority, issueId];

  try {
    const updatedIssue = await query(updatePriorityText, updatePriorityParams);
    return updatedIssue.rows[0];
  } catch (error) {
    console.error('Error updating issue priority:', error);
    throw new Error('Failed to update issue priority');
  }
};



export {
  updateIssue,
  deleteIssue,
  updateIssueStatus,
  updateIssuePriority,
  getIssuesByUserWithDetails,
  getIssuesByDepartmentWithDetails,
  getAssignedOrNotAssignedIssues,
  assignIssueToResolver,
  createIssueWithAttachment,
  createIssue,
  getIssueById,
};