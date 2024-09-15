import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';




export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavouriteMovies: [],
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }

  




render() {
  const { movie, onBackClick } = this.props;
  ;

  return (

    <Container>
      <Row>
        <Col>
          <Card className="movie-view__card" style={{ width: '40rem' }}>
            <Card.Body>
              <Card.Img className="movie-view__image" variant="top" src={movie.ImageURL} />
              <Card.Title className="title-style">{movie.Title}</Card.Title>

              <Card.Text className="text-style">Genre: {movie.Genre.Name}
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">more info</Button>
                </Link>
              </Card.Text>

              <Card.Text className="text-style">Director: {movie.Director.Name}
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">more info</Button>
                </Link>
              </Card.Text>

              <Card.Text className="text-style">{movie.Description}</Card.Text>
              <Button variant="outline-warning" onClick={() => { onBackClick() }}>Back</Button>

             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
}

MovieView.propTypes = {
movie: PropTypes.shape({
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  ImageURL: PropTypes.string.isRequired,
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired
  })
}).isRequired,
onBackClick: PropTypes.func.isRequired
};