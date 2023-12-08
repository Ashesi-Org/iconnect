// notificationProviders.ts (example for in-app notifications using Firebase)

// import * as admin from 'firebase-admin';

// // Initialize Firebase Admin SDK (if not already initialized)
// // admin.initializeApp();

// const sendInAppNotification = async (userId: number, message: string) => {
//   // Add notification to Firebase for the user
//   const notificationRef = admin.database().ref(`notifications/${userId}`).push();
//   await notificationRef.set({ message, status: 'unread' });
// };

// export { sendInAppNotification };
