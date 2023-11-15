# US 003 - View Member Info

# 1. Tests 

**Test 1:** 

Scenario: Verify that member information is displayed correctly when viewing a member's details.

Test Steps:
1. Navigate to the member management system.
2. Search for a specific member by name or ID.
3. Click on the member's profile to view their details.
4. Verify that the member's information, such as name, address, email, and phone number, is correctly displayed.
5. Record the observed member information.
6. Compare the recorded member information with the expected values based on the test data.
7. If the observed information matches the expected values, mark the test case as pass; otherwise, mark it as fail.

Test Data:
- Member Name: Miriam Ferreira
- Member ID: 123456
- Expected Name: Miriam Ferreira
- Expected Address: Rua Joaquim Chinelo, Maia
- Expected Email: miriam.ferreira@example.com
- Expected Phone Number: +351 919 919 919


**Test 2:**

Scenario: Ensure that all member details are visible and accessible in the member profile.

Test Steps:
1. Log in to the member management system with valid credentials.
2. Navigate to the member list or search for a specific member.
3. Click on a member's name to open their profile.
4. Verify that the member's information, such as name, address, date of birth, membership status, and account balance, is displayed.
5. Check if additional details like payment history, activity log, or preferences are accessible from the member profile.
6. If any of the member details are missing or inaccessible, mark the test case as fail.
7. Repeat steps 3-6 for multiple members to ensure consistency.

Test Data:
- Member Name: Miriam Ferreira
- Member ID: 789012
- Expected Address: Rua Joaquim Chinelo, Maia
- Expected Date of Birth: April 13, 1998
- Expected Membership Status: Active
- Expected Account Balance: $1000.00

**Test 3:** 

Scenario: Verify that an error message is displayed when attempting to view a non-existent member's details.

Test Steps:
1. Navigate to the member management system.
2. Search for a member who does not exist in the system.
3. Verify that an appropriate error message is displayed, indicating that the member does not exist.
4. Record the observed error message.
5. Compare the recorded error message with the expected error message.
6. If the observed error message matches the expected message, mark the test case as pass; otherwise, mark it as fail.

Test Data:
- Member ID: 987654
- Expected Error Message: "Member not found. Please check the provided member ID and try again."


**Test 4:**

Scenario: Verify that member details are displayed accurately when multiple members have similar names.

Test Steps:
1. Navigate to the member management system.
2. Search for a member by name.
3. If there are multiple members with similar names, select one of them.
4. Click on the member's profile to view their details.
5. Verify that the member's information corresponds to the selected member, including their name, address, email, and phone number.
6. Record the observed member information.
7. Compare the recorded member information with the expected values based on the selected member's details.
8. If the observed information matches the expected values, mark the test case as pass; otherwise, mark it as fail.

Test Data:
- Member Name: Miriam Ferreira
- Expected Name: Miriam Ferreira
- Expected Address: Rua Joaquim Chinelo, Maia
- Expected Email: miriam.ferreira@example.com
- Expected Phone Number: +351 919 919 919

**Test 5:**
Scenario: Ensure that sensitive member information is appropriately masked or hidden from unauthorized users.

Test Steps:
1. Log in to the member management system with limited privileges or as a non-admin user.
2. Navigate to the member list or search for a specific member.
3. Click on a member's name to open their profile.
4. Verify that sensitive information, such as social security number or credit card details, is masked or hidden from view.
5. Check if only non-sensitive information, like name, address, and contact details, are accessible to the user.
6. If any sensitive information is visible or accessible to the non-authorized user, mark the test case as fail.

Test Data:
- Member Name: Miriam Ferreira
- Member ID: 345678
- Sensitive Information: NIF Number (masked): XXX-XXX-XXX

