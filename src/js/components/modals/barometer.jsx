import React from 'react';
import PropTypes from 'prop-types';

class BarometerModal extends React.Component {

  render() {
    let { ratingAverage, ratingsTotal, countRatings, statementTitle } = this.props.modal.data;
    // count
    let count3 = countRatings[3];
    let count2 = countRatings[2];
    let count1 = countRatings[1];
    let count0 = countRatings[0];
    let count_1 = countRatings[-1];
    let count_2 = countRatings[-2];
    let count_3 = countRatings[-3];
    let positive = count1 + count2 + count3;
    let negative = count_1 + count_2 + count_3;
    // percent
    let percent_count3 = (100 / ratingsTotal * count3).toFixed(2);
    let percent_count2 = (100 / ratingsTotal * count2).toFixed(2);
    let percent_count1 = (100 / ratingsTotal * count1).toFixed(2);
    let percent_count0 = (100 / ratingsTotal * count0).toFixed(2);
    let percent_count_1 = (100 / ratingsTotal * count_1).toFixed(2);
    let percent_count_2 = (100 / ratingsTotal * count_2).toFixed(2);
    let percent_count_3 = (100 / ratingsTotal * count_3).toFixed(2);
    let percent_positive = (100 / ratingsTotal * positive).toFixed(2);
    let percent_negative = (100 / ratingsTotal * negative).toFixed(2);
    let title = statementTitle;

    return (
      <div>
        <h1>{ title }</h1>
        <p>{ `Average rating: ${ratingAverage}` }</p>
        <p>{ `Total votes: ${ratingsTotal}` }</p>
        <p>{ `Positive votes: ${positive} (${percent_positive}%)` }</p>
        <p>{ `Neutral votes: ${count0} (${percent_count0}%)` }</p>
        <p>{ `Negative votes: ${negative} (${percent_negative}%)` }</p>
        <p>{ `+3 votes: ${count3} (${percent_count3}%)` }</p>
        <p>{ `+2 votes: ${count2} (${percent_count2}%)` }</p>
        <p>{ `+1 votes: ${count1} (${percent_count1}%)` }</p>
        <p>{ ` 0 votes: ${count0} (${percent_count0}%)` }</p>
        <p>{ `-1 votes: ${count_1} (${percent_count_1}%)` }</p>
        <p>{ `-2 votes: ${count_2} (${percent_count_2}%)` }</p>
        <p>{ `-3 votes: ${count_3} (${percent_count_3}%)` }</p>
      </div>
    );
  }
}

BarometerModal.propTypes = {
  modal: PropTypes.object,
};

export default BarometerModal;
