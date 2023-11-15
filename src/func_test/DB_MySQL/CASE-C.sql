-- CASE - C (Test Popular Posts Sorting with Insertion of post with same number of votes)

-- Table: base_user
INSERT INTO base_user (base_user_id, user_email, is_email_verified, username, user_password, is_admin_user, is_deleted, created_at, updated_at)
VALUES
('1', 'grupo3@isep.ipp.pt', true, 'grupo3', '$2a$10$1McCRQ6mEEgjS6.Oc6Z/KOnhTRI5SoMfBB1LL5.4oOEK2QFpQ1Fbm', false, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Table: member
INSERT INTO member (member_id, member_base_id, reputation, created_at, updated_at)
VALUES
('1', '1', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Table: post
INSERT INTO post (post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at)
VALUES
('1', '1', 'text', 'CASE-C Post 1', 'CASE-C Post 1, 10 points', NULL, 'slug-1', 10, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2', '1', 'text', 'CASE-C Post 2', 'CASE-C Post 2, 20 points', NULL, 'slug-2', 20, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('3', '1', 'text', 'CASE-C Post 3', 'CASE-C Post 3, 30 points', NULL, 'slug-3', 30, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4', '1', 'text', 'CASE-C Post 4', 'CASE-C Post 4, 40 points', NULL, 'slug-4', 40, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('5', '1', 'text', 'CASE-C Post 5', 'CASE-C Post 5, 50 points', NULL, 'slug-5', 50, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('6', '1', 'text', 'CASE-C Post 6', 'CASE-C Post 6, 60 points', NULL, 'slug-6', 60, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('7', '1', 'text', 'CASE-C Post 7', 'CASE-C Post 7, 31 points', NULL, 'slug-7', 31, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('8', '1', 'text', 'CASE-C Post 8', 'CASE-C Post 8, 31 points', NULL, 'slug-8', 31, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

	SELECT * FROM post;