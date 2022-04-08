import React, { Component } from 'react';
import { fetchMovie, postReview } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button, ButtonGroup } from 'react-bootstrap';
import { BsStarFill, BsCardImage, BsStar } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);

        this.state = {
            details:{
                movieTitle: this.props.movieId,
                rating: 5,
                quote: ''
            }
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    updateRating(newRating){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails.rating = newRating;
        this.setState({
            details: updateDetails
        });
    }

    submitReview() {
        const {dispatch} = this.props;
        dispatch(postReview(this.state.details));
        this.setState({
            details: {
                movieTitle: this.props.movieId,
                rating: 5,
                quote: ''
            }
        })
    }

    render() {
        if (!this.props.selectedMovie) {
            return (<div className="loading-div">Loading....</div>);
        }

        return (
            <Card>
                <Card.Body>
                    <div className='movie-image'>
                    {this.props.selectedMovie.imageUrl ? 
                    <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail /> :
                    <BsCardImage size="200px"/>}
                    </div>
                <ListGroup>
                    <ListGroupItem><h2>{this.props.selectedMovie.title}</h2></ListGroupItem>
                    <ListGroupItem>
                        {this.props.selectedMovie.actors.map((actor, i) =>
                            <p key={i}>
                                <b>{actor.actorName}</b> {actor.characterName}
                            </p>)}
                    </ListGroupItem>
                    <ListGroupItem><h4><BsStarFill/>{this.props.selectedMovie.avgRating.toFixed(2)}</h4></ListGroupItem>
                </ListGroup>
                    {this.props.selectedMovie.reviews.map((review, i) =>
                        <p key={i}>
                            <b>{review.username}</b>&nbsp; {review.quote}
                            &nbsp;  <BsStarFill /> {review.rating}
                        </p>
                    )}
                    <Form className='form-horizontal review-form'>
                        <h4>Post Review</h4>
                        <Form.Group controlId="rating">
                        <ButtonGroup>
                            {(new Array(5)).fill().map((val, ind) => {
                                return <Button key={`ratingbutton${ind}`} onClick={() => this.updateRating(ind+1)}>{this.state.details.rating >= ind+1 ? <BsStarFill /> : <BsStar />}</Button>;
                            })}
                        </ButtonGroup>
                        </Form.Group>
                        <Form.Group controlId="quote">
                            <Form.Control onChange={this.updateDetails} value={this.state.details.quote} type="quote" placeholder="Enter review" />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.submitReview}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

