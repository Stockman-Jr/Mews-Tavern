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
  - [Manual Testing](#manual-testing)
  - [Bugs](#bugs)
  - [Unsolved Bugs](#unsolved-bugs)
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

This project was created with two repositories, the backend being separate.
Links to the backend parts of the project can be found in the links below:

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
- Save and delete pokémon I've caught in the PokeDex page by clicking the pokeball.

#### **As the owner/creator of content, I can:**

- All things listed above.
- Edit and delete posts.
- Edit and delete comments.
- See what pokemon are caught or not in the PokeDex page.
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

![Colour Palette](/readme-assets/color-palette.png)

It's a colour palette I'm very fond of, but it was a bit tricky to use in terms of creating contrast and readability. So I've had to use alot of different hues to make sure the contrast was up to par.

### Typography

The main font of the site is a standard font, 'Trebuchet MS'. I also used a Google Font, 'Press 2 Play', which was used as a decorative font, mostly used in headings throughout the application.

### Imagery

### Responsive Design

The responsiveness of the site was achieved through the use of bootstrap, flexbox and media queries.

---

## Features

### Existing Features

#### Landing Page

Home is the landing page of the application. The content is available to all users and features the following:

- A decorative banner featuring the name of the app.
- A carousel featuring the 5 most liked posts.
- A user can click on a featured post to see the detail page of the post, or click the avatar to see their profile page.
- A Latest News section that features some info about the upcoming updates and events of the current pokémon games, as well as a link to the official site which opens in a new tab when clicked.

![Banner and Carousel](/readme-assets/home-carousel.png)

![Latest News](/readme-assets/home-news.png)

#### Navigation

The navbar features conditional rendering based on current user status, and is available on all pages.
For logged out users, the navbar renders the links to:

- Home
- Sign Up
- Log In
- PokeDex
- Feed

![Logged out Nav](/readme-assets/logged-out-nav.png)

For logged in users the navbar renders the links to:

- Home
- Log Out
- Feed
- PokeDex
- Add Post

![Logged in Nav](/readme-assets/logged-in-nav.png)

The logged in user also have their avatar displayed in the left corner of the navbar, which will toggle a dropdown menu with links to:

- Profile - Redirects to current users profile page
- Edit profile - Form where user can update avatar, bio and name
- Account settings - Two forms where user can change either username or password

![Profile Menu](/readme-assets/profile-menu.png)

---

### Posts

#### Post Feed Page

The post feed page will display all posts created by users, sorted by most recent.
Users can use the search bar to search for posts by username or game, or use the select field to filter posts by post type.

![Search and filter](/readme-assets/posts-filter-search.png)

Both types of posts have the same features, but renders different content.
The features are:

- An interactive like button to like/unlike posts, including a like counter
- Comments counter
- Badges that displays what type of post it is, and which game it is related to if any
- Clickable avatar and username which directs to the profile page of the user that created the post
- The main content of the posts is clickable and will redirect the user to the post's detail page

The like button also have tooltips that will display on hover, if the user is either the owner or if the user is logged out.

![Owner](/readme-assets/likebtn-owner-tooltip.png)
![Logged Out](/readme-assets/likebtn-loggedout-tooltip.png)

![Game Related Post](/readme-assets/post-card.png)

![Pokémon Build Post](/readme-assets/build-card.png)

---

#### Detail Page & Comments

The detail page is accessed by clicking on a post, where the users can view comments, or create comments if they are logged in.

![Detail Page](/readme-assets/detail-page.png)

- If the user is the owner of the post, a cog icon will display which toggles a dropdown menu on click with the options to edit or delete their post.

![Post Owner Dropdown](/readme-assets/owner-dropdown.png)

![Comment Container](/readme-assets/comments.png)

- If the user is the owner of any of the comments, a cog icon will display which toggles a dropdown menu on click with the options to edit or delete their comment.
![Comment Owner Dropdown](/readme-assets/comment-owner-dropdown.png)

### PokeDex Page

The PokeDex page is literally a simplified version of a pokedex which contains all 1008 currently existing Pokémon _(actually there are two missing, the new ones you can see in the Home page news section)_.
This page is browsable with pagination, and displays 15 pokémon per page.

All pokemon are displayed in cards and features the pokemons sprite image, name and types. The little background circle behind the sprite render different colors based on the pokemon types.

![Pokemon cards](/readme-assets/pokemon-cards.png)

**Filtering**

The PokeDex page also features filtering, in the form of 19 interactive buttons.
One button for each of the 18 pokemon types, and one reset button.
Clicking on a type will display all pokemon of that type, and clicking on the reset button will revert to the normal ordering, which is by pokedex entry(id).

![Type filters](/readme-assets/type-filter-btns.png)

**Catching and releasing pokemons**

The pokemon cards also features an interactive pokeball, which basically have the same functionality of a like button. The main purpose of this was to create a fun way for users to keep track of their own pokemon collection and view other users collections.

- Logged in users can 'catch' and 'release' pokemon by clicking on it.
- The pokeballs will render differently and have different hover effects depending on if the current user has caught it or not, allowing the user to easily keep track of their caught pokemon.

![Caught Pokemons](/readme-assets/caught-uncaught.png)

![Caught Pokemon](/readme-assets/caught-pokeball.png) ![Uncaught Pokemon](/readme-assets/uncaught-pokeball.png)

- Logged out users will see a tooltip message on hover which prompts the user to log in in order to save caught pokemon

![Pokeball logged out tooltip](/readme-assets/pokeball-loggedout-tooltip.png)

---

### Creating Content

This app features two types of shareable posts:

- "Game Related" post, which essentialy is meant to be like a typical social media post, where users can share something pokemon related _(screenshots, fanart etc.)_.
- "Pokémon Build" post, where can create builds from the pokemon they've caught.

Clicking on the "Add Post" in the navigation will redirect the user to the game related post form, but can go to the pokemon build form by clicking the button on top. Each form page features a link button to the other form, so users can easily switch between them.

- Users can delete and edit their created content as they wish, provided that they are the owner.
- The edit forms of both post types are identical to their create form, with the exception that all fields are filled in with the post's current data.
- Users can update all fields in the "Game Related" form, and all fields but the pokemon can be updated in the "Pokémon Build" form. 

**Game Related post create form**

Features form fields for title, description, image upload, ingame name and a game select field.

![Image upload](/readme-assets/post-form-imgupload.png)

- Users can click the upload image or text, then the user will be able to preview selected image, or click the "Change the image" to choose another one.
- Ingame name and game select was added with the purpose of allowing some more interaction between users. For example if users wants to trade pokemons, or find users to play co-op with.

![Game Related Form](/readme-assets/post-create-form.png)

**Pokémon Build post create form**

Features form fields for pokemon, moves, ability, EV stats, nature and held item.
Also contains description and game select.

![Pokemon Build Form](/readme-assets/build-create-form.png)

- The pokemon select field will only contain pokemon the user have caught.
- Once a pokemon is selected the sprite image will display along with four move select fields and an ability field, containing moves and abilities that the selected pokemon can have.
- EV stats are checkboxes that are limited to two choices.

![Build Form Pokemon Select](/readme-assets/build-form-pokemon-select.png)

---

### Profiles

#### The Profile Page

Features a header containing the users avatar, profile info and three links that will display different content.

![Profile Header](/readme-assets/profile-page-header.png)

- Posts - will display all posts created by the user
- Liked - will display all posts that are liked by the user
- Pokémon - will display all pokémons caught by the user

#### Profile Edit Form

The profile edit form is accessed through the link in the profile dropdown menu located in the navbar.
The form allows the user to add a name, bio and change their avatar.

![Profile Edit Form](/readme-assets/edit-profile-form.png)

- Users can interact with the 'Select Avatar' button to display a modal containing a range of preselected avatars to choose from. The chosen avatar will be previewed in the form once selected.
- A focus effect is displayed on click so the user can see what avatar is currently selected.

![Avatar Selection](/readme-assets/avatar-selection.png)

_The user here have Pikachu avatar selected, it has a blue border and a dark overlay effect_

#### Account Settings Form

The account settings form is also accessed through the link in the profile dropdown menu located in the navbar.

This page features two different forms, one for changing username and one for changing password.

![User Account Username Form](/readme-assets/account-forms-username.png)
![User Account Password Form](/readme-assets/account-forms-password.png)

The username form is shown by default when entering the page, but can switch between the two forms by clicking the tabs.

### Other
There are a couple of components that are frequently used throughout the site which will be brought up in this section.

**Infinite Scrolling**

Infinite scrolling is applied to the Feed and Profile pages, as well as the comments container using the [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component) npm package.


**The arrow up component:**

![Arrow Up](/readme-assets/arrow-up.png)

- This component is present in the PokeDex, Feed and Profile pages and was created for these pages as they could be scroll 'heavy' pages.
- The arrow will show up in the bottom right corner after the user has scrolled down a certain height, and cliking it will take the user back to the top of the page.

**Owner Dropdown Menus**

These dropdown menus will show up in the detail page of a post or beside a comment in the comments section.



### Future Features



--- 

## Testing

#### Manual Testing
Manual testing documentation can be found [here](https://github.com/Stockman-Jr/mews-tavern/blob/main/MANUAL-TESTS.md)

---

### Bugs

#### Bug

- **Expected** - for the selected pokemon in the pokemon build create form to keep it's selected field value when am invalid form submit has been made
- **Testing** -
- **Result** -
- **Fix** -

### Unsolved bugs

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

### Resources

- [Icons8](https://icons8.com/) - Quite alot of images/icons/svgs from icons8 was used in the application, including the:
    * Favicon
    * Hamburger menu
    * Pokeball used for the loader
    * Arrow user in the ArrowUp component
    * Carousel indicatiors

- [emoji.gg](https://emoji.gg/emojis/pokemon) & [Discadia](https://discadia.com/emojis/?q=pokemon) - The avatars and the no results image was actually found on these discord emoji sites. I just added border and background colors to them. Credits to the people who created them!

- [Pokéball button](https://www.pokecommunity.com/showpost.php?p=9938453&postcount=4) - The pokéball used in the pokemon cards was extracted from this spritesheet created by WolfPP on the pokecommunity site.

### Code

- [Code Institute](https://github.com/Code-Institute-Solutions/moments/tree/bb6657e265fb18360b841e10d9d633dad06f4e5c) - The Code Institutes Moments walkthrough project was referenced as a base setup for this project, some parts have been reused but I have customised as much code as possible.