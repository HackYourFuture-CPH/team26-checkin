import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Typography } from '@mui/material';
import meraj from './meraj.jpg'; // Import images for each testimonial
import yagmur from './yagmur.jpg';
import rumana from './rumana.jpg';

const testimonialsData = [
  {
    id: 1, // Add a unique identifier for each testimonial
    image: meraj,
    text: "It's so convenient to provide updates and see what everyone else is working on.",
    author: 'Meraj Sharifi, Team Lead',
  },
  {
    id: 2,
    image: yagmur,
    text: 'No more endless email chains or missed stand-up meetings.',
    author: 'Yagmur Nielsen, Software Engineer',
  },
  {
    id: 3,
    image: rumana,
    text: 'Being able to see past check-ins helps us track our progress and stay accountable.',
    author: 'Rumana, Designer',
  },
];

const Testimonial = ({ image, text, author }) => {
  return (
    <div className="testimonial-card">
      <img className="images" src={image} alt={author} />
      <div className="text">
        <Typography variant="body1">{text}</Typography>
        <Typography variant="body2" fontWeight="bold">
          {author}
        </Typography>
      </div>
      <div className="testimonial-invisible-card" />
    </div>
  );
};

// Define prop types for Testimonial component
Testimonial.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const Testimonials = () => {
  return (
    <div className="testimonial-section">
      {testimonialsData.map((testimonial) => (
        <Testimonial
          key={testimonial.id}
          image={testimonial.image}
          text={testimonial.text}
          author={testimonial.author}
        />
      ))}
    </div>
  );
};

export default Testimonials;
