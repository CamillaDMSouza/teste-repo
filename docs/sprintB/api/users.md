The specification of the API should include for each route:

    - the action (GET, POST, etc.)
    - a small description
    - parameters
    - possible response codes (http) and results (data request and possible outcomes)
    - reference to related use cases and acceptance criteria



# **userRouter.post('/'...):**

Defines a POST route at the root path ('/') for creating a user. It uses the createUserController to handle the request.

Related to | US001 | [Register New Account](../../sprintA/US001/01.requirements-engineering/US001.md)

|||
|-----|----|
|Action|POST|
|Description| Registers a new account in the DB|
|Parameters|N/A|
|Response codes|200 - OK |
||409 - Conflict|
||500 - Internal Server Error|
|Related to TC|[Test cases](../../sprintA/US001/02.tests/readme.md)|

# **userRouter.get('/me'...):**

Defines a GET route at '/me' to get the current user. It uses the getCurrentUserController to handle the request. It also applies the ensureAuthenticated middleware using middleware.ensureAuthenticated() to ensure the user is authenticated.



# **userRouter.post('/login'...):**

Defines a POST route at '/login' for user login. It uses the loginController to handle the request.
|||

Related to: 
| US001 | [Register New Account](../../sprintA/US001/01.requirements-engineering/US001.md)
| US005 | [Create a Post](../../sprintA/US005/01.requirements-engineering/US005.md)
| US007 | [Coment Post](../../sprintA/US007/01.requirements-engineering/US007.md)
| US008 | [Reply to Comments](../../sprintA/US008/01.requirements-engineering/US008.md)
| US009 | [Vote on Post](../../sprintA/US009/01.requirements-engineering/US009.md)
| US010 | [Vote on Comment](../../sprintA/US010/01.requirements-engineering/US010.md)

|||
|-----|----|
|Action|POST|
|Description| Logs into an account already registered in the DB|
|Parameters|N/A|
|Response codes|200 - OK |
||400 - Bad Request|
||500 - Internal Server Error|




# **userRouter.post('/logout'...):**

Defines a POST route at '/logout' for user logout. It uses the logoutController to handle the request. It also applies the ensureAuthenticated middleware to ensure the user is authenticated.

|||

Related to: 
| US005 | [Create a Post](../../sprintA/US005/01.requirements-engineering/US005.md)
| US007 | [Coment Post](../../sprintA/US007/01.requirements-engineering/US007.md)
| US008 | [Reply to Comments](../../sprintA/US008/01.requirements-engineering/US008.md)
| US009 | [Vote on Post](../../sprintA/US009/01.requirements-engineering/US009.md)
| US010 | [Vote on Comment](../../sprintA/US010/01.requirements-engineering/US010.md)

|||
|-----|----|
|Action|POST|
|Description| Logs out from a registered account|
|Parameters|N/A|
|Response codes|200 - OK |


# **userRouter.post('/token/refresh'...):**

Defines a POST route at '/token/refresh' to refresh the access token. It uses the refreshAccessTokenController to handle the request.


# **userRouter.delete('/:userId'...):**

Defines a DELETE route with a parameter 'userId' to delete a user. It uses the deleteUserController to handle the request. It also applies the ensureAuthenticated middleware to ensure the user is authenticated.


# **userRouter.get('/:username'...):**

Defines a GET route with a parameter 'username' to get a user by their username. It uses the getUserByUserNameController to handle the request. It also applies the ensureAuthenticated middleware to ensure the user is authenticated.