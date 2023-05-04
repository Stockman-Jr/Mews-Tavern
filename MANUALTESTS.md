# Manual Testing

I have tested the site manually as thouroughly as possible.
The tables below will show all manual testing that has been done, for different pages.

![Go back](https://github.com/Stockman-Jr/mews-tavern)
---

### **Home Page**

| **Element**               | **Action**    | **Expected Result**                                                              | **Pass/Fail** |
| ------------------------- | ------------- | -------------------------------------------------------------------------------- | ------------- |
| **Home page**             |               |                                                                                  |               |
| Carousel                  | Display       | Show 5 most liked posts on the site                                              | Pass          |
| Carousel controls         | Click         | Indicators and previous/next arrows work as intended                             | Pass          |
| Carousel                  | Hover         | Pause the carousel                                                               | Pass          |
| Carousel post/build cards | Display/Click | All cards display correct content and all interactive elements function the same | Pass          |
| Latest news link          | Click         | Opens the official site link in a new tab                                        | Pass          |

---

### **Navigation**

| **Element**             | **Action**    | **Expected Result**                                                                       | **Pass/Fail** |
| ----------------------- | ------------- | ----------------------------------------------------------------------------------------- | ------------- |
| **Navbar**              | Display       | Navbar will conditionally render correct links based on logged in/logged out status       | Pass          |
| Navbar Brand/Logo       | Display       | Logo will only display for logged out users, and direct user to homepage                  | Pass          |
| Home/Feed/PokeDex links | Display/Click | Will be displayed to all users, and direct user to correct page                           | Pass          |
| Sign up link            | Display/Click | Sign up link will only display for logged out users, and direct user to sign up page      | Pass          |
| Log in link             | Display/Click | Sign up link will only display for logged out users, and direct user to log in page       | Pass          |
| Add Post link           | Display/Click | Add Post link will only display for logged in users, and direct user to post form page    | Pass          |
| **Main navbar mobile**  | Responsive    | Collapses on medium screen sizes <768px                                                   | Pass          |
| Collapsed navigation    | Click/Display | Identical links, expected results are the same as above                                   | Pass          |
| **User profile menu**   | Display/Click | The logo will be replaced by the current user avatar and toggles a dropdown menu on click | Pass          |
| Profile link            | Click         | Will direct to current user Profile page                                                  | Pass          |
| Edit profile link       | Click         | Will direct to profile edit form page                                                     | Pass          |
| Account Settings link   | Click         | Will direct to account settings page                                                      | Pass          |

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
| Infinite scroll           | Scroll/Display | Will fetch and display 10 posts by default, then fetch and display the next set of posts<br>as user scrolls to the bottom of the page             | Pass          |
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

| **Element**         | **Action**    | **Expected Result**                                                                                                           | **Pass/Fail** |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Add Post Page**   | Display/Click | Will display "Game Related" post form on entering page,<br>but user can switch between form pages by clicking the button link | Pass          |
| Add Post form pages | Redirect      | Will redirect to homepage if a logged out user tries to access any of the form pages                                          | Pass          |
| Submit button       | Click         | Both forms will redirect to the created posts detail page upon successful form submit                                         | Pass          |
| Submit button       | Click         | Both forms will display error messages in bootstrap alerts if any input is invalid                                            | Pass          |
| Cancel button       | Click         | Both forms will redirect to the previous page the user was on                                                                 | Pass          |

**Create and edit forms**

| **Element**                   | **Action**     | **Expected Result**                                                                                                   | **Pass/Fail** |
| ----------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Post Create Form**          |                |                                                                                                                       |               |
| Upload image field text/icon  | Click          | Will open users file explorer to select an image                                                                      | Pass          |
| Upload image field            | Display/Click  | Will display a preview of the selected image and render a clickable label that allows the<br>user to change the image | Pass          |
| Submit button                 | Click          | Both forms will display error messages in bootstrap alerts if any form field is invalid                               | Pass          |
| **Post Edit Form**            | Redirect       | Will redirect to homepage if anyone that is not the owner tries to access it                                          | Pass          |
| Post Edit Form Fields         | Display        | All form fields will be prefilled with existing form data upon entering the page                                      | Pass          |
| Submit & Cancel buttons       | Click          | Expected results are the same as in Add Post Page table, and form data updates successfully on submit                 | Pass          |
| **Pokemon Build Create Form** |                |                                                                                                                       |               |
| Pokemon select field          | Display        | Will display a list of the current users caught pokemons                                                              | Pass          |
| Pokemon select field          | Select/Display | Will display the selected pokemon's image sprite along with all move fields and ability field                         | Pass          |
| Move select fields            | Display        | All four move fields contains the correct move data for the selected pokemon                                          | Pass          |
| Ability select field          | Display        | Contains the correct ability data for the selected pokemon                                                            | Pass          |
| **Pokemon Build Edit Form**   | Redirect       | Will redirect to homepage if anyone that is not the owner tries to access it                                          | Pass          |
| Pokemon build form fields     | Display        | All form fields will be prefilled with existing form data upon entering the page                                      | Pass          |
| Submit & Cancel buttons       | Click          | Expected results are the same as in Add Post Page table, and form data updates successfully on submit                 | Pass          |

---

### **PokeDex Page & Caught Pokémons**

| **Element**                   | **Action**          | **Expected Result**                                                                                                           | **Pass/Fail** |
| ----------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **PokeDex Page**              | Display             | Display list of pokemon ordered by pokedex entry(id)                                                                          | Pass          |
| Loader                        | Display             | Show animated loader until data is fetched                                                                                    | Pass          |
| Pokemon Card                  | Display             | Show correct name, sprite an types for each pokemon                                                                           | Pass          |
| Pokemon Card                  | Display             | Background circle behind pokemon sprite to render colours <br>that matches each pokemon's types                               | Pass          |
| Pagination                    | Display/Click       | Page number updates correctly when using pagination controls,<br>and each page display 15 pokemon                             | Pass          |
| Type filter buttons           | Click/Display       | Filter and display pokemon that have the selected type                                                                        | Pass          |
| Reset button                  | Click/Display       | Reset the currently selected type filter and revert back to the<br>original pokedex entry order                               | Pass          |
| Type filter/Reset buttons     | Click               | Will reset to pokedex page 1 when a filter is applied or reset button is clicked                                              | Pass          |
| **Pokeball button**           |                     |                                                                                                                               |               |
| Pokeball                      | Display             | Will render as a closed pokeball on all pokemon that the current logged in user<br>have caught/is the owner of                | Pass          |
| Pokeball                      | Display             | Will render as an open pokeball on all pokemon that the current logged in user<br>haven't caught/is not the owner of          | Pass          |
| Pokeball                      | Display/Hover       | Will render as an open pokeball on all pokemon for logged out users,<br>and show tooltip message that prompts log in on hover | Pass          |
| Caught(closed) Pokeball       | Hover/Click/Display | Shows tooltip message "Release?" on hover, deletes the pokemon on click<br>and renders an open pokeball                       | Pass          |
| Uncaught(open) Pokeball       | Hover/Click/Display | Shows tooltip message "Catch?" on hover, saves the pokemon on click<br>and renders a closed pokeball                          | Pass          |
| Caught(closed) Pokebal        | Click/Display       | Will display a modal warning user that if they have any builds tied to the pokemon,<br>the builds will be deleted too         | Pass          |
| Confirm release modal buttons | Click/Display       | Clicking the cancel button will not delete the caught pokemon, clicking confirm will delete the caught pokemon<br>.           | Pass          |

---

### **Profile Pages**

| **Element**                    | **Action**     | **Expected Result**                                                                                                                      | **Pass/Fail** |
| ------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Profile Page**               |                |                                                                                                                                          |               |
| Loader                         | Display        | Show animated loader until profile data is fetched                                                                                       | Pass          |
| Profile header                 | Display        | Only show profile name and/or bio if it exists                                                                                           | Pass          |
| Profile anchor links           | Hover/Display  | Links will expand in width and link text will show on hover                                                                              | Pass          |
| Posts link                     | Click/Display  | Fetch and display profile owner's created posts                                                                                          | Pass          |
| Liked link                     | Click/Display  | Fetch and display profile owner's liked posts                                                                                            | Pass          |
| Pokémon link                   | Click/Display  | Fetch and display profile owner's caught pokemon                                                                                         | Pass          |
| Posts/Liked/Pokémon links      | Display        | If the user does not have any of the corresponding content yet,<br>display an image and a no results message                             | Pass          |
| Infinite scroll                | Scroll/Display | Will fetch and display more content(if there is any) as user scrolls to<br>the bottom of the page when visiting any of the three links   | Pass          |
| **Edit profile page**          | Redirect       | Will redirect to homepage if anyone who doesn't match the profile id<br>tries to access the page                                         | Pass          |
| Select avatar button           | Display/Click  | Will show modal containing a range of avatars to choose from                                                                             | Pass          |
| Avatar modal select button     | Display/Click  | Closes modal and previews the newly selected avatar in the edit profile form                                                             | Pass          |
| Avatar modal close buttons     | Click          | Closes modal and cancels any selection without making any changes<br>to user's current avatar                                            | Pass          |
| Form "Confirm" submit button   | Click          | Successfully updates profile data and redirects user to previous page on submit,<br>any changes made are visible immediately             | Pass          |
| Form "Cancel" button           | Click          | Cancels any input or changes user has made, then directs user to previous page                                                           | Pass          |
| **Account settings page**      | Redirect       | Will redirect to homepage if anyone who doesn't match the profile id<br>tries to access the page                                         | Pass          |
| Change username form           | Display        | Will display by default when entering page                                                                                               | Pass          |
| Form headers(accordion toggle) | Click/Display  | Toggles between username form and password form on click                                                                                 | Pass          |
| Username input field           | Display        | Users current username will be prefilled in the form field                                                                               | Pass          |
| "Confirm" submit button        | Click          | Successfully updates the user's username or password and redirects user to previous page on submit                                       | Pass          |
| "Confirm" submit button        | Click/Display  | All fields in both forms have error mapping, and will display error messages in bootstrap alerts<br>for any invalid form input on submit | Pass          |
| "Cancel" button                | Click          | Cancels any input or changes user has made, then directs user to previous page in both forms                                             | Pass          |

---