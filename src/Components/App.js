import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    pageNum: 1
  }

  componentDidMount = () => {
    Adapter.getShows(this.state.pageNum).then(shows => this.setState({shows}))
    // window.addEventListener('scroll', this.handleScroll, true);
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  // componentWillUnmount(){
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterByRating:"" }) : this.setState({ filterByRating: e.target.value})
  }

  // handleScroll = (e) => {
  //   let el = e.target.scrollingElement
  //   if (el.scrollHeight - el.scrollTop === el.clientHeight) {
      
  //     Adapter.getShows(this.state.pageNum + 1)
  //     .then(shows => {
  //       this.setState(()=>({
  //         shows: this.state.shows.concat(shows)
  //       }), console.log("after fetch", this.state.shows))
  //     })
  //     window.scrollTo(0, 0)
  //   }
  // }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then(episodesResp => {
      this.setState(() => ({
        selectedShow: show,
        episodes: episodesResp
      }))
    })
  }

  displayShows = () => {
    if (this.state.filterByRating){
      return this.state.shows.filter((s)=> {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return this.state.shows
    }
  }

  render (){
    return (
      <div >
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
