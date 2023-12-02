import { Request, Response } from 'express';
import * as issueService from '../services/issueService';
import { logger } from '../config/logger';
import * as notificationService from '../services/notificationService';

const handleServiceError = (res: Response, error: any, errorMessage: string) => {
  console.error(`Error in issue controller: ${errorMessage}`, error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Controller function to handle getting an issue by ID
const getIssueById = async (req: Request, res: Response): Promise<void> => {
  const { issueId } = req.params;

  try {
    const parsedIssueId = parseInt(issueId, 10);
    const issue = await issueService.getIssueById(parsedIssueId);

    if (!issue) {
      res.status(404).json({ message: 'Issue not found' });
      return;
    }

    res.status(200).json({ issue });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch issue by ID' });
  }
};


const getIssuesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    logger.info(`Retrieving issues by user: ${userId}`);
    const issues = await issueService.getIssuesByUserWithDetails(Number(userId));
    res.status(200).json(issues);
  } catch (error) {
    handleServiceError(res, error, 'Failed to retrieve issues by user');
  }
};

const getIssuesByDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.params;
    const issues = await issueService.getIssuesByDepartmentWithDetails(Number(departmentId));
    res.status(200).json(issues);
  } catch (error) {
    handleServiceError(res, error, 'Failed to retrieve issues by department');
  }
};


const createIssue = async (req: Request, res: Response) => {
  try {
    const { user_id, category_id, title, anonymous,  description, attachment_url, status, priority } = req.body;
    const newIssue = await issueService.createIssue(
      {
        user_id, category_id, description, title, status, priority, anonymous, attachment_url,
        assignmentStatus: ''
      }
    );
    res.status(201).json({success:true , newIssue});
  } catch (error) {
    handleServiceError(res, error, 'Failed to create an issue');
  }
};


const deleteIssue = async (req: Request, res: Response) => {

  try {
    const { issueId } = req.params;
    await issueService.deleteIssue(Number(issueId));
    res.status(200).json({ success: true, message:`Issue ${issueId} deleted successfully` });
  } catch (error) {
    handleServiceError(res, error, 'Failed to delete an issue');  
    res.status(500).json({ success: false, message: 'Failed to delete an issue' });
  }

}

 const updateIssueController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const issueId = parseInt(req.params.issue_id, 10); 
  const { title, description, priority } = req.body;
  try {
    const updatedIssue = await issueService.updateIssue(issueId, { title, description, priority});
    if (updatedIssue) {
      console.log("creating a notification for the status update")
      notificationService.notifyUser(
        updatedIssue.user_id,
        'update',
        `Issue ${issueId} updated recently tap to view}`,
        issueId
      );
      res.status(200).json({ success: true, updatedIssue });
    } else {
      res.status(404).json({ success: false, message: 'Issue not found' });
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ success: false, message: 'Failed to update issue' });
  }
};


const updateIssueStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const issueId = parseInt(req.params.issue_id, 10);
  const { status } = req.body;

  try {
    const updatedIssue = await issueService.updateIssueStatus(issueId, status);

    if (updatedIssue) {
      console.log("creating a notification for the status update")
      notificationService.notifyUser(
        updatedIssue.user_id,
        'status',
        `Issue ${issueId} status changed tap to view: ${status}`,
        issueId
      );
      res.status(200).json({ success: true, updatedIssue });
    } else {
      res.status(404).json({ success: false, message: 'Issue not found' });
    }
  } catch (error) {
    console.error('Error updating issue:', error);
    res.status(500).json({ success: false, message: 'Failed to update issue' });
  }
};


const assignIssueToResolver = async (req: Request, res: Response) => {
  try {
    const { issueId, resolverId } = req.body; // Assuming 'issueId' and 'resolverId' are part of the request body

    await issueService.assignIssueToResolver(issueId, resolverId);

    // Send a notification to the resolver
    notificationService.notifyUser(
      resolverId, "status", `Issue ${issueId} has been assigned to you`,issueId 
    )

    res.status(200).json({ success: true, message: 'Issue assigned to resolver successfully' });
  } catch (error:any) {
    console.error('Error in assigning issue to resolver:', error.message);
    res.status(500).json({error:"true", meesage: 'Failed to assign issue to resolver' });
  }
};

const getAssignedOrNotAssignedIssues = async (req: Request, res: Response) => {
  try {
    const { assigned } = req.query; //true or false

    if (assigned === undefined || (assigned !== 'true' && assigned !== 'false')) {
      return res.status(400).json({ error: 'Invalid query parameter for assigned. Use true or false.' });
    }

    const issues = await issueService.getAssignedOrNotAssignedIssues(assigned === 'true');

    res.status(200).json(issues);
  } catch (error:any) {
    console.error('Error in retrieving assigned or not assigned issues:', error.message);
    res.status(500).json({ error: 'Failed to retrieve issues' });
  }
};

export {getIssueById, getIssuesByUser, getIssuesByDepartment, createIssue, deleteIssue, updateIssueController, updateIssueStatus,assignIssueToResolver, getAssignedOrNotAssignedIssues};


