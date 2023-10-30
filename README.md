# Bloggie


## Table of Contents

- [Installation](#installation)
- [Features](#features)

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


