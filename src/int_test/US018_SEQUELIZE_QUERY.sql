SELECT member_base_id FROM member WHERE member_base_id NOT IN (SELECT DISTINCT member_id FROM post WHERE post.created_at = '2023-10-07' UNION SELECT DISTINCT member_id FROM comment WHERE comment.created_at = '2023-10-07');