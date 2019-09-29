import React, {Component} from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Header from './header.js';
import Gallery from './gallery.js';
import FileNotFound from './filenotfound.js'
import apiKey from './config.js';
let query;
//solution for history.push connection via external browswerRouter/withRouter
//https://dev.to/kozakrisz/react-router---how-to-pass-history-object-to-a-component-3l0j

class App extends Component {

constructor () {
  super();
    this.state = {
    images : [],
    searchText: 'turtles',
    loading: true,
    performedSearch: false,
    input: false
  }
    this.performSearch = this.performSearch.bind(this);
  }

componentDidMount() {
  this.performSearch();
}

findQuery = () => {
    let searchPath = '/' + (this.state.searchText);
    let checkLocation = this.props.location.pathname;
    let checkLocationQuery = checkLocation.split('/').join('')


    if (checkLocation === "/") {
      query = this.state.searchText
    } else if (checkLocation !== searchPath && this.state.input === false) {
      query = checkLocationQuery
    } else if (this.state.input === true) {
      query = this.state.searchText
    } else {
      query = this.state.searchText
    }
      return query;
}

performSearch = (query) => {
    query = this.findQuery();

    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&extras=url_t&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState( {
      images : responseData.photos.photo,
      loading: false,
      });
      })
      .catch(error => {
      console.log('fetch error', error);
    });
}

onSearchChange = (e) => {
   this.setState({
     searchText : e.target.value,
     input: true
   });
}


handleSubmit = (e) => {
  e.preventDefault();
  this.setState(
    {loading : true,
     performedSearch: true,
    })
  this.performSearch(this.state.searchText);
  const { history } = this.props;
  let searchValue = this.state.searchText;
  let path = `${searchValue}`;
  history.push("/" + path)
}

onNavClick = (e) => {
    this.setState(
        {searchText : e.target.innerHTML,
         loading: true },
        () => this.performSearch(this.state.searchText)
    );
}

render () {
  let searchValue = this.state.searchText;
  let path = `${searchValue}`;



  return (
      <div className="App">
        <Header
          onSearch={this.handleSubmit}
          searchTextChange = {this.onSearchChange}
          onClick={this.onNavClick}
        />

          <Switch>
              <Redirect exact path="/" to={"/" + path} render={() => <Gallery data={this.state.images}/>}/>
                    {
                      (this.state.loading)
                      ? <p>Loading...</p>
                      : <Route exact path="/:search"  render={() => <Gallery data={this.state.images}/>} />
                    }
            <Route component={FileNotFound}/>
            </Switch>

      </div>
  );
}
}


export default withRouter(App);
