# US005 - Creation a Post (test) 

## Acceptance Tests

###  AC01 - Member Login Requirement
* **Test 1:** The login functionality:
* Open the system
* Log in as a member
* Verify that a success message "logged in" is displayed
* **Test 1.1:** invalid login credentials:
* Attempt to log in with invalid credentials (username)
* Verify that an error message is displayed "Had some trouble logging in. An unexpected error occurred"" 
* Attempt to log in with invalid credentials (Password)
* Verify that an error message is displayed "Had some trouble logging in. Password doesn't match error"

### AC02 - Submit
**Test 2:**  "submit":
* Open the post creation form
* Verify that the post creation form is displayed

### AC03 - Post Creation Form
**Test 3:** Post Title:

* Enter a post title with less than 2 characters
* Verify that the error message "Title should be 2 to 85 characters. Yours was" is displayed
* Enter a post title with more than 85 characters
* Verify that the error message "Title should be 2 to 85 characters. Yours was" is displayed
* Enter a title between 2 and 85 characters long


 **Test 3.1:**  Post Text Body:

* Enter a post text with less than 20 characters.
* Verify that the error message "Text posts should be 20 to 10000 characters. Yours was" is displayed.
* Enter a post text with more than 10000 characters.
* Verify that the error message "Text posts should be 20 to 10000 characters. Yours was" is displayed
* Enter text between 20 and 10000 characters

**Test 3.2:** Post Link:
* Enter a post link with less than 8 characters.
* Verify that the error message "Yeahhhhh, link posts should be 8 to 500 characters. Yours was " is displayed.
* Enter a post link with more than 500 characters.
* Verify that the error message "Yeahhhhh, link posts should be 8 to 500 characters. Yours was" is displayed
* Enter link between 8 and 500 characters
* The link Text Box needs to come in the format "http//:" + "". 
* Verify that error message "Yeahhhhh"
* The link Text Box needs to come in the format "" + "text". 
* Verify that error message "Yeahhhhh"
* The link Text Box needs to come in the format "http//:" + "text". 
* Verify that confirmation message: "Done-zo"

### AC04 Submit
**Test 4:** Submitting a Post:
* Enter a title between 2 and 85 characters long
* Enter text between 20 and 10000 characters 
* Fill in the post-creation form with valid data to display a confirmation message: "Done-zo!"

**Test 4.1:** Submitting Title and link

* Enter a title between 2 and 85 characters long
* Enter link between 8 and 500 characters 
* The link Text Box needs to come in the format "http//:" + "text". 
* Fill in the post-creation form with valid data to display a confirmation message: "Done-zo!"