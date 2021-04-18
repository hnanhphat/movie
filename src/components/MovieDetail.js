import React from 'react';
import { Modal } from "react-bootstrap";

const MovieDetail = ({ selectedMovie, showPopup, setShowPopup }) => {
  return (
    <Modal size="xl" show={showPopup} onHide={() => setShowPopup(false)} aria-labelledby="issue-detail-modal">
      <Modal.Header closeButton>
        <Modal.Title id="issue-detail-modal">{selectedMovie && selectedMovie.title}</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}

export default MovieDetail
