# US 002 - View individual Post 

# 1. Tests 

While accessing the Forum page and selecting a post we must guarantee the following:

**Test 1:** Check if is possible to access the post details page from: 
 - **Test 1.1:** Popular posts page - AC1
 - **Test 1.2:** New posts page - AC1

**Test 2:** Check if post information is displayed as required - AC2

[Back to all discussions]()

&uarr; **"post title"**<br/>
0<br/>
&darr; [submit]()

 20 minutes ago | by [username]() | 3 comments

The post message...

**Leave a comment**

<input type='text' placeholder='post your reply'></input>

<button>Post comment</button>

&nbsp;&nbsp;&nbsp; &uarr; [username]() | 1 day ago<br/>
&nbsp;&nbsp;&nbsp; 0 **"comment title"**<br/>
&nbsp;&nbsp;&nbsp; &darr; [reply]()

- **Test 2.1:** Check the "Back to all discussions" control: 
    - **Test 2.1.1:** Check if the control is positioned on the top left corner - AC3
    - **Test 2.1.2:** Check if we are redirected to the all discussions page when we click on it - AC3

- **Test 2.2:** Check if the title is following this format **"Post title goes here!"** - AC4.

- **Test 2.3:** Check the post voting control
    - **Test 2.3.1:** For members check if it is possible to up vote/down vote - AC5.
    - **Test 2.3.2:** For visitors the "Want to vote? You need to sign up [Here]()" message is displayed - AC5.
    - **Test 2.3.3:** Check if the voting control is displayed as follow - AC5.

    &uarr;<br/>
    0<br/>
    &darr;

- **Test 2.4:** Check if the submit link is present: 
   - **Test 2.4.1:** When a member clicks it, it should be redirected to the Create Post page - AC6
   - **Test 2.4.2:** When a visitor clicks it, it should be redirected to the default page - AC6

- **Test 2.5:** Check if the creation moment format is: "1 minute ago" - AC7.

- **Test 2.6:** Check the username format and functionality - AC8.
    - **Test 2.6.1:** Check if the username follows this format "by [username]()" - AC8.
    - **Test 2.6.2:** Check if clicking on the username the user is redirected to the member page - AC8.

- **Test 2.7:** Check the comments format is "0 comments" - AC9.

- **Test 2.8:** Check if the post message is displayed - AC10.

- **Test 2.9:** Check if the **Leave a comment** title message is displayed  - AC11.

- **Test 2.10:** Check if the rich text control is available to post a comment - AC12
    - **Test 2.10.1:** There should be an option to apply bold - AC12
    - **Test 2.10.2:** There should be an option to apply italic - AC12
    - **Test 2.10.3:** There should be an option to apply underline - AC12
    - **Test 2.10.4:** There should be an option to add a link - AC12
    - **Test 2.10.5:** There should be an option to insert code - AC12

- **Test 2.11:** Check if there is a button "Post Comment" to save the new comment - AC13

- **Test 2.12:** Check if there are replies to a comment they appear right after - AC14, AC15
    - **Test 2.12.1:** Check the comment voting control
        - **Test 2.12.1.1:** For members check if it is possible to up vote/down vote - AC15.
        - **Test 2.12.1.2:** For visitors the "Want to vote? You need to sign up [Here]()" message is displayed - AC15.
        - **Test 2.12.1.3:** Check if the voting control is displayed as follow - AC15.

    &uarr;<br/>
    0<br/>
    &darr;
    
    - **Test 2.12.2:** Check if the username of the comment is displayed - AC16
    - **Test 2.12.3:** Check the comment reply creation moment control - AC17 
        - **Test 2.12.3.1:** Check the format (e.g. 1 minute ago) - AC17
        - **Test 2.12.3.2:** Check if there is a link to the comment details page [1 minute ago]() - AC17

- **Test 2.13** Check comment message is formated in bold - AC18

- **Test 2.14** Check if there is a reply control to every comment - AC19
    - **Test 2.14.1:** Check if it is a link that redirects the user to the reply to a comment page - AC19

- **Test 2.15** Check if a reply to a reply is displayed as expected (indented and the layout equal to reply) - AC20, AC21.