type User = {
  user_id: string;
  google_id?: string,
  microsft_id?:string,
  avatarUrl: string;
  role: 'student' | 'administrator' | 'developer';
  email: string;
  password: string;
  name: string;
  unique_id: string;
  currentRoomId: string;
  displayName: string;
  language: 'english' | 'french';
  created_at: string; // Timestamp in ISO format
  updated_at: string; // Timestamp in ISO format
};

// Category Type
type Category = {
  category_id: number;
  name: string;
  created_at: string; // Timestamp in ISO format
  updated_at: string; // Timestamp in ISO format
};

// Issue Type
type Issue = {
  issue_id?: number;
  user_id: number;
  category_id: number | null;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed' |  'resolved';
  priority: 'high' | 'medium' | 'low';
  anonymous: boolean;
  assignmentStatus:string,
  attachment_url: string | null;
  created_at?: string; // Timestamp in ISO format
  updated_at?: string; // Timestamp in ISO format

};

// Comment Type
type CommentType = {
  comment_id: number;
  issue_id: number;
  user_id: number | null;
  comment_text: string;
  created_at: string; // Timestamp in ISO format
};

// Attachment Type
type Attachment = {
  attachment_id: number;
  issue_id: number;
  attachment_url: string;
  created_at: string; // Timestamp in ISO format
};

// Notification Type
type NotificationType = {
  notification_id: number;
  user_id: number;
  issue_id: number | null;
  message: string;
  status: 'unread' | 'read';
  created_at: string; // Timestamp in ISO format
  updated_at: string; // Timestamp in ISO format
};

export { User, Category, Issue, CommentType, Attachment, NotificationType };
