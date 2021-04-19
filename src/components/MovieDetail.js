import { React, useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import api from '../apiService';

const API_KEY = process.env.REACT_APP_API_KEY;

const MovieDetail = ({ selectedMovie, showPopup, setShowPopup }) => {
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const getTrailer = async () => {
      if(selectedMovie.id !== undefined) {
        let url = `${selectedMovie.adult === false ? 'movie' : 'tv'}/${selectedMovie.id}/videos?api_key=${API_KEY}&language=en-US`;
        const res = await api.get(url);
        setTrailer(res.data.results);
      }
    }
    getTrailer();
  }, [selectedMovie]);

  return (
    <Modal size="xl" show={showPopup} onHide={() => setShowPopup(false)} aria-labelledby="issue-detail-modal">
      <Modal.Body>
        <div className="video"><iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer && trailer[trailer.length - 1].key}?autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      </Modal.Body>
    </Modal>
  )
}

export default MovieDetail
