The specification of the API should include for each route:

    - the action (GET, POST, etc.)
    - a small description
    - parameters
    - possible response codes (http) and results (data request and possible outcomes)
    - reference to related use cases and acceptance criteria



# **commentRouter.get('/'...):** 

Defines a GET route at the root path ('/') to get comments by post slug. It uses the getCommentsByPostSlugController to handle the request. It also includes the includeDecodedTokenIfExists middleware using middleware.includeDecodedTokenIfExists() to include the decoded token if it exists.




# **commentRouter.post('/'...):** 

Defines a POST route at the root path ('/') to reply to a post. It uses the replyToPostController to handle the request. It applies the ensureAuthenticated middleware to ensure the user is authenticated.

Related to | US007 | [Comment Post](../../sprintA//US007/01.requirements-engineering/US007.md)

|||
|-----|----|
|Action|POST|
|Description|Comment a post|
|Parameters| 
|Slug of post| A string that represents the identifier of the post the user wants to comment|  
|Comment| A string that represents the comment to the post|
|Response codes|
|200 | OK|
|403 |Forbidden with a message: "Token signature expired"|
|500 |With a message: "Internal Server Error"|

|Related to TC|[Test cases](../../sprintA/US007/02.tests/readme.md)|

# **commentRouter.post('/:commentId/reply'...):** 

Defines a POST route with a parameter 'commentId' to reply to a comment. It uses the replyToCommentController to handle the request. It applies the ensureAuthenticated middleware to ensure the user is authenticated.

Related to | US008 | [Reply to Comments](../../sprintA/US008/01.requirements-engineering/US008.md)

|||
|-----|----|
|Action|GET|
|Description|Defines the path to reply to a comment|
|Parameters|N/A|
|Response codes|200 - OK or 403 Forbidden with a message: "Token signature expired." or 500 with a message: "Internal Server Error" |
|Related to TC|[Test cases](../../sprintA/US008/02.tests/readme.md)|



# **commentRouter.get('/:commentId'...):** 

Defines a GET route with a parameter 'commentId' to get a comment by its ID. It uses the getCommentByCommentIdController to handle the request. It also includes the includeDecodedTokenIfExists middleware.



# **commentRouter.post('/:commentId/upvote'...):** 

Defines a POST route with a parameter 'commentId' to upvote a comment. It uses the upvoteCommentController to handle the request. It also includes the includeDecodedTokenIfExists middleware.

Related to | US010 | [Vote on Comment](../../sprintA/US010/01.requirements-engineering/US010.md) 


|||
|-----|----|
|Action|POST|
|Description|Upvote a comment|
|Parameters|commentId, accessToken|
|Response codes|200 - OK <br> 403 - Forbidden with a message: "Token signature expired" <br> 500 - With a message: "Internal Server Error"|
|Related to TC|[Test cases](../../sprintA/US010/02.tests/readme.md)|


# **commentRouter.post('/:commentId/downvote'...):** 

Defines a POST route with a parameter 'commentId' to downvote a comment. It uses the downvoteCommentController to handle the request. It also includes the includeDecodedTokenIfExists middleware.

Related to | US010 | [Vote on Comment](../../sprintA/US010/01.requirements-engineering/US010.md) 

|||
|-----|----|
|Action|POST|
|Description|Downvote a comment|
|Parameters|commentId, accessToken|
|Response codes|200 - OK <br> 403 - Forbidden with a message: "Token signature expired"  <br> 500 - With a message: "Internal Server Error"|
|Related to TC|[Test cases](../../sprintA/US010/02.tests/readme.md)|
