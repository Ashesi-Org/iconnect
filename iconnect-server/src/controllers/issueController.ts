import { Request, Response } from "express";
import * as issueService from "../services/issueService";
import { logger } from "../config/logger";
import * as notificationService from "../services/notificationService";

const handleServiceError = (
  res: Response,
  error: any,
  errorMessage: string
) => {
  logger.error(`Error in issue controller: ${errorMessage}`, error);
  res.status(500).json({ error: "Internal Server Error" });
};

// Controller function to handle getting an issue by ID
const getIssueById = async (req: Request, res: Response): Promise<void> => {
  const { issueId } = req.params;

  try {
    const parsedIssueId = parseInt(issueId, 10);
    const issue = await issueService.getIssueById(parsedIssueId);

    if (!issue) {
      res.status(404).json({ message: "Issue not found" });
      return;
    }

    res.status(200).json({ issue });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch issue by ID" });
  }
};

const getIssuesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    logger.info(`Retrieving issues by user: ${userId}`);
    const issues = await issueService.getIssuesByUserWithDetails(
      Number(userId)
    );
    res.status(200).json(issues);
  } catch (error) {
    handleServiceError(res, error, "Failed to retrieve issues by user");
  }
};

const getIssuesByDepartment = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const issues = await issueService.getIssuesByDepartmentWithDetails(
      Number(userId)
    );
    res.status(200).json(issues);
  } catch (error) {
    handleServiceError(res, error, "Failed to retrieve issues by department");
  }
};

const createIssue = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      category_id,
      title,
      anonymous,
      description,
      attachment_url,
      status,
      priority,
      location,
    } = req.body;
    const newIssue = await issueService.createIssue({
      user_id,
      category_id,
      description,
      title,
      status,
      priority,
      anonymous,
      attachment_url,
      assignmentStatus: "",
      location,
    });
    res.status(201).json({ success: true, newIssue });
  } catch (error) {
    handleServiceError(res, error, "Failed to create an issue");
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { issueId } = req.params;
    await issueService.deleteIssue(Number(issueId));
    res
      .status(200)
      .json({
        success: true,
        message: `Issue ${issueId} deleted successfully`,
      });
  } catch (error) {
    handleServiceError(res, error, "Failed to delete an issue");
    res
      .status(500)
      .json({ success: false, message: "Failed to delete an issue" });
  }
};

const updateIssueController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const issueId = parseInt(req.params.issue_id, 10);
  const { title, description, priority } = req.body;
  try {
    const updatedIssue = await issueService.updateIssue(issueId, {
      title,
      description,
      priority,
    });
    if (updatedIssue) {
      logger.info("creating a notification for the status update");
      notificationService.notifyUser(
        updatedIssue.user_id,
        "update",
        `Issue ${issueId} updated recently tap to view}`,
        issueId
      );
      res.status(200).json({ success: true, updatedIssue });
    } else {
      res.status(404).json({ success: false, message: "Issue not found" });
    }
  } catch (error) {
    logger.error("Error updating issue:", error);
    res.status(500).json({ success: false, message: "Failed to update issue" });
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
      logger.info("creating a notification for the status update");
      notificationService.notifyUser(
        updatedIssue.user_id,
        "status",
        `Issue ${issueId} status changed tap to view: ${status}`,
        issueId
      );
      res.status(200).json({ success: true, updatedIssue });
    } else {
      res.status(404).json({ success: false, message: "Issue not found" });
    }
  } catch (error) {
    logger.error("Error updating issue:", error);
    res.status(500).json({ success: false, message: "Failed to update issue" });
  }
};

const getRessolverAssignments = async (req: Request, res: Response) => {
  try {
    const resolverId = req.params.resolverId;
    const assignments = await issueService.getRessolverAssignments(
      Number(resolverId)
    );
    res.status(200).json(assignments);
  } catch {
    logger.info("Failed to get resolver assignments");
    res
      .status(500)
      .json({ success: false, message: "Failed to get resolver assignments" });
  }
};
const assignIssueToResolver = async (req: Request, res: Response) => {
  try {
    const { issueId, resolverId } = req.body;

    await issueService.assignIssueToResolver(issueId, resolverId);

    // Send a notification to the resolver
    notificationService.notifyUser(
      resolverId,
      "status",
      `Issue ${issueId} has been assigned to you`,
      issueId
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Issue assigned to resolver successfully",
      });
  } catch (error: any) {
    logger.error("Error in assigning issue to resolver:", error.message);
    res
      .status(500)
      .json({ error: "true", meesage: "Failed to assign issue to resolver" });
  }
};

const getAssignedOrNotAssignedIssues = async (req: Request, res: Response) => {
  try {
    const assignedParam = req.query.assigned as string; // Retrieve as string

    // Check if the parameter exists and is either 'true' or 'false'
    if (
      assignedParam === undefined ||
      (assignedParam !== "true" && assignedParam !== "false")
    ) {
      const issues = await issueService.getAllIssues();

      return res.status(200).json(issues);
    }

    const assigned = assignedParam === "true"; // Convert string to boolean
    const issues = await issueService.getAssignedOrNotAssignedIssues(assigned);

    res.status(200).json(issues);
  } catch (error: any) {
    logger.error(
      "Error in retrieving assigned or not assigned issues:",
      error.message
    );
    res.status(500).json({ error: "Failed to retrieve issues" });
  }
};

export {
  getIssueById,
  getIssuesByUser,
  getRessolverAssignments,
  getIssuesByDepartment,
  createIssue,
  deleteIssue,
  updateIssueController,
  updateIssueStatus,
  assignIssueToResolver,
  getAssignedOrNotAssignedIssues,
};
