The specification of the API should include for each route:

    - the action (GET, POST, etc.)
    - a small description
    - parameters
    - possible response codes (http) and results (data request and possible outcomes)
    - reference to related use cases and acceptance criteria



# **postRouter.post('/'...):**

Defines a POST route at the root path ('/') to create a post. It uses the createPostController to handle the request. It applies the ensureAuthenticated middleware to ensure the user is authenticated.

Related to | US005 | [Create a Post](../../sprintA/US005/01.requirements-engineering/US005.md)

|||
|-----|----|
|Action|POST|
|Description|Creation a Post|
|Parameters|
|Title|A string containing the title of the post. The size must be between 2 and 85 characters|
|Content Type|A value indicating the type of content of the post. It can be "text" for text content or "link" for link content.|
|Text|A string containing the text of the post. The size must be between 20 and 10000 characters. This parameter is required only if the type is "text".|
|Link URL|A string containing the URL of the link to be shared in the post. The size must be between 8 and 500 characters. This parameter is required only if the content type is "link"|
|Response codes|200 - OK |
|| 403 - Forbidden - message: "Token signature expired."|
|| 500 - ERROR      - message: "Title should be 2 to 85 characters. Yours was"|
|| 500 -  ERROR    - message: "Yeahhhhh, link posts should be 8 to 500 characters. Yours was"|
|| 500 - ERROR     - message: "Text posts should be 20 to 10000 characters. Yours was"|
|Related to TC|[Test cases]( ../../sprintA/US005/02.tests/readme.md)
| Bug  |In the program where the frontend restricts the URL of the link between 8 and 500 characters but this limitation (PostUtil class) is not applied in the backend this allows users to enter link URLs from 5 up to 2084 characters (validator) characters , which violates the app's publishing rules.|

 
# **postRouter.get('/recent'...):**

Defines a GET route at '/recent' to get recent posts. It uses the getRecentPostsController to handle the request. It includes the includeDecodedTokenIfExists middleware to include the decoded token if it exists.

Related to | US006 | [View New Posts List](../../US006/01.requirements-engineering/US006.md)

|||
|-----|----|
|Action|GET|
|Description|Gets the most New posts based|
|Parameters|N/A|
|Response codes|200 - OK|
|Related to TC|[Test cases](../../sprintA/US006/02.tests/readme.md)|


# **postRouter.get('/popular'...):** 

Defines a GET route at '/popular' to get popular posts. It uses the getPopularPostsController to handle the request. It includes the includeDecodedTokenIfExists middleware.

Related to | US004 | [View Popular Posts List](../../sprintA/US004/01.requirements-engineering/readme.md)

|||
|-----|----|
|Action|GET|
|Description|Gets the most popular posts based on their votes|
|Parameters|N/A|
|Response codes|200 - OK|
|Related to TC|[Test cases](../../sprintA/US004/02.tests/readme.md)|


# **postRouter.get('/'...):**

Defines a GET route at the root path ('/') to get a post by its slug. It uses the getPostBySlugController to handle the request. It includes the includeDecodedTokenIfExists middleware.

Related to | US0002 | [View Individual Post](../../sprintA/US002/01.requirements-engineering/)

|||
|-----|----|
|Action|GET|
|Description|Gets the individual post details|
|Parameters|Required slug of post|
|Response codes|200 - OK or 500 - Internal Server Error - "message": "Couldn't find a post by slug {9543474-novo-post}."|
|Related to TC|[Test cases](../../sprintA/US002/02.tests/readme.md)|


# **postRouter.post('/upvote'...):** 

Defines a POST route at '/upvote' to upvote a post. It uses the upvotePostController to handle the request. It applies the ensureAuthenticated middleware.

Related to | US009 | [Vote on Post](../../US009/01.requirements-engineering/US009.md)

|||
|-----|----|
|Action|GET|
|Description|Post route to upvote a post|
|Parameters|Required slug of post|
|Response codes|200 - OK or 403 - Forbidden - message: "Token signature expired."|
|Related to TC|[Test cases](../../sprintA/US009/02.tests/readme.md)|


# **postRouter.post('/downvote'...):**

Defines a POST route at '/downvote' to downvote a post. It uses the downvotePostController to handle the request. It applies the ensureAuthenticated middleware.

Related to | US009 | [Vote on Post](../../US009/01.requirements-engineering/US009.md)

|||
|-----|----|
|Action|GET|
|Description|Post route to downvote a post|
|Parameters|Required slug of post|
|Response codes|200 - OK or 403 - Forbidden - message: "Token signature expired."|
|Related to TC|[Test cases](../../sprintA/US009/02.tests/readme.md)|