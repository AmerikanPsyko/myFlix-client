import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';

import './profile-view.scss';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favouriteMovies, setFavouriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://cfmyflix.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavouriteMovies(response.data.FavouriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  // const getUser = () => {
  //   let token = localStorage.getItem('token');
  //   let user = localStorage.getItem("user");
  //   axios.get(`https://cfmyflix.herokuapp.com/users/${user}`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then((response) => {
  //       setUsername(response.data.Username)
  //       setEmail(response.data.Email)
  //       setFavouriteMovies(response.data.FavouriteMovies)
  //       console.log(response.data)
  //     })
  //     .catch(e => {
  //       console.log('Error')
  //     });
  // }

  getUser();

  const handleDelete = () => {
    axios.delete(`https://cfmyflix.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The account ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Container id="profile-form">
      <Row><h4 className='h4-title'>Your profile</h4></Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
        </Row>
        <Row className="mt-5"><h4>Favorites:</h4></Row>
        <Row className="mt-3">
          <FavouriteMoviesView 
          movies={movies} 
          favouriteMovies={favouriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <UpdateView user={user}/>
        <Button className="delete-button d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}