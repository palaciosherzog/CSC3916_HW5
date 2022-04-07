import React, { Component } from 'react';
import { searchMovies } from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import { connect } from 'react-redux';
import { Image, Nav, Form, Button } from 'react-bootstrap';
import { BsStarFill, BsCardImage, BsSearch } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';

class MovieSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
    }

    handleClick = (movie) => {
        const { dispatch } = this.props;
        dispatch(setMovie(movie));
    };

    updateSearch(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    searchMovies() {
        const { dispatch } = this.props;
        dispatch(searchMovies(this.state.searchText));
    }

    render() {
        const MovieSearchList = ({ movieList }) => {
            if (!movieList) {
                return <div>Loading....</div>;
            }

            return (
                <div className="search-table">
                    {movieList.map((movie) => (
                        <LinkContainer to={'/movie/' + movie.title} onClick={() => this.handleClick(movie)}>
                            <Nav.Link>
                                <div className="search-table-row" key={`searchmovie${movie.title}`}>
                                    <div className="search-image">
                                        {movie.imageUrl ? <Image className="image" src={movie.imageUrl} thumbnail /> : <BsCardImage size="200px" />}
                                    </div>
                                    <div className="search-details">
                                        <h3>{movie.title}</h3>
                                        <h5>{movie.yearReleased}</h5>
                                        <h6>
                                            <BsStarFill glyph={'star'} /> {movie.avgRating.toFixed(2)}
                                        </h6>
                                        Starring:
                                        {movie.actors.map((actor, i) => (
                                            <p key={i}>{actor.actorName}</p>
                                        ))}
                                    </div>
                                </div>
                            </Nav.Link>
                        </LinkContainer>
                    ))}
                </div>
            );
        };

        return (
            <div>
                <Form className="form-horizontal search-form">
                    <Form.Group controlId="searchText">
                        <Form.Control
                            onChange={this.updateSearch}
                            value={this.state.searchText}
                            type="searchText"
                            placeholder="Enter search query"
                        />
                    </Form.Group>
                    <Button variant="primary" type="search" onClick={this.searchMovies}>
                        <BsSearch />
                    </Button>
                </Form>
                <MovieSearchList movieList={this.props.movies} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movie.movies
    };
};

export default connect(mapStateToProps)(MovieSearch);
