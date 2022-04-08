import React, { Component } from 'react';
import { fetchMovies } from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import { connect } from 'react-redux';
import { Image, Nav } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill, BsCardImage } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchMovies());
    }

    handleSelect(selectedIndex, e) {
        const { dispatch } = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const { dispatch } = this.props;
        dispatch(setMovie(movie));
    };

    render() {
        const MovieListCarousel = ({ movieList }) => {
            if (!movieList) {
                return <div className='loading-div'>Loading....</div>;
            }

            return (
                <Carousel onSelect={this.handleSelect}>
                    {movieList.map((movie) => {console.log(movie); return (
                        <Carousel.Item key={movie._id}>
                            <div>
                                {/* originally linked to movie._id */}
                                <LinkContainer to={'/movie/' + movie.title} onClick={() => this.handleClick(movie)}>
                                    <Nav.Link>
                                        <div className="carousel-image">
                                            {movie.imageUrl ? (<Image className="image" src={movie.imageUrl} thumbnail />) : (<BsCardImage size="200px" />)}
                                        </div>
                                    </Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>{movie.title}</h3>
                                <div>
                                    <h5>{movie.yearReleased}</h5>
                                    <div><BsStarFill glyph={'star'} /> {movie.avgRating ? movie.avgRating.toFixed(1) : 'Not Rated'}</div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )})}
                </Carousel>
            );
        };

        return <MovieListCarousel movieList={this.props.movies} />;
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movie.movies
    };
};

export default connect(mapStateToProps)(MovieList);
