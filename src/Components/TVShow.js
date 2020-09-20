import React from 'react';

const tvShow = (props) => {
  let { show } = props

  // console.log("this is tv show props",props)
  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={()=>{props.selectShow(show)}} alt=""/>
    </div>
  );
}

export default tvShow;
