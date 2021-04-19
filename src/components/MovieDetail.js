import { React, useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import noImg from '../no-img.jpg';
import api from '../apiService';
import { toast } from 'react-toastify';
import apiJson from '../apiServiceJson';

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetail = ({ selectedMovie, showPopup, setShowPopup }) => {
  const [trailer, setTrailer] = useState(null);
  
  const addToFavorites = async (e) => {
    try {
      const fav = await apiJson.get('/favorites');
      const existed = fav.data ? fav.data.find(movie => movie.id === parseInt(e)) : false;
      if(existed !== undefined) {
        toast.error(`This movie is existed`);
      } else {
        const res = await apiJson.post('/favorites', selectedMovie);
        toast.success(`${res.data.title} added to Favorites`);
      }
    } catch (error) {}
  }

  useEffect(() => {
    const getTrailer = async () => {
      if(selectedMovie && selectedMovie.id !== undefined) {
        let url = `${selectedMovie.adult === false ? 'movie' : 'tv'}/${selectedMovie.id}/videos?api_key=${API_KEY}&language=en-US`;
        const res = await api.get(url);
        setTrailer(res.data.results);
      }
    }
    getTrailer();
  }, [selectedMovie]);

  return (
    <Modal size="xl" show={showPopup} onHide={() => setShowPopup(false)} aria-labelledby="issue-detail-modal">
      <Modal.Header closeButton>
        <Modal.Title>{selectedMovie && selectedMovie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {trailer && trailer.length === 0 ? <div className="img" style={{backgroundImage: `url('${noImg}')`}}></div> : <div className="video"><iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer && trailer[trailer.length - 1].key}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div> }
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => addToFavorites(selectedMovie.id)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
          Add to Favorites
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default MovieDetail
