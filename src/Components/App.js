import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    y: 0,
    count: 0,
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
  }

  componentDidMount = () => {
    Adapter.getShows(this.state.count).then(shows => this.setState({shows}))
    document.addEventListener("scroll", (e) =>  {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          this.upCount() 
        }
      }
    )
  }

  componentDidUpdate = () => {
    window.scrollTo(0, this.state.y)
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating:"" }) : this.setState({ filterByRating: e.target.value})
  }

  upCount = () => {
      Adapter.getShows(this.state.count+1).then(shows => {
        let newArray = this.state.shows.concat(shows)
        this.setState(previousState => ({shows: newArray, count: (previousState.count + 1), y: window.scrollY}))
    })
  }

  selectShow = (show) => {
    console.log(show.id)
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes: episodes
    }))
  }

  displayShows = () => {
    let shows = this.state.shows.filter((s)=> {
      return s.name.toLowerCase().includes(this.state.searchTerm)
    })
    if (this.state.filterByRating){
      return shows.filter((s)=> {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return shows
    }
  }


  render (){
    console.log(this.state)
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
