-- Create the Database
CREATE DATABASE enlight_platform;
\c enlight_platform;

-- Create ExamType Table
CREATE TABLE ExamType (
    ExamTypeID SERIAL PRIMARY KEY,
    ExamTypeName VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Create Course Table
CREATE TABLE Course (
    CourseID VARCHAR(10) PRIMARY KEY,
    CourseName VARCHAR(255) NOT NULL,
    Description TEXT,
    ExamTypeID INT,
    FOREIGN KEY (ExamTypeID) REFERENCES ExamType(ExamTypeID)
);

-- A trigger to generate custom CourseID based on initials and a serial number
CREATE OR REPLACE FUNCTION generate_course_id()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.CourseID := CONCAT(UPPER(SUBSTRING(NEW.CourseName, 1, 2)), '_', nextval('course_sequence'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER course_before_insert
    BEFORE INSERT ON Course
    FOR EACH ROW
    EXECUTE FUNCTION generate_course_id();

-- Create Chapter Table
CREATE TABLE Chapter (
    ChapterID SERIAL PRIMARY KEY,
    ChapterName VARCHAR(255) NOT NULL,
    Description TEXT,
    CourseID VARCHAR(10),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);

-- Create Unit Table
CREATE TABLE Unit (
    UnitID SERIAL PRIMARY KEY,
    UnitName VARCHAR(255) NOT NULL,
    Description TEXT,
    ChapterID INT,
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID)
);

-- Create Video Table
CREATE TABLE Video (
    VideoID SERIAL PRIMARY KEY,
    VideoTitle VARCHAR(255) NOT NULL,
    URL VARCHAR(255) NOT NULL,
    ChapterID INT,
    UnitID INT,
    FOREIGN KEY (ChapterID) REFERENCES Chapter(ChapterID),
    FOREIGN KEY (UnitID) REFERENCES Unit(UnitID)
);

-- Create User Table
CREATE TABLE User (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

-- Create Role Table
CREATE TABLE Role (
    RoleID SERIAL PRIMARY KEY,
    RoleName VARCHAR(255) NOT NULL UNIQUE
);

-- Create Permission Table
CREATE TABLE Permission (
    PermissionID SERIAL PRIMARY KEY,
    PermissionName VARCHAR(255) NOT NULL UNIQUE
);

-- UserRole Table to represent many-to-many relationship between User and Role
CREATE TABLE UserRole (
    UserID INT,
    RoleID INT,
    PRIMARY KEY (UserID, RoleID),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

-- Table to represent many-to-many relationship between Role and Permission
CREATE TABLE RolePermission (
    RoleID INT,
    PermissionID INT,
    PRIMARY KEY (RoleID, PermissionID),
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID),
    FOREIGN KEY (PermissionID) REFERENCES Permission(PermissionID)
);

-- Timestamps for tracking
ALTER TABLE User ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE User ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE Role ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Role ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE Permission ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Permission ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Create a sequence for the CourseID trigger
CREATE SEQUENCE course_sequence START 1;

-- Commit the Changes
COMMIT;
