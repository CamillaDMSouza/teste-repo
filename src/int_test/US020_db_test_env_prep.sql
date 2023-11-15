
-- Create user
set @userNumber1Id = cast(uuid() as CHAR(36));
set @userNumber2Id = cast(uuid() as CHAR(36));
set @userNumber3Id = cast(uuid() as CHAR(36));
set @userNumber4Id = cast(uuid() as CHAR(36));
set @userNumber5Id = cast(uuid() as CHAR(36));
set @userNumber6Id = cast(uuid() as CHAR(36));
set @userNumber7Id = cast(uuid() as CHAR(36));
set @userNumber8Id = cast(uuid() as CHAR(36));
set @userNumber9Id = cast(uuid() as CHAR(36));
 
-- Create base_user
insert into base_user (base_user_id, user_email, is_email_verified, username, user_password, is_admin_user, is_deleted, created_at, updated_at) values
    (@userNumber1Id, 'user-number1@gmail.com', true, 'user-number1', 'user-number1', false, false, '2023-10-01 10:10:10', '2023-10-01 10:10:10'),
    (@userNumber2Id, 'user-number2@gmail.com', true, 'user-number2', 'user-number2', false, false, '2023-10-02 12:10:10', '2023-10-02 10:10:10'),
    (@userNumber3Id, 'user-number3@gmail.com', true, 'user-number3', 'user-number3', false, false, '2023-10-03 10:10:10', '2023-10-03 10:10:10'),
    (@userNumber4Id, 'user-number4@gmail.com', true, 'user-number4', 'user-number4', false, false, '2023-10-04 11:10:10', '2023-10-04 10:10:10'),
    (@userNumber5Id, 'user-number5@gmail.com', true, 'user-number5', 'user-number5', false, false, '2023-10-05 13:10:10', '2023-10-05 10:10:10'),
    (@userNumber6Id, 'user-number6@gmail.com', true, 'user-number6', 'user-number6', false, false, '2023-10-06 10:10:10', '2023-10-06 10:10:10'),
    (@userNumber7Id, 'user-number7@gmail.com', true, 'user-number7', 'user-number7', false, false, '2023-10-07 10:10:10', '2023-10-07 10:10:10'),
    (@userNumber8Id, 'user-number8@gmail.com', true, 'user-number8', 'user-number8', false, false, '2023-10-08 14:10:10', '2023-10-08 10:10:10'),
    (@userNumber9Id, 'user-number9@gmail.com', true, 'user-number9', 'user-number9', false, false, current_timestamp, current_timestamp);
 
select * from base_user;
   
-- Create member ids
set @memberUserNumber1Id = cast(uuid() as CHAR(36));
set @memberUserNumber2Id = cast(uuid() as CHAR(36));
set @memberUserNumber3Id = cast(uuid() as CHAR(36));
set @memberUserNumber4Id = cast(uuid() as CHAR(36));
set @memberUserNumber5Id = cast(uuid() as CHAR(36));
set @memberUserNumber6Id = cast(uuid() as CHAR(36));
set @memberUserNumber7Id = cast(uuid() as CHAR(36));
set @memberUserNumber8Id = cast(uuid() as CHAR(36));
set @memberUserNumber9Id = cast(uuid() as CHAR(36));
 
 -- Create member
insert into member (member_id, member_base_id, reputation, created_at, updated_at)
    values
    (@memberUserNumber1Id, @userNumber1Id, 1, '2023-10-01 10:10:10', '2023-10-01 10:10:10'),
    (@memberUserNumber2Id, @userNumber2Id, 2, '2023-10-02 11:10:10', '2023-10-02 10:10:10'),
    (@memberUserNumber3Id, @userNumber3Id, 3, '2023-10-03 10:10:10', '2023-10-03 10:10:10'),
    (@memberUserNumber4Id, @userNumber4Id, 4, '2023-10-04 12:10:10', '2023-10-04 10:10:10'),
    (@memberUserNumber5Id, @userNumber5Id, 5, '2023-10-05 10:10:10', '2023-10-05 10:10:10'),
    (@memberUserNumber6Id, @userNumber6Id, 6, '2023-10-06 13:10:10', '2023-10-06 10:10:10'),
    (@memberUserNumber7Id, @userNumber7Id, 7, '2023-10-07 10:10:10', '2023-10-07 10:10:10'),
    (@memberUserNumber8Id, @userNumber8Id, 8, '2023-10-08 14:10:10', '2023-10-08 10:10:10'),
    (@memberUserNumber9Id, @userNumber9Id, 9, current_timestamp, current_timestamp);
 
select * from member;
 
 
-- Create post ids & slugs
SET @post1UserNumber1Id = UUID();
SET @post2UserNumber1Id = UUID();
SET @post3UserNumber1Id = UUID();
SET @post4UserNumber1Id = UUID();
SET @post5UserNumber1Id = UUID();
SET @post1UserNumber2Id = UUID();
SET @post2UserNumber2Id = UUID();
SET @post3UserNumber2Id = UUID();
SET @post4UserNumber2Id = UUID();
SET @post1UserNumber3Id = UUID();
SET @post2UserNumber3Id = UUID();
SET @post3UserNumber3Id = UUID();
SET @post1UserNumber4Id = UUID();
SET @post2UserNumber4Id = UUID();
SET @post1UserNumber5Id = UUID();
 
SET @slug1UserNumber1Id = UUID();
SET @slug2UserNumber1Id = UUID();
SET @slug3UserNumber1Id = UUID();
SET @slug4UserNumber1Id = UUID();
SET @slug5UserNumber1Id = UUID();
SET @slug1UserNumber2Id = UUID();
SET @slug2UserNumber2Id = UUID();
SET @slug3UserNumber2Id = UUID();
SET @slug4UserNumber2Id = UUID();
SET @slug1UserNumber3Id = UUID();
SET @slug2UserNumber3Id = UUID();
SET @slug3UserNumber3Id = UUID();
SET @slug1UserNumber4Id = UUID();
SET @slug2UserNumber4Id = UUID();
SET @slug1UserNumber5Id = UUID();
 
 
 
-- Insert 15 Posts + votes (from user 1 to 5)
INSERT INTO post (post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at)
VALUES    
   (@post1UserNumber1Id, @memberUserNumber1Id, 'text', 'This concerns the 1st post from User1', 'This concerns the 1st post from User1', null, @slug1UserNumber1Id, 5, 3, '2023-10-03 08:10:10', '2023-10-03 08:10:10'),
   (@post2UserNumber1Id, @memberUserNumber1Id, 'text', 'This concerns the 2nd post from User1', 'This concerns the 2nd post from User1', null, @slug2UserNumber1Id, 4, 2, '2023-10-04 08:10:10', '2023-10-04 08:10:10'),
   (@post3UserNumber1Id, @memberUserNumber1Id, 'text', 'This concerns the 3rd post from User1', 'This concerns the 3rd post from User1', null, @slug3UserNumber1Id, 3, 1, '2023-10-05 08:10:10', '2023-10-05 08:10:10'),
   (@post4UserNumber1Id, @memberUserNumber1Id, 'text', 'This concerns the 4th post from User1', 'This concerns the 4th post from User1', null, @slug4UserNumber1Id, 2, 0, '2023-10-06 08:10:10', '2023-10-06 08:10:10'),
   (@post5UserNumber1Id, @memberUserNumber1Id, 'text', 'This concerns the 5th post from User1', 'This concerns the 5th post from User1', null, @slug5UserNumber1Id, 1, 0, '2023-10-07 08:10:10', '2023-10-07 08:10:10'),
   (@post1UserNumber2Id, @memberUserNumber2Id, 'text', 'This concerns the 1st post from User2', 'This concerns the 1st post from User2', null, @slug1UserNumber2Id, 3, 1, '2023-10-04 08:10:10', '2023-10-04 08:10:10'),
   (@post2UserNumber2Id, @memberUserNumber2Id, 'text', 'This concerns the 2nd post from User2', 'This concerns the 2nd post from User2', null, @slug2UserNumber2Id, 2, 1, '2023-10-05 08:10:10', '2023-10-05 08:10:10'),
   (@post3UserNumber2Id, @memberUserNumber2Id, 'text', 'This concerns the 3rd post from User2', 'This concerns the 3rd post from User2', null, @slug3UserNumber2Id, 1, 0, '2023-10-06 08:10:10', '2023-10-06 08:10:10'),
   (@post4UserNumber2Id, @memberUserNumber2Id, 'text', 'This concerns the 4th post from User2', 'This concerns the 4th post from User2', null, @slug4UserNumber2Id, 0, 0, '2023-10-07 08:10:10', '2023-10-07 08:10:10'),
   (@post1UserNumber3Id, @memberUserNumber3Id, 'text', 'This concerns the 1st post from User3', 'This concerns the 1st post from User3', null, @slug1UserNumber3Id, 1, 1, '2023-10-05 08:10:10', '2023-10-05 08:10:10'),
   (@post2UserNumber3Id, @memberUserNumber3Id, 'text', 'This concerns the 2nd post from User3', 'This concerns the 2nd post from User3', null, @slug2UserNumber3Id, 2, 1, '2023-10-06 08:10:10', '2023-10-06 08:10:10'),
   (@post3UserNumber3Id, @memberUserNumber3Id, 'text', 'This concerns the 3rd post from User3', 'This concerns the 3rd post from User3', null, @slug3UserNumber3Id, -1, 0, '2023-10-07 08:10:10', '2023-10-07 08:10:10'),
   (@post1UserNumber4Id, @memberUserNumber4Id, 'text', 'This concerns the 1st post from User4', 'This concerns the 1st post from User4', null, @slug1UserNumber4Id, -1, 1, '2023-10-06 08:10:10', '2023-10-06 08:10:10'),
   (@post2UserNumber4Id, @memberUserNumber4Id, 'text', 'This concerns the 2nd post from User4', 'This concerns the 2nd post from User4', null, @slug2UserNumber4Id, -2, 1, '2023-10-07 08:10:10', '2023-10-07 08:10:10'),
   (@post1UserNumber5Id, @memberUserNumber5Id, 'text', 'This concerns the 1st post from User5', 'This concerns the 1st post from User5', null, @slug1UserNumber5Id, -3, 0, '2023-10-08 08:10:10', '2023-10-08 08:10:10');
 
-- Retrieve posts ordered by points in descending order
SELECT * FROM post;
 
-- Create comment ids
SET @comment1UserNumber1Id = UUID();
SET @comment2UserNumber1Id = UUID();
SET @comment1UserNumber2Id = UUID();
SET @comment2UserNumber2Id = UUID();
SET @comment1UserNumber3Id = UUID();
SET @comment2UserNumber3Id = UUID();
SET @comment1UserNumber4Id = UUID();
SET @comment2UserNumber4Id = UUID();
SET @comment1UserNumber6Id = UUID();
SET @comment2UserNumber6Id = UUID();
 
-- Insert 10 Comments + votes (from user 1 to 4 + user 6)
 
INSERT INTO comment (comment_id, parent_comment_id, member_id, post_id, text, points, created_at, updated_at)
VALUES
(@comment1UserNumber1Id, null, @memberUserNumber1Id, @post1UserNumber2Id, 'This concerns the 1st comment from User1', 5, '2023-10-15 08:10:10', '2023-10-15 08:10:10'),
(@comment2UserNumber1Id, null, @memberUserNumber1Id, @post2UserNumber2Id, 'This concerns the 2nd comment from User1', 4, '2023-10-15 08:10:10', '2023-10-15 08:10:10'),
(@comment1UserNumber2Id, null, @memberUserNumber2Id, @post1UserNumber1Id, 'This concerns the 1st comment from User2', 3, '2023-10-16 08:10:10', '2023-10-16 08:10:10'),
(@comment2UserNumber2Id, null, @memberUserNumber2Id, @post2UserNumber1Id, 'This concerns the 2nd comment from User2', 2, '2023-10-16 08:10:10', '2023-10-16 08:10:10'),
(@comment1UserNumber3Id, null, @memberUserNumber3Id, @post1UserNumber1Id, 'This concerns the 1st comment from User3', 1, '2023-10-17 08:10:10', '2023-10-17 08:10:10'),
(@comment2UserNumber3Id, null, @memberUserNumber3Id, @post2UserNumber4Id, 'This concerns the 2nd comment from User3', 0, '2023-10-17 08:10:10', '2023-10-17 08:10:10'),
(@comment1UserNumber4Id, null, @memberUserNumber4Id, @post1UserNumber3Id, 'This concerns the 1st comment from User4', -1, '2023-10-18 08:10:10', '2023-10-18 08:10:10'),
(@comment2UserNumber4Id, null, @memberUserNumber4Id, @post2UserNumber3Id, 'This concerns the 2nd comment from User4', -2, '2023-10-18 08:10:10', '2023-10-18 08:10:10'),
(@comment1UserNumber6Id, null, @memberUserNumber6Id, @post1UserNumber1Id, 'This concerns the 1st comment from User6', -3, '2023-10-19 08:10:10', '2023-10-19 08:10:10'),
(@comment2UserNumber6Id, null, @memberUserNumber6Id, @post2UserNumber1Id, 'This concerns the 2nd comment from User6', -4, '2023-10-19 08:10:10', '2023-10-19 08:10:10');
 
SELECT * FROM comment;