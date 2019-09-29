import React from 'react';
import {NavLink} from 'react-router-dom';


const Nav = (props, {match}) => {

    const itemArray =  [ "turtles", "ocean", "fish" ]
    let navItemList = itemArray.map((item, index) =>
      <li key= {index}>
        <NavLink to={"/" + item} onClick={props.onClick}>{item}</NavLink>
      </li>
    )

    return(
      <nav className ='main-nav'>
        <ul>
          {navItemList}
        </ul>
      </nav>
    )

}

export default Nav
