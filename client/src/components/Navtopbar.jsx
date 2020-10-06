import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import "../styles/navbar.css"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { consumerSignout } from '../redux/actions/consumerActions'
import { uploaderSignout } from '../redux/actions/uploaderAction'

const Navtopbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const[token] = useState(JSON.parse(localStorage.getItem("token")) || null)

  const handleLogout = e => {
    e.preventDefault()
    if(props.consumer) {
      props.consumerSignout()
      props.stateChange(null)
    }
    else if(props.uploader) {
      props.uploaderSignout()
      props.stateChange(null)
    }
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="main">
      <Navbar className="navbar-custom" color="light" light expand="md">
        <Link to='/'>
          <NavbarBrand>Udemy</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* {
              !token
                ? */}
                  <NavItem>
                    <Link style={{ textDecoration : 'none' }} to='/signUp'>
                      <NavLink>SignUp</NavLink>
                    </Link>
                  </NavItem>
                {/* :  */}
                  <NavItem>
                      <NavLink onClick={handleLogout}>SignOut</NavLink>
                  </NavItem>
                {/* } */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = storeState => {
  return {
    consumer : storeState.consumerState.consumer,
    uploader : storeState.uploaderState.uploader
  }
}

export default connect(mapStateToProps, {consumerSignout, uploaderSignout})(Navtopbar);
