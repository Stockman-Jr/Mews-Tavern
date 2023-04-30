  - [Manual Testing](#manual-testing)


---

### **Home Page**

| **Element**               | **Action**    | **Expected Result**                                                               | **Pass/Fail** |
| ------------------------- | ------------- | --------------------------------------------------------------------------------- | ------------- |
| **Home page**             |               |                                                                                   |               |
| Carousel                  | Display       | Show 5 most liked posts on the site                                               | Pass          |
| Carousel controls         | Click         | Indicators and previous/next arrows work as intended                              | Pass          |
| Carousel                  | Hover         | Pause the carousel                                                                | Pass          |
| Carousel post/build cards | Display/Click | All cards display correct content and all interactive elements functions the same | Pass          |
| Latest news link          | Click         | Opens the official site link in a new tab                                         | Pass          |

---

### **Navigation**

| **Element**             | **Action**    | **Expected Result**                                                                                   | **Pass/Fail** |
| ----------------------- | ------------- | ----------------------------------------------------------------------------------------------------- | ------------- |
| **Navbar**              | Display       | Navbar will conditionally render correct links based on logged in/logged out status                   | Pass          |
| Navbar Brand/Logo       | Display       | Logo will only display for logged out users, and direct user to homepage                              | Pass          |
| Home/Feed/PokeDex links | Display/Click | Will be displayed to all users, and direct user to correct page                                       | Pass          |
| Sign up link            | Display/Click | Sign up link will only display for logged out users, and direct user to sign up page                  | Pass          |
| Log in link             | Display/Click | Sign up link will only display for logged out users, and direct user to log in page                   | Pass          |
| Add Post link           | Display/Click | Add Post link will only display for logged in users, and direct user to post form page                | Pass          |
| **Main navbar mobile**  | Responsive    | Collapses on medium screen sizes <768px                                                               | Pass          |
| Collapsed navigation    | Click/Display | Identical links, expected results are the same as above                                               | Pass          |
| **User profile menu**   | Display/Click | The logo will be replaced by the current user avatar and toggles a dropdown menu on click             | Pass          |
| Profile link            | Click         | Will direct to current user Profile page                                                              | Pass          |
| Edit profile link       | Click         | Will direct to profile edit form page                                                                 | Pass          |
| Edit profile link       | Input         | Will redirect to homepage if anyone else but the profile owner tries to access page through url input | Pass          |
| Account Settings link   | Click         | Will direct to account settings page                                                                  | Pass          |
| Account Settings link   | Input         | Will redirect to homepage if anyone else but the profile owner tries to access page through url input | Pass          |

---

### **Log In Page and Sign Up Page**

| **Element**             | **Action**    | **Expected Result**                                                                   | **Pass/Fail** |
| ----------------------- | ------------- | ------------------------------------------------------------------------------------- | ------------- |
| **Sign Up page**        | Redirect      | Accessing page with logged in status will redirect user to homepage                   | Pass          |
| Form Submit button      | Click         | Successfully register a user account on submit and directs the user to the login page | Pass          |
| Form Submit button      | Display/Click | Display alert error messages if any form input is invalid                             | Pass          |
| "Already a member" Link | Click         | Direct user to log in page                                                            | Pass          |
| **Log In page**         | Redirect      | Accessing page with logged in status will redirect user to homepage                   | Pass          |
| Form Submit button      | Click         | Successfully logs in user on submit and directs the user to the homepage              | Pass          |
| Form Submit button      | Display/Click | Display alert error messages if any form input is invalid                             | Pass          |
| "Not a member yet" Link | Click         | Direct user to sign up page                                                           | Pass          |

---

### **Feed Page and Detail Page**

| **Element**               | **Action**     | **Expected Result**                                                                                                                               | **Pass/Fail** |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Feed Page**             | Display        | Displays all posts, sorted by most recent                                                                                                         | Pass          |
| Loader                    | Display        | Displays animated loader until data is fetched                                                                                                    | Pass          |
| Posts                     | Scroll         | Will fetch and display next 10 posts on scroll when scrolling past 10 posts                                                                       | Pass          |
| Searchbar                 | Input/Display  | Enables user to search for username or pokemon game,<br>displays correct results if there is a match on input                                     | Pass          |
| Searchbar                 | Display        | If the keyword input does not have any matching results,<br>display a no results message with a prompt to adjust keyword                          | Pass          |
| Filter select field       | Select/Display | Will display correct post type when selecting "Pokémon Builds" or "Game Related",<br>selecting "All posts" will reset filter to display all posts | Pass          |
| Post/Build Card           | Display        | Displays correct form data                                                                                                                        | Pass          |
| Post/Build Card           | Click          | Avatar and username will direct user to correct profile page on click                                                                             | Pass          |
| Post/Build Card           | Click          | Will direct user to detail page on click                                                                                                          | Pass          |
| Like button               | Display        | Always displays like count, button is red if current user has liked the post,<br>otherwise it's grey                                              | Pass          |
| Like button(greyed out)   | Display/Click  | Adds a like to the post, updates likes count and button turns red                                                                                 | Pass          |
| Like button(red)          | Display/Click  | Removes a like to the post, updates likes count and button turns grey                                                                             | Pass          |
| Like button               | Hover/Click    | Will display tooltip "You can't like your own post" if current user is the owner, <br>does not add a like on click                                | Pass          |
| Like button               | Hover/Click    | Will display tooltip "Log in to like posts" if user is logged out, <br>does not add a like on click                                               | Pass          |
| Comments Count            | Display        | Comment count displays correctly                                                                                                                  | Pass          |
| **Detail Page**           | Display/Click  | Correct data is fetched and displayed for whichever post type was clicked,<br>interactive elements functions the same as in Feed page             | Pass          |
| Dropdown Menu             | Display/Click  | Will display a clickable icon inside header of post/build card which toggles a dropdown<br>menu if current user is the owner                      | Pass          |
| Dropdown Menu trash icon  | Click          | Deletes post, then redirects user to previous page                                                                                                | Pass          |
| Dropdown Menu edit icon   | Click          | Will direct user to the edit form page                                                                                                            | Pass          |
| Comment Create Form       | Display        | Only visible to logged in users                                                                                                                   | Pass          |
| Comment Create Form       | Display        | Will display message prompt to log in or sign up for logged out users                                                                             | Pass          |
| "Add" submit button       | Click          | Submits comment data successfully, and display in comment container on submit                                                                     | Pass          |
| Comment counter           | Display        | Counter updates correctly when a comment is added or deleted                                                                                      | Pass          |
| Comment                   | Display        | Will display the owner of the comment's avatar, username, time since creation and content correctly                                               | Pass          |
| Comment avatar            | Click          | Will direct user to the owner of the comment's profile page                                                                                       | Pass          |
| **Comments container**    | Display        | Show post comments if there are any, otherwise display text "No comments yet"                                                                     | Pass          |
| Load more button          | Click          | Fetch the next set of comment data and display in comment container if there is any                                                               | Pass          |
| **Comment dropdown menu** | Display/Click  | Will display a clickable icon beside comment which toggles a dropdownmenu if current user is the owner                                            | Pass          |
| Dropdown Menu trash icon  | Click          | Deletes comment and is no longer visible in comment container                                                                                     | Pass          |
| Dropdown Menu edit icon   | Click/Display  | Will display modal containing the comment edit form and current comment data                                                                      | Pass          |
| **Comment edit form**     | Select/Display | Will display the selected pokemons image sprite along with all move fields and ability field                                                      | Pass          |
| "Save" submit button      | Click          | Correctly updates the comment's content and creation time on submit                                                                               | Pass          |
| Close buttons             | Click          | Close the modal/edit form without affecting any comment data                                                                                      | Pass          |

---

### **Add Post Page**

---

### **Comments**

---

### **PokeDex Page & Caught Pokémons**

---

### **User Profiles**

---