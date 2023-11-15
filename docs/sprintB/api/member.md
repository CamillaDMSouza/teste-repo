The specification of the API should include for each route:

    - the action (GET, POST, etc.)
    - a small description
    - parameters
    - possible response codes (http) and results (data request and possible outcomes)
    - reference to related use cases and acceptance criteria



# **memberRouter.get('/me'...):**

Defines a GET route at '/me' to get the current member. It uses the getCurrentMemberController to handle the request.

Related to | US003 | [View Member Info](../../US003/01.requirements-engineering/US003.md)


# **memberRouter.get('/:username'...):**

 Defines a GET route with a parameter 'username' to get a member by their username. It uses the getMemberByUserNameController to handle the request.

 Related to | US003 | [View Member Info](../../US003/01.requirements-engineering/US003.md)
