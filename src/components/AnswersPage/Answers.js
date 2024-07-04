import React from 'react'
import Navbar from '../Homepage/Navbar'
import Posts from '../Homepage/Posts'
import Sidebar from '../Homepage/Sidebar'
import Ad from '../Homepage/Ad'
import './Answers.css'
import '../../styles/App.css'
import '../Homepage/Navbar.css'
import '../Homepage/Posts.css'

const Answers = ({ user}) => {
  return (
    <div className="container">
      <Navbar user={user} className="navbar" />
      <Posts user={user} className="posts" />
      <Sidebar user={user} className="sidebar" />
      <Ad className="advertisement" />
    </div>
  )
}

export default Answers