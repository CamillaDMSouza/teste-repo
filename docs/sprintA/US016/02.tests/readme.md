# US013 - Delete User by Username

## Acceptance Tests

### AC00 - Create a user 

## Test 0: Create User Functionality

* **AC1:** All 3 fields (Email / Username/ Password) must be filled with valid and unique inputs contemplating alphanumeric and/ or special and case sensitive characters, otherwise must throw a suitable prompt message.

   - **Test 0.1:** Valid and unique inputs in all fields:
     - Fill all three fields with valid and unique inputs.
     - Verify that the user is successfully created.



### AC01 - Member Login Requirement

- * **Test 1:** The login functionality:
  - Open the system
  - Log in as a member
  - Verify that a success message "logged in" is displayed


### AC02 - Testar pagina information Member Botão Excluir 

- * **Teste 2:** Excluir visibilidade do botão:
    - Abra a interface do Information Member com Visitor 
    - menagem de erro
- * **Teste 2.1:** Excluir visibilidade do botão:
   - Abra a interface do Information Member com Member
   - menagem de sucesso


### AC03 - Username Text Box

- * **Test 3:** Username text box:
  - Open the user interface
  - Verify that there is a text box for entering the username.

### AC03 - Username text box

### AC03.1 - Delete with error

- * **Test 3.1:** User has posts, comments or replies:
  - use a username with post
  - Check to see if an error message appears stating "Unable to delete user at this time. Please try again later."
   - use a username with comment a post
   - Check if an error message appears stating "Unable to delete user at this time. Please try again later."
   - use a username with comment to comment
   - Check to see if an error message appears stating "Unable to delete user at this time. Please try again later."

- * **Test 3.2:** the user has no post, comments or response:
    - use a username without posting, commenting or replying
    - checks if the success message "Success! The user has been deleted."

### AC04 - try to log in with user delete
- * **Test 4.0:** login with username delete
    - Open the system
   - Log in as a member
   - Verify that an error message
