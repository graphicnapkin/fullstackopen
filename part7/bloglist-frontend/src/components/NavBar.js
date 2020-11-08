import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import LoggedIn from './LoggedIn'

//import { useSelector } from 'react-redux'

const NavigationBar = () => {
  //const user = useSelector(state => state.user)
  const padding = {
    padding: 10
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={ padding } to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={ padding } to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <LoggedIn />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
