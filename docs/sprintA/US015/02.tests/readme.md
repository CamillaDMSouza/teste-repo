# US015 -  Average number of posts per user in a specific day

[Test results report](./US015-test-results.png)

# 1. Tests 

While accessing the Forum page we must garantee the following:

**Test 1:** Check if the "Statistics" option appears in the header of the main page next to the Login/Register button on the page. - AC3,AC4. 

    **Pre-conditions:** 
        Open the forum page
        The user must be logged in as a member
        
    **Expected result:**
         Check that the "Statistics" option appears in the menu next to the Login/Register button 

**Test 2:** Check if when clicking on the "Statistics" the user is redirected to the "Statistics Web Page". - AC5. 

      **Pre-conditions:** 
        Open the forum page
        User must be logged in as a member
        
    **Expected result:**
         Check that the user is redirected to the "Statistics" page.

**Test 3:** Check if the average posts per user for a specific day is on the second position on the page. - AC6. 

      **Pre-conditions:** 
        Open the forum page
        User must be logged in as a member
        
    **Expected result:**
         Check that the average posts per user for specific day is on the second position.

**Test 3:** Check if the area average posts per user for a specific day have a box to insert the date displaying a placeholder with the expected data format and a button to refresh the results. - AC7, AC8, AC9. 

      **Pre-conditions:** 
        Open the forum page
        User must be logged in as a member
        
    **Expected result:**
         Check that the average posts per user for specific day section has a text box with the placeholder displaying "dd-mm-yyyy" and there is also a refresh results buttton.

**Test 4:** Check if clicking the "refresh button" the results are updated and with the expected format. - AC10, AC11, AC12, AC13. 

      **Pre-conditions:** 
        Open the forum page
        User must be logged in as a member
        
    **Expected result:**

	| Day | Average posts |
	|:-------------  |:--------------------- |
	| dd-mm-yyyy | x |


**Test 5:** When invoking the /averageposts endpoint for a specific date the average posts per user for a specific date, with posts, the average is returned  - AC12.

    **Pre-conditions:** 
        Have a member token to access the API
        The database is pre-filled with data

    **Test-Steps:**
        Invoke the method `/averageposts` endpoint for a date with posts

    **Expected result:**
        Return Status Code `200-ok` and the average for the date

**Test 5:** When invoking the /averageposts endpoint for a specific date the average posts per user for a specific date, without posts, the 0 is returned  - AC13.

    **Pre-conditions:** 
        Have a member token to access the API
        The database is pre-filled with data

    **Test-Steps:**
        Invoke the method `/averageposts` endpoint for a date without posts

    **Expected result:**
        Return Status Code `200-ok` and 0 as the average for the date

**Test 6:** When invoking the /averageposts endpoint for a specific date the average posts per user for a specific date without the member token  - AC14.

    **Pre-conditions:** 
        Have a member token to access the API
        The database is pre-filled with data

    **Test-Steps:**
        Invoke the method `/averageposts` endpoint for a date with posts

    **Expected result:**
        Return Status Code `403-forbidden`
