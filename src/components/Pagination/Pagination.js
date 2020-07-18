import React, { Component } from 'react';
import './Pagination.css';

class Pagination extends Component {
  state = {
    maxPage: 50, // as specify in api doc that product count is 1000
  };
  handleClick = (type) => {
    if (type === 'next' && this.props.currPage < this.state.maxPage) {
      this.props.paginationCallback(this.props.currPage + 1);
    } else if (type === 'pre' && this.props.currPage > 1) {
      this.props.paginationCallback(this.props.currPage - 1);
    }
  };

  render() {
    return (
      <div className='pagination'>
        <div> Current Page: {this.props.currPage}</div>
        <div>
          <span
            style={this.props.currPage <= 1 ? { color: '#808080' } : {}}
            onClick={() => this.handleClick('pre')}
          >
            Previos |{' '}
          </span>
          <span
            style={
              this.props.currPage >= this.state.maxPage - 1
                ? { color: '#808080' }
                : {}
            }
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
