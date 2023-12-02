// Import notification service
import { errorHandler } from '../middleware/errorHandler';
import * as notificationService from '../services/notificationService';

// ...

const createIssueNotification = async (category_id: number, newIssueId: any) => {
  try {
    // Notify admin for the created category
    await notificationService.notifyAdminForCategory(category_id, `New issue created with ID ${newIssueId}`, newIssueId);
  } catch (error) {
    
  }
};


const updateIssueStatusNotification = async (userId:number, issueId: number, status: any): Promise<void> => {
 
  try {
    if (issueId && status) {

      // Notify the user/admin about the status update
      await notificationService.notifyUser(userId, 'status' ,`Issue ${issueId} status updated: ${status}`, issueId);
      

    } else {
     
    }
  } catch (error) {
    console.error('Error in notification controller:', error);
  }
};


export {
  createIssueNotification,
  updateIssueStatusNotification
}
