import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {
  state = {
    maxPage: 50, // as specify in api doc that product count is 1000
  };
  handleClick = (type) => {
    const { maxPage } = this.state;
    const { currPage, paginationCallback } = this.props;
    const page = parseInt(currPage);
    if (type === 'next' && page < maxPage) {
      paginationCallback(page + 1);
    } else if (type === 'pre' && page > 1) {
      paginationCallback(page - 1);
    }
  };

  render() {
    const { currPage } = this.props;
    const { maxPage } = this.state;
    return (
      <div className='pagination'>
        <div> Current Page: {currPage}</div>
        <div>
          <span
            style={currPage <= 1 ? { color: '#808080' } : {}}
            onClick={() => this.handleClick('pre')}
          >
            Previous |{' '}
          </span>
          <span
            style={currPage >= maxPage - 1 ? { color: '#808080' } : {}}
            onClick={() => this.handleClick('next')}
          >
            Next
          </span>
        </div>
      </div>
    );
  }
}
export default Pagination;
