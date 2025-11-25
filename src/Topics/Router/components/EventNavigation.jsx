import React from 'react'
import { NavLink } from 'react-router'
const EventNavigation = () => {
  return (
    <div>
        <NavLink to='/Events'>All Events</NavLink>
        <NavLink to='/Events/new'>New Events</NavLink>
    </div>
  )
}

export default EventNavigation