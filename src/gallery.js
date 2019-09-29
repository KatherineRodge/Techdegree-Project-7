import React from 'react';
import NoResults from './NoResults';
import GalleryItem from './gallery-item.js';


const Gallery = (props, {match}) => {

  const results = props.data;
  let header;
  let images;

  if (results.length > 0 ) {
    header = "Results"
    images = results.map(galleryitem => <GalleryItem url={galleryitem.url_t} key={galleryitem.id} /> );
  } else {
    header = <NoResults />
    images = null;
  }


  return(
    <div className = "photo-container">
    <h3> {header} </h3>
      <ul>
        {images}
      </ul>
    </div>
  );
}


export default Gallery;
