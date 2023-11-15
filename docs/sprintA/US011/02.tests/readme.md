# US011 - Visualization of Posts by number of votes ascending

[Test results report](./US011-test-results.png)

# 1. Tests 

While accessing the Forum page we must garantee the following:

**Test 1:** Check if the "Ascending" option appears on the page. - AC1. 

    Open the forum page
    Check that the "Ascending" option appears in the menu

**Test 2:** When no posts have been submitted, check if a blank page is displayed  - AC2, AC3.

    **Pre-conditions:** 
        The database should be empty

    **Test-Steps:**
        Invoke the method `getAllPostsAscending`

    **Expected result:**
        Return Status Code `200-ok`


**Test 3:** After creating one post it should appear on the ascending posts - AC2, AC4.

    **Pre-conditions:** 
        The database should be empty
        Have a registered user
        Obtain the registered user's access token
        Created one post with the access token

    **Test-Steps:**
        Invoke the method `getAllPostsAscending` 

    **Expected result:**
        Return Status Code `200-ok` and the created post.


**Test 4:**If posts exists, check if the posts are displayed in ascending order - AC2, AC4, AC5.
    After creating 17 posts, (16 new + 1 previous test) should appear on the ascending posts

    **Pre-conditions:** 
        Have one post created
        Have a registered user
        Obtain the registered user's access token
        Create 16 new posts with the access token

    **Test-Steps:**
        Invoke the method `getAllPostsAscending` 

    **Expected result:**
        Return Status Code `200-ok`
        As none of them have votes they should be sorted by creating date ascending

**Test 5:** Check if the posts are sorted by the number of votes ascending - AC2, AC4, AC5.
    After voting on the first post it should appear on the last position

     **Pre-conditions:** 
        Have seventeen posts created
        Have a registered user (it should be different from the user that created the posts "voter")
        Obtain the "voter" registered user's access token
        Pick the first post from the `getAllPostsAscending` and vote on it using the token.

    **Test-Steps:**

        Invoke the method `getAllPostsAscending`


    **Expected result:**
        Return Status Code `200-ok`
        Check if the last post on the list is the one that was voted

**Test 6:** Check if the posts are sorted by the number of votes ascending - AC2, AC4, AC5.
    After voting on the first post twice it should appear one the last position

     **Pre-conditions:** 
        Have seventeen posts created
        Have two registered users (they should be different from the user that created the posts "voter" and "second voter")
        Obtain users access token for "voter" and "second voter"
        Pick the first post from the `getAllPostsAscending` and vote on it using the token's.

    **Test-Steps:**
        Invoke the method `getAllPostsAscending` 

    **Expected result:**
        Return Status Code `200-ok` 
        Check if the last post on the list is the one that was voted

**Test 7:** Check if the posts are sorted by the number of votes ascending - AC2, AC4, AC5.
    After voting on the first post three times it should appear one the last position

     **Pre-conditions:** 
        Have seventeen posts created
        Have two registered users (they should be different from the user that created the posts "voter" and "second voter")
        Obtain users access token for "voter" and "second voter" and "post owner"
        Pick the first post from the `getAllPostsAscending` and vote on it using the token's.

    **Test-Steps:**
        Invoke the method `getAllPostsAscending` 

    **Expected result:**
        Return Status Code `200-ok` 
        Check if the last post on the list is the one that was voted

**Test 8:** Check if the ascending posts with the same number of votes are sorted by the created moment ascending - AC2, AC5.

     After voting on the first post it should appear on the 15th position

     **Pre-conditions:** 
        Have seventeen posts created
        Have a registered user (it should be different from the user that created the posts "voter")
        Obtain the "voter" registered user's access token
        Pick the first post from the `getAllPostsAscending` and vote on it using the token.

    **Test-Steps:**

        Invoke the method `getAllPostsAscending`

    **Expected result:**
        Return Status Code `200-ok`
        Check if the 15th post on the list is the one that was voted

**Test 9:** Check if post information is display as required - AC6, AC7.

&uarr; **"post title"**<br/>
0<br/>
&darr; 20 minutes ago | by [username]() | 0 comments

- **Test 9.1:** Check the voting control
    - **Test 9.1.1:** For members check if it is possible to up vote/down vote - AC7.

    - **Test 9.1.2:** For visitors the "Want to vote? You need to sign up [Here]()" message is displayed - AC8.

    - **Test 9.1.3:** Check if the voting control is displayed as follow - AC8.

    &uarr;<br/>
    0<br/>
    &darr;

- **Test 9.2:** Check the title format and functionality - AC9. 
    - **Test 9.2.1:** Check if the title is following this format **"Post title goes here!"** - AC9.

    - **Test 9.2.2:** Check if clicking on the title the user is redirected to the post page - AC9.

- **Test 9.3:** Check if the creation moment format is: "1 minute ago" - AC10.

- **Test 9.4:** Check the username format and functionality - AC11.
    - **Test 9.4.1:** Check if the username follows this format "by [username]()" - AC11.

    - **Test 9.4.2:** Check if clicking on the username the user is redirected to the member page - AC11.

- **Test 9.5:** Check the comments format is "0 comments" - AC12.

    
