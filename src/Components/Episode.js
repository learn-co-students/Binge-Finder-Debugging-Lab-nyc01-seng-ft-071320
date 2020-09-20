import React from 'react';

const Episode = (props) => {
  let { eachEpisode } = props
  console.log("At the episode level",props)
  return (
    <div>
      Episode {eachEpisode.number} - {eachEpisode.name}
    </div>
  )
}

export default Episode;
