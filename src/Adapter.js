class Adapter {
  static getShows (){
    return fetch("http://api.tvmaze.com/shows")
    .then(res => res.json())
  }

  // http://api.tvmaze.com/shows?page=1

  static getShowEpisodes (showID){
    return fetch(`http://api.tvmaze.com/shows/${showID}/episodes`)
    .then(res => res.json())
  }
}

export default Adapter
