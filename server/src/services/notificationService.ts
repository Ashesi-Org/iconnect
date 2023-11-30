// notificationService.ts
import { query } from '../utils/db';




const notifyUser = async (userId: number,notification_type: string, message: string, issueId: number) => {
  try {
    // Save notification details in the database
   
    const notification = await query(
      'INSERT INTO notifications (user_id, issue_id,notifiction_type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            , message, status) VALUES ($1, $2, $3, $4, $5) RETURNING notification_id',
      [userId, issueId,notification_type, message, 'unread']
    );

    // Logic to send in-app notification to user with ID `userId`
    // await sendInAppNotification(userId, message);

    // Logic to send email notification to user with ID `userId`
    // await sendEmailNotification(userId, message);

    console.log(`Notifying user ${userId}: ${message}`);
    return notification.rows[0].notification_id;
  } catch (error) {
    // Handle error if any operation fails
    console.error('Error notifying user:', error);
    throw new Error('Failed to notify user');
  }
};

const notifyAdminForCategory = async (categoryId: number, message: string, issueId: number) => {
  try {
    // Save notification details in the database
    const notification = await query(
      'INSERT INTO notifications (user_id, issue_id, message, status) VALUES ((SELECT admin_id FROM admin_data WHERE category_id = $1), $2, $3, $4) RETURNING notification_id',
      [categoryId, issueId, message, 'unread']
    );

    // Logic to send in-app notification to admin responsible for category `categoryId`
    // await sendInAppNotification(adminId, message);

    // Logic to send email notification to admin responsible for category `categoryId`
    // await sendEmailNotification(adminId, message);

    console.log(`Notifying admin for category ${categoryId}: ${message}`);
    return notification.rows[0].notification_id;
  } catch (error) {
    // Handle error if any operation fails
    console.error('Error notifying admin:', error);
    throw new Error('Failed to notify admin');
  }
};




const markNotificationAsRead = async (notificationId: number) => {
  try {
    // Update notification status to 'read' in the database
    await query(
      'UPDATE notifications SET status = $1 WHERE notification_id = $2',
      ['read', notificationId]
    );

    console.log(`Notification ${notificationId} marked as read`);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Failed to mark notification as read');
  }
};
export { notifyUser, notifyAdminForCategory, markNotificationAsRead};
