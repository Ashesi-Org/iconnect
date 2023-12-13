// Sample Issue Details
export const issueDetails = {
  title: 'Sample Issue Title',
  created_at: '2023-11-30T10:00:00Z',
  status: 'Open',
  comments: [
    {
      comment_id: 1,
      comment_user_id: 'User1',
      comment_created_at: '2023-11-30T10:30:00Z',
      comment_text: 'This is a sample comment for testing.',
    },
    {
      comment_id: 2,
      comment_user_id: 'User2',
      comment_created_at: '2023-11-30T11:00:00Z',
      comment_text: 'Another sample comment here.',
    },

     {
      comment_id: 3,
      comment_user_id: 'User1',
      comment_created_at: '2023-11-30T10:30:00Z',
      comment_text: 'This is a sample comment for testing.',
    },
    {
      comment_id: 4,
      comment_user_id: 'User2',
      comment_created_at: '2023-11-30T11:00:00Z',
      comment_text: 'Another sample comment here.',
    },
  ],
};

// Sample Assignees Data
export const assignees = [
  { user_id: 1, display_name: 'John Doe', email: 'john@example.com' },
  { user_id: 2, display_name: 'Alice Smith', email: 'alice@example.com' },
];

// Sample Available Resolvers
export const availableResolvers = [
  { user_id: 3, display_name: 'Bob Johnson', email: 'bob@example.com' },
  { user_id: 4, display_name: 'Emma Brown', email: 'emma@example.com' },
];

