# Bloggie


## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [codeLocations](#codeLocations)

## Installation

Make sure backend is running on the right port, with right cors and db configuration. You can found the code at `https://github.com/Sabbir-Rahman/blog-cefalo-demo-project`.

Then run

```bash
npm install
npm run dev
```

## Features
1. Responsive design with dark and light theme persistent on user preference
2. User authentication and authorization maintained with
    - Two key RS256 algorithm. That means public key is also needed to decode the key.
      For that reason client side is also verified. Other thing is that if public key is 
      compromised though one can not sign a new jwt token
    - Refresh token mechanism is applied
3. User need to do sign up with Name, Email and Password. 
    - Email cannot be duplicated
    - Password must be 8 charecters or more
    - User need email and password to login
4. View blogs
    - Any one can view blogs
    - Pagination is done with infinity scrolling
    - Blogs can be searched by text. If the text is included in any part of title or body, the blog will be shown
    - Blogs can be sorted by latest created, oldest created, latest modified, last modified. Blogs are sorted by latest created by default.
    - Details blog can be shown by clicking on read more
    - Blogs of an author can also be viewed
5. Create blogs
    - Only authenticated user can create blog
    - Refresh troken is used if access token is expired
    - If both refresh token and access token is expired. User is logged out forcefully
6. Edit and Delete blogs
    - Only authorized person (own writed blog) can be edited or deleted
7. Pdf version of blog can be downloaded

## codeLocations
1. The code starts with main.jsx `src/main.jsx` where all routers related info are declared
2. App.jsx `src/App.jsx` is used for wrapping with context provider, using pop notification container, auth info with signal. Navbar need to be common for all the router so others are defined as outlet

### Navbar
1. Navbar is started from `src/Sections/NavBar.jsx`. Navbar has some functionality like routing through different pages. Showing small menu icon based on screen size. Change theme toggle button and authentication mechanism
2. If authentication is on going navbar redirects to AuthModal `src/components/modal/auth/AuthModal.jsx`. Where login and signup is handled with LoginModal `src/components/modal/auth/LoginModal.jsx` and SignUp `src/components/modal/auth/SignUpModal.jsx`  Modal respectively
3. If a user is authenticated. User navbar profile is shown with `src/components/UserNavbarProfile.jsx`


### Blogs
1. Blogs view is started with `src/Sections/BlogsSection.jsx`. If user is authenticated write blog mechanism is shown with WriteBlogCard `src/components/blogs/WriteBlogCard.jsx` 
2. Search and Sort mechanism is shown with SearchAnd SortDropdown `src/components/blogs/SearchAndSortDropDown.jsx`
3. Every blog is shown with Card componnet `src/components/common/Card.jsx`
4. Edit and Delete open EditBlogModalBody `src/components/modal/blogs/EditBlogModalBody.jsx` and DeleteBlogModalBody `src/components/modal/blogs/DeleteBlogModalBody.jsx` respectively

### Blog details
1. Clicking on the read More button of a blog card redirect to a single blog details page `src/Sections/PostDetailsSection.jsx`