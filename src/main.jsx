import React from 'react'

import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import BlogsSection from './Sections/BlogsSection.jsx'
import AboutSection from './Sections/AboutSection.jsx'
import ContactSection from './Sections/ContactSection.jsx'
import PostDetailsSection from './Sections/PostDetailsSection.jsx'
import AuthorBlogsSection from './Sections/AuthorBlogsSection.jsx'
import { createRoot } from 'react-dom/client'

const container = document.getElementById("root")
const root = createRoot(container)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<BlogsSection/>} />
      <Route path='about' element={<AboutSection/>} />
      <Route path='contact' element={<ContactSection/>} />
      <Route path='blogs/:blogId' element={<PostDetailsSection/>} />
      <Route path='blogs/author/:authorId' element={<AuthorBlogsSection/>} />
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
