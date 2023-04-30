## Table of Contents

- [Project Links](#project-links)
- [UX](#ux)
  - [User Stories](#user-stories)
- [Agile Methodology](#agile-methodology)
- [Design](#design)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Imagery](#imagery)
- [Features](#features)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
  - [Main Languages](#main-languages)
  - [Frameworks, Libraries & Programs](#frameworks-libraries--programs)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Code](#code)
  - [Content](#content)
  - [Media](#media)

---

# Project Links

This project was created with two repositories, the separate being the backend.
Links to the frontend parts of the project can be found in the links below:

- [Backend Repo](https://github.com/Stockman-Jr/project5-rest-api)
- [Live Link](https://pokeproject-api.herokuapp.com/)

---

## UX

### User Stories

#### **As a logged out user, I can:**

- Easily navigate around the application to view most content.
- Register.
- Log In.
- View the home page.
- View the PokeDex page and browse Pokémon.
- View the post feed page to browse posts.
- Click on a post or build to view the detail page.
- View comments in detail page.
- View users profile pages.

#### **As a logged in user, I can:**

- All things listed above, with the exception of register/log in, as you need to be logged out to access these links.
- Log Out.
- Create and share game related posts as well as Pokémon builds by clicking the 'Add Post' link.
- Like and unlike posts.
- Comment on posts.
- Save and delete pokémons I've caught in the PokeDex page by clicking the pokeball.

#### **As the owner/creator of content, I can:**

- All things listed above.
- Edit and delete posts.
- Edit and delete comments.
- See what pokemons are caught or not in the PokeDex page.
- Update profile information, such as name, bio and avatar.
- Change username and password.

---

# Agile Methodology

An agile approach was implemented for this project with a Github projects kanban board which can be found [here](https://github.com/users/Stockman-Jr/projects/3/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%5D).

An issue template was created for adding User Stories. Each User Story was given a label of priority using the: **Must Have**, **Should Have** or **Could Have**.

---

## Design

### Colour scheme

The colour palette chosen for this project are hues of brown, beige, blue and gold.

![Colour Palette]()

It's a colour palette I'm very fond of, but it was a bit tricky to use in terms of creating contrast and readability.

### Typography

The main font of the site is a standard font, 'Trebuchet MS'. I also used a Google Font, 'Press 2 Play', which was used as a decorative font, mostly used in headings throughout the application.

### Imagery

### Responsive Design

The responsiveness of the site was achieved through the use of bootstrap, flexbox and media queries.

---

## Features

### Existing Features

#### Landing Page

Home is the landing page of the application, it's content is available to all users and features the following:

- A decorative banner featuring the name of the app.
- A carousel featuring the 5 most liked posts.
- A user can click on a featured post to see the detail page of the post.
- A Latest News section that features some info about the upcoming updates and events of the current pokémon games,
  as well as a link to the official site, that opens in a new tab when clicked.

#### Navigation

The navbar features conditional rendering based on current user status, and is available on all pages.
For logged out users, the navbar renders the links to:

- Home
- Sign Up
- Log In
- PokeDex
- Feed

![Logged out Nav]()

For logged in users the navbar renders the links to:

- Home
- Log Out
- Feed
- PokeDex
- Add Post

The logged in user also have their avatar displayed in the left corner of the navbar, which will toggle a dropdown menu with links to:

- Profile - Redirects to current users profile page
- Edit profile - Form where user can update avatar, bio and name
- Account settings - Two forms where user can change either username or password

![Logged in Nav]()

---

### Posts

#### Post Feed Page

The post feed page will display all posts created by users, sorted by most recent.
Users can use the search bar to search for posts by username or game, or use the filtering to filter by all posts, only Game Related or only Pokémon Build posts.

![Search and filter]()

Both types of posts have the same features, but renders different content.
The features are:

- An interactive like button to like/unlike posts, including a like counter
- Comments counter
- Badges that displays what type of post it is, and what game it is related to if any
- Clickable avatar and username which redirects to the profile of the user that created the post
- The main content of the posts is clickable and will redirect the user to the detail page

The like button also have tooltips that will display when hovered, if the user is either the owner of the content or if the user is logged out.

![Owner]()
![Logged Out]()

![Game Related Post]()

![Pokémon Build Post]()

---

#### Detail Page & Comments

The detail page is accessed by clicking on a post, where the user can view comments or create comments provided that they are logged in.

![Detail Page]()

- If the user is the owner of the post, a dropdown menu will be available with options to go to the edit form or delete their post.

![Comment Container]()

- If the user is the owner of any of the comments, a dropdown menu will be available with options to edit or delete their comment.

### PokeDex Page

The PokeDex page is literally a simplified version of a pokedex which contains all 1008 currently existing Pokémon _(actually there are two missing, the new ones you can see in the Home page news section)_.
This page is browsable with pagination, and displays 15 pokemons per page.
![Pagination]()

All pokemons are displayed in cards and features the pokemons sprite image, name and types. The little background circle behind the sprite render different colors based on the pokemons types.

![Pokemon cards]()

**Filtering**

The PokeDex page also features filtering, in the form of 19 interactive buttons.
One button for each of the 18 pokemon types, and one reset button.
Clicking on a type will display all pokemons of that type, and clicking on the reset button will revert to the normal ordering, which is by pokedex entry(id).

![Type filters]()

**Catching and releasing pokemons**

The pokemon cards also features an interactive pokeball, which basically have the same functionality of a like button. The main purpose of this was to create a fun way for users to keep track of their own pokemon collection and view other users collections.

- Logged in users can 'catch' and 'release' pokemons by clicking on it.
- The pokeballs will render differently and have different hover effects depending on if the current user has caught it or not, allowing the user to easily keep track of caught and uncaught.

![Caught Pokemon]() ![Uncaught Pokemon]()

- Logged out users will see a tooltip on hover

![Logged out Pokeball tooltip]()

---

### Creating Content

This app features two types of shareable posts:

- "Game Related" post, which essentialy is meant to be like a typical social media post, where users can share something pokemon related _(screenshots, fanart etc.)_.
- "Pokémon Build" post, where can create builds from the pokemons they've caught.

Clicking on the "Add Post" in the navigation will redirect the user to the game related post form, but can go to the pokemon build form by clicking the button on top. Each form page features a link button to the other form, so users can easily switch between them.

**Game Related post form**

Features form fields for title, description, image upload, ingame name and a game select field.

![Game Related Form]()

- Users can click the upload image or text, then the user will be able to preview selected image, or click the "Change the image" to choose another one.
- Ingame name and game select was added with the purpose of allowing some more interaction between users. For example if users wants to trade pokemons, or find users to play co-op with.

**Pokémon Build post form**

Features form fields for pokemon, moves, ability, EV stats, nature and held item.
Also contains description and game select.

![Pokemon Build Form]()

- The pokemon select field will only contain pokemon the user have caught.
- Once a pokemon is selected the sprite image will display along with four move select fields and an ability field, containing moves and abilities that the selected pokemon can have.
- EV stats are checkboxes that are limited to two choices.

![Selected Pokemon Build Form]()

---

### Profiles

#### The Profile Page

Features a header containing the users avatar, profile info and three links that will display different content.

- Posts - will display all posts created by the user
- Liked - will display all posts that are liked by the user
- Pokémons - will display all pokémons caught by the user

#### Profile Edit Form

The profile edit form is accessed through the link in the profile dropdown menu located in the navbar.
The form allows the user to add a name, bio and change their avatar.

![Profile Edit Form]()

- Users can interact with the 'Select Avatar' button to display a modal containing a range of preselected avatars to choose from. The chosen avatar will be previewed in the form once selected.

![Avatar Selection]()

#### Account Settings Form

The account settings form is also accessed through the link in the profile dropdown menu located in the navbar.

This page features two different forms, one for changing username and one for changing password.

![User Account Forms]()

The username form is shown by default when entering the page, but can switch between the two forms by clicking the tabs.

### Future Features






--- 

## Testing
Testing documentation can be found [here](https://github.com/Stockman-Jr/mews-tavern/blob/main/MANUAL-TESTS.md)

---

## Technologies Used

### Main Languages

- HTML5
- CSS3
- JavaScript
- ReactJS

### Frameworks, Libraries & Programs
- [Google Fonts](https://fonts.google.com/) - To find and import fonts used on the website
- [React Bootstrap 4](https://react-bootstrap-v4.netlify.app/) - Bootstrap components were applied to create a more responsive application. 
- [GitHub](https://github.com/) - To save and store files for the website.
- Git - For version control.
- [React Icons](https://react-icons.github.io/react-icons/) - Npm package used to add icons
- [Heroku](https://www.heroku.com/) - For deploying the project
- [ElephantSQL]() - Was used as the database for this project
- [Cloudinary](https://cloudinary.com/) - For hosting media files

---

## Deployment

---

## Credits
- [Code Institute](https://github.com/Code-Institute-Solutions/moments/tree/bb6657e265fb18360b841e10d9d633dad06f4e5c) - The Code Institutes Moments walkthrough project was referenced as a base setup for this project, some parts have been reused but I have customised as much code as possible. 

### Code