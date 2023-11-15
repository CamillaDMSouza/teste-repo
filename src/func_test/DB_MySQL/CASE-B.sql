delete from comment_vote;
delete from post_vote;
delete from comment;
delete from post;
delete from  member;
delete from base_user;

-- Create user/member ids
set @baseUserId = cast(uuid() as CHAR(36));
set @memberId = cast(uuid() as CHAR(36));

-- Create base_user
insert into base_user (base_user_id, user_email, is_email_verified, username, user_password, is_admin_user, is_deleted, created_at, updated_at)
	values ( @baseUserId, 'grupo3@isep.ipp.pt', true, 'grupo3', '$2a$10$5/10nQqGvfpKMUz05mWOcOU682Ko0A2krmsmjrGXCGTLUxnqGYibW', false, false, now(), now());

select * from base_user;
    
 -- Create member
insert into member (member_id, member_base_id, reputation, created_at, updated_at)
	values(@memberId, @baseUserId, 10, now(), now());

select * from member;
 

-- Insert 15 Posts + 1 Post
insert into post (post_id, member_id, type, title, text, link, slug, points, total_num_comments, created_at, updated_at) values 
   (uuid(), @memberId, 'link', 'sapo', null, 'www.sapo.pt', concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)), '-test'), 33, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post001', 'Text -Post001', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 20, 0, now(), now()),
   (uuid(), @memberId, 'link', 'google', null, 'www.google.com', concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)), '-test'), 2, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post002', 'Text -Post002', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 10, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post003', 'Text -Post003', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 0, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post004', 'Text -Post004', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 51, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post005', 'Text -Post005', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 45, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post006', 'Text -Post006', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 15, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post007', 'Text -Post007', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 17, 0, now(), now()),
   (uuid(), @memberId, 'link', 'isep', null, 'www.isep.ipp.pt.com', concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)), '-test'), 7, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post008', 'Text -Post008', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 8, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post009', 'Text -Post009', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 11, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post010', 'Text -Post010', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 59, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post011', 'Text -Post011', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 9, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post0012', 'Text -Post012', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 70, 0, now(), now()),
   (uuid(), @memberId, 'text', 'Post013', 'Text -Post013', null, concat(cast(ROUND((RAND() * (8999999))+1000000) as char(7)),'-test'), 44, 0, now(), now());
   
  
select * from post order by points desc;

