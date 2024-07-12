import React from 'react'
import Navbar from '../Homepage/Navbar'
import Posts from '../Homepage/Posts'
import Sidebar from '../Homepage/Sidebar'
import Ad from '../Homepage/Ad'
import '../../styles/App.css'
import '../Homepage/Navbar.css'
import '../Homepage/Posts.css'

const Following = ({ user,  searchQuery }) => {
  return (
    <div className="container">
      <Navbar user={user} className="navbar" />
      <Posts user={user}  searchQuery={searchQuery} isAnswerPage={true} className="posts" />
      <Sidebar user={user}  className="sidebar" />
      <Ad className="advertisement" />
    </div>
  )
}

export default Following