-- Active: 1706277702110@@0.0.0.0@3306@project_checkin1#CheckinQuestions
-- Start transaction to ensure atomicity
START TRANSACTION;
-- Create the database if it doesn't exist and then use it
CREATE DATABASE IF NOT EXISTS project_checkin1;
USE project_checkin1;
-- Table for teams
CREATE TABLE IF NOT EXISTS Teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    team_code VARCHAR(10) UNIQUE NOT NULL
);
-- Table for team members
CREATE TABLE IF NOT EXISTS TeamMembers (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE CASCADE
);
-- Table for check-in questions
CREATE TABLE IF NOT EXISTS CheckinQuestions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    question_text VARCHAR(255) NOT NULL,
    frequency ENUM('daily', 'weekly', 'biweekly', 'monthly') NOT NULL,
    next_due_date TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE CASCADE
);
-- Table for responses to check-in questions
CREATE TABLE IF NOT EXISTS CheckinResponses (
    response_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    member_id INT,
    response_text TEXT,
    response_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES CheckinQuestions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES TeamMembers(member_id) ON DELETE CASCADE
);
-- Insert sample data into Teams
INSERT INTO Teams (team_name, team_code) VALUES
('Team A', 'ABC123'),
('Team B', 'DEF456'),
('Team C', 'GHI789');
-- Insert sample data into TeamMembers
INSERT INTO TeamMembers (team_id, first_name, last_name) VALUES
(1, 'John', 'Doe'),
(1, 'Jane', 'Smith'),
(2, 'Alice', 'Johnson'),
(2, 'Bob', 'Williams'),
(3, 'Emily', 'Brown');
-- Insert sample data into CheckinQuestions
INSERT INTO CheckinQuestions (team_id, question_text, frequency, next_due_date) VALUES
(1, 'How do you feel today?', 'daily', NOW()),
(2, 'How did it go yesterday?', 'daily', NOW() + INTERVAL 1 DAY),
(3, 'What will you do today?', 'daily', NOW() + INTERVAL 2 DAY),
(1, 'Are you stuck on something?', 'weekly', NOW() + INTERVAL 7 DAY),
(2, 'Would you like to pair on something?', 'weekly', NOW() + INTERVAL 1 WEEK);
-- Insert sample data into CheckinResponses
INSERT INTO CheckinResponses (question_id, member_id, response_text) VALUES
(1, 1, 'Feeling good!!'),
(1, 2, 'Could be better.'),
(2, 3, 'Had a productive day yesterday.'),
(4, 5, 'Yes, I need help with a bug.'),
(5, 5, 'Sure, let’s pair on the new feature');

SELECT * FROM `CheckinResponses`;

-- Commit the transaction to apply changes
COMMIT;