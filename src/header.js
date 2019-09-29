import React from 'react';
import Title from './title.js';
import Search from './search.js';
import Nav from './nav.js'

const Header = (props) => {

    return (
      <header>
      <Title />
      <Search
        onSearch={props.onSearch}
        searchTextChange = {props.searchTextChange}
      />
      <Nav
        onClick={props.onClick}
      />
      </header>
    )
}

export default Header
