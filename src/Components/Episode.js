import React from 'react';

const Episode = (props) => {
  let myEpisode = props.episode
  console.log(myEpisode)

  return (
    <div>
      Episode {myEpisode.number} - {myEpisode.name}
    </div>
  )
}

export default Episode;
