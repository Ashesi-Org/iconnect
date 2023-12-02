-- Drop the database if it exists
DROP DATABASE IF EXISTS ashesiiconnect;

-- Creating the Database
CREATE DATABASE ashesiiconnect;

-- Connect to the Database
\c ashesiiconnect;

-- Creating Categories Table
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Creating user_data Table
CREATE TABLE user_data (
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(50) CHECK (role IN ('student', 'administrator', 'developer')),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    unique_id VARCHAR(50),
    language VARCHAR(20) CHECK (language IN ('english', 'french')),
    avatar_url VARCHAR(255),
    display_name VARCHAR(100),
    user_name VARCHAR(100),
    current_room_id INTEGER REFERENCES room_info(room_id) ON DELETE CASCADE,
    google_id VARCHAR(50),
    last_seen TIMESTAMPTZ,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Creating auth_provider Table
CREATE TABLE auth_provider (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_data(user_id) ON DELETE CASCADE,
    google_id VARCHAR(255) UNIQUE NOT NULL
);

-- Creating RoomInfo Table with a Singular Reference to Categories Table by category_id
CREATE TABLE room_info (
    room_id SERIAL PRIMARY KEY,
    room_desc VARCHAR(255) NOT NULL,
    creator_id INTEGER REFERENCES user_data(user_id) ON DELETE CASCADE,
    is_private BOOLEAN NOT NULL,
    auto_speaker BOOLEAN NOT NULL,
    chat_enabled BOOLEAN NOT NULL,
    ended BOOLEAN DEFAULT false,
    hand_raise_enabled BOOLEAN NOT NULL,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Creating Issues Table
CREATE TABLE issues (
    issue_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_data(user_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
-- Altering the Issues Table to Add Anonymous Functionality
ALTER TABLE issues
ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE;
ALTER TABLE issues
ADD COLUMN is_anonymous BOOLEAN DEFAULT FALSE;


ALTER TABLE issues 
ADD COLUMN attachment_url TEXT;
-- Creating Comments Table
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    issue_id INTEGER REFERENCES issues(issue_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES user_data(user_id) ON DELETE SET NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Creating Attachments Table
CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,
    issue_id INTEGER REFERENCES issues(issue_id) ON DELETE CASCADE,
    attachment_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Creating Notifications Table


-- Creating a table for user-level responsibilities
CREATE TABLE issue_resolvers (
    resolver_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_data(user_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    UNIQUE (user_id, category_id)
);
select * from issue_resolvers

-- Creating a Table to Link Issue Resolvers with Assigned Issues
CREATE TABLE assigned_issues (
    assignment_id SERIAL PRIMARY KEY,
    issue_id INTEGER REFERENCES issues(issue_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    due_at TIMESTAMPTZ DEFAULT calculate_due_date(),
    assigned_resolver_id INTEGER REFERENCES issue_resolvers(resolver_id) ON DELETE CASCADE,
    UNIQUE (issue_id, assigned_resolver_id)
);

-- Creating a Function to Calculate Due Date
CREATE OR REPLACE FUNCTION calculate_due_date()
RETURNS TIMESTAMPTZ AS $$
BEGIN
    RETURN CURRENT_TIMESTAMP + INTERVAL '1 week';
END;
$$ LANGUAGE plpgsql;


ALTER TABLE assigned_issues
ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

-- Creating Notifications Table

CREATE TABLE notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_data(user_id) ON DELETE CASCADE,
    issue_id INTEGER REFERENCES issues(issue_id) ON DELETE SET NULL,
    notifiction_type VARCHAR(50) NOT NULL CHECK (notifiction_type IN ('status', 'comment', 'attachment', 'ban', 'admin')),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('unread', 'read')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

select * from issues

-- Indexing for Performance Optimization
CREATE INDEX idx_user_email ON user_data(email);
CREATE INDEX idx_issue_user ON issues(user_id);
CREATE INDEX idx_issue_category ON issues(category_id);
CREATE INDEX idx_comment_issue ON comments(issue_id);
CREATE INDEX idx_attachment_issue ON attachments(issue_id);
CREATE INDEX idx_notification_user ON notifications(user_id);
CREATE INDEX idx_notification_issue ON notifications(issue_id);
CREATE INDEX idx_issue_resolvers_user_id ON issue_resolvers(user_id);
CREATE INDEX idx_issue_resolvers_category_id ON issue_resolvers(category_id);


-- Creating RoomInfo_Category Relation Table
CREATE TABLE room_info_category (
    room_id INTEGER REFERENCES room_info(room_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (room_id, category_id)
);


CREATE TABLE IF NOT EXISTS room_ban (
    ban_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    ban_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room_info(room_id), -- Replace 'room_info' with actual room table
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)  -- Replace 'user_data' with actual user table
);


CREATE TABLE IF NOT EXISTS room_status (
    status_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    is_speaker BOOLEAN NOT NULL,
    is_mod BOOLEAN NOT NULL,
    raised_hand BOOLEAN NOT NULL,
    is_muted BOOLEAN NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room_info(room_id), -- Replace 'room_info' with actual room table
    FOREIGN KEY (user_id) REFERENCES user_data(user_id)  -- Replace 'user_data' with actual user table
);

CREATE TABLE IF NOT EXISTS user_follows (
    follow_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    is_following INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id), -- Replace 'user_data' with the actual user table
    FOREIGN KEY (is_following) REFERENCES user_data(user_id) -- Replace 'user_data' with the actual user table
);

CREATE TABLE user_notification (
    notification_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    category VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user_data(user_id),
    FOREIGN KEY (room_id) REFERENCES room_info(room_id)
);

SELECT * FROM user_data; SELECT * FROM notifications; ALTER TABLE room_info ADD COLUMN ended BOOLEAN DEFAULT false
-- Additional Optimizations
ANALYZE;
VACUUM ANALYZE;





INSERT INTO comments (issue_id, user_id, comment_text, created_at)
VALUES
  (1, 36, 'Scheduled maintenance planned next week.', CURRENT_TIMESTAMP),
  (2, 36, 'IT team notified about the WiFi issue.', CURRENT_TIMESTAMP),
  (3, 36, 'Replacement chairs ordered.', CURRENT_TIMESTAMP),
  (4, 37, 'Plumber assigned to fix the issue.', CURRENT_TIMESTAMP),
  (5, 37, 'Electricity restored in Block B.', CURRENT_TIMESTAMP),

  (11, 1, 'Paving contractors contacted.', CURRENT_TIMESTAMP),
  (12, 1, 'Request forwarded to admin for consideration.', CURRENT_TIMESTAMP),
  (13, 2, 'New lighting fixtures installed.', CURRENT_TIMESTAMP),
  (14, 2, 'Gym equipment serviced and repaired.', CURRENT_TIMESTAMP);
  -- ... Add more comments for issues 11 to 20
;


INSERT INTO comments (issue_id, user_id, comment_text, created_at)
VALUES
  -- Comments for issues with IDs 1 to 10
  (6, 1, 'Campus security notified about the broken gate.', CURRENT_TIMESTAMP),
  (7, 2, 'Submitted a request for additional parking space.', CURRENT_TIMESTAMP),
  (8, 2, 'Library staff working on extending opening hours.', CURRENT_TIMESTAMP),
  (9, 37, 'Scheduled a meeting to discuss the issue with course schedules.', CURRENT_TIMESTAMP),
  (10, 1, 'Technical team investigating server downtime.', CURRENT_TIMESTAMP),
  -- ... Add more comments for issues 1 to 10

  -- Comments for issues with IDs 11 to 20
  (11, 2, 'IT department addressing internet connectivity in labs.', CURRENT_TIMESTAMP),
  (12, 36, 'Cleaning staff assigned to clear the clogged drains.', CURRENT_TIMESTAMP),
  (13, 37, 'Maintenance team fixing the broken windows.', CURRENT_TIMESTAMP),
  (14, 36, 'Resolved the issue with the faulty projectors in lecture halls.', CURRENT_TIMESTAMP);
  -- ... Add more comments for issues 11 to 20
;



INSERT INTO notifications (user_id, issue_id, notifiction_type, message, status) 
VALUES 
    (2, 10, 'status', 'Issue status updated to resolved', 'unread'),
    (2, 12, 'comment', 'New comment added to Issue #12', 'unread'),
    (2, 20, 'attachment', 'Attachment added to Issue #20', 'unread'),
    (2, 25, 'ban', 'You have been temporarily banned', 'unread'),
    (2, 47, 'admin', 'Important announcement from admin', 'unread'),
    (2, 15, 'status', 'Issue #15 status changed to in progress', 'unread'),
    (2, 28, 'comment', 'Reply to your comment on Issue #28', 'unread'),
    (2, NULL, 'admin', 'System update scheduled for maintenance', 'unread'),
    (2, 19, 'attachment', 'New file attached to Issue #22', 'unread'),
    (2, 30, 'status', 'Issue #30 status changed to closed', 'unread');



