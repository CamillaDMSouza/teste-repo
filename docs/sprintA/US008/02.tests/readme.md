# US 008 - Reply to Comments

# 1. Tests

**Test 1:** Check if the comments are displayed adjacent to posts. - AC1.

* Access to the system main page via Web Browser
* Must display comments adjacent to posts.


**Test 2:** Check if the comments are displayed after selecting a post - AC2.

* Enter on a post details
* Must display comments below the post.


**Test 3:** Check if it is possible to reply to the comments as a visitor - AC3.

* On post details must display "reply" button on each comment
* Click on the "Reply" button.
* Must display a box with Bold, Italic, Underline, Hyperlink, and Code options to write the reply.
* Enter a valid reply. Must have between 20 and 10000 characters.
* Must present a message informing the Token signature has expired is displayed on the screen. "Yeahhhhh, Token signature expired. 🤠"


**Test 4:** Check if it is possible to reply to the comments as a member - AC4.

* Must be authenticated with a member role.
* Click on the "Reply" button.
* Must display a box to write the reply.
* Enter a valid reply. Must have between 20 and 10000 characters.
* Must present an error message if the reply is not valid. "Yeahhhhh, comments should be 20 to 10000 characters. Yours was 'number'. 🤠"
* Must present a message confirming the reply was successfully created. "Done-zo! 🤠" - AC5.
* Must display the reply below the comment with the details and the vote counter in one.

