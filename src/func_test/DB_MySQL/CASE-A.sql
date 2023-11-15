-- Table base_User;
select * from base_user;
INSERT INTO base_user (base_user_id, user_email, is_email_verified, username, user_password, is_admin_user, is_deleted, created_at, updated_at) VALUES ("1001", "grupo3@isep.ipp.pt", true , "grupo3", "$2a$12$cGy3I0CLjkiWefWEI7gbhue8pLzpkfb2wocp56SDZYiQOLQJRUSPe" , false , false , current_timestamp, current_timestamp);
select * from base_user;

-- Table member;
select * from member;
INSERT INTO member (member_id, member_base_id, reputation, created_at, updated_at) VALUES ("1238", "1001", 10, current_timestamp, current_timestamp);
select * from member;

-- Table Post;
select * from post;
INSERT INTO post (post_id, member_id, type ,title ,text , slug, points, total_num_comments, created_at, updated_at) VALUES ("Post_1", "1238", "text", "CASE-A Post 1", "text of CASE-A Post 1", "slug-1", "5", "0" , current_timestamp, current_timestamp);
INSERT INTO post (post_id, member_id, type ,title ,text ,slug, points, total_num_comments, created_at, updated_at)  VALUES ("Post_2", "1238", "text", "CASE-A Post 2", "text of CASE-A Post 2", "slug-2", "1", "0" , current_timestamp, current_timestamp);
INSERT INTO post (post_id, member_id, type ,title ,text ,slug, points, total_num_comments, created_at, updated_at) VALUES ("Post_3", "1238", "text", "CASE-A Post 3", "text of CASE-A Post 3", "slug-3", "10", "0" , current_timestamp, current_timestamp);
INSERT INTO post (post_id, member_id, type ,title ,text ,slug, points, total_num_comments, created_at, updated_at) VALUES ("Post_4", "1238", "text", "CASE-A Post 4", "text of CASE-A Post 4", "slug-4", "2", "0" , current_timestamp, current_timestamp);
INSERT INTO post (post_id, member_id, type ,title ,text ,slug, points, total_num_comments, created_at, updated_at) VALUES ("Post_5", "1238", "text", "CASE-A Post 5", "text of CASE-A Post 5", "slug-5", "7", "0" , current_timestamp, current_timestamp);
INSERT INTO post (post_id, member_id, type ,title ,text ,slug, points, total_num_comments, created_at, updated_at) VALUES ("Post_6", "1238", "text", "CASE-A Post 6", "text of CASE-A Post 6", "slug-6", "-2", "0" , current_timestamp, current_timestamp);
select * from post;
