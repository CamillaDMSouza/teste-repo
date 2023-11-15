# US 007 - Comment a post

# 1. Tests 

**Test 1:** Check if when a user clicks on a post, the comment box is shown

    * Open the post
    * Verify if comment box is below the post

**Test 2:** Check if comments are displayed when click "Post Comment" button

    * Open the post
    * Verify if comment box is below the post
    * Write a comment
    * Click on "post comment" button
    * Verify that comments is displayed below the post
    
**Test 3:** Verify the buttons on the comment box

**Test 3.1** Check if Bold appears on the comment box and and if its visible on the post

    * Write a comment with Bold and verify if charaters are in Bold

**Test 3.2** Check if Italic appears on the comment box and and it if its visible on the post
    
     * Write a comment with Italic and verify if charaters are in Italic

**Test 3.2** Check if Underline appears on the comment box and and it if its visible on the post
   
      * Write a comment with Underline and verify if charaters are Underline

**Test 3.3** Check if hyperlink symbol appears on the comment box and it if its visible on the post
  
    * Put a link on the comment box and click on the hyperlink symbol, then click on "Save" button
    * Link must be underline

**Test 3.4** Check if code symbol appears on the comment box and it if its visible on the post

    * Verify if a black marker appears on the box and write the comment/code

**Test 4:** Check if non-members cannot comment posts (AC1)

      * Write a comment between 20 and 10000 characters
      * Submit comment
      * Must appear the error message: "Yeahhhhh, Token signature expired"

**Test 5:** Check if members can comment posts and its valid (AC1/AC3)

    * User must login
    * Open the post
    * Must displayed comment box below the post
    * User write a comment between 20 and 10000 characters.
    * User click on the "Post Comment" button to submit
    * Must appear the validation message: "Done-zo!"

**Test 6:** Check if throw error when text is below 20 and above 10000 characters (AC2)  

    * Write a comment below 20 and above 10000 characters
    * Must appear the error message: "Yeahhhhh, comments should be 20 to 10000 characters. Yours was "number""
          
*It is also recommended to organize this content by subsections.* 







