import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewsHomePage.css';
import { fetchHackNews, receiveData } from '../../redux/actions/fetchNewsData';
import Pagination from '../Pagination/Pagination';
import VoteChart from '../Charts/voteChart';
class NewsHomePage extends Component {
  state = {
    pageNum: localStorage.getItem('currentPage') || 1,
    chartData: [],
  };

  componentDidMount() {
    this.props.fetchHackNews(this.state.pageNum);
    this.handleChartData();
  }

  handleChartData = () => {
    const newsData = JSON.parse(localStorage.getItem('newsData'));
    const data = [];
    newsData &&
      newsData.hits.map((el) => {
        if (el.objectID && el.points) data.push([el.objectID, el.points]);
        return 0;
      });
    this.setState({ chartData: data });
  };

  actionTakenOnNews = (type, item) => {
    const newsData = JSON.parse(localStorage.getItem('newsData'));
    if (type === 'upVote') {
      newsData &&
        newsData.hits.map((el) => {
          if (el.objectID === item.objectID) {
            el.points = el.points + 1;
          }
          return 0;
        });
    } else if (type === 'hide') {
      newsData &&
        newsData.hits.map((el, i) => {
          if (el.objectID === item.objectID) {
            newsData.hits.splice(i, 1);
          }
          return 0;
        });
    }
    // Updating localStorage as No API is supported to update data
    localStorage.setItem('newsData', JSON.stringify(newsData));
    // Updating Redux store with updated value
    this.handleChartData();
    this.props.receiveData(newsData);
  };

  paginationCallback = (page) => {
    this.setState({ pageNum: page }, () => {
      this.handleChartData();
      this.props.fetchHackNews(this.state.pageNum);
    });
    this.handleChartData();
  };

  render() {
    const { newsData } = this.props;
    const news = newsData.data && newsData.data.hits;
    if (newsData.isFetching) {
      return <div className='loader'>Loading...</div>;
    }
    return (
      <div className='container'>
        <table role='table'>
          <thead>
            <tr>
              <th className='col-1'>Comments</th>
              <th className='col-2'>Vote Count</th>
              <th className='col-3'>UpVote</th>
              <th className='col-4'>News Details</th>
            </tr>
          </thead>
          <tbody>
            {news &&
              news.length > 0 &&
              news.map((item, index) => (
                <tr key={index}>
                  <td className='row-1'>{item.num_comments}</td>
                  <td className='row-2'>{item.points}</td>
                  <td
                    className='row-3 cursor'
                    onClick={() => this.actionTakenOnNews('upVote', item)}
                  >
                    ^
                  </td>
                  <td className='row-4'>
                    <div className='detail-box'>
                      {item.title}{' '}
                      <div className='subText'>
                        ({item.url}) by <span className='boldTxt'>author</span>{' '}
                        6 house ago [{' '}
                        <span
                          onClick={() => this.actionTakenOnNews('hide', item)}
                          className='boldTxt cursor'
                        >
                          hide
                        </span>{' '}
                        ]
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currPage={this.state.pageNum}
          paginationCallback={this.paginationCallback}
        />
        <VoteChart data={this.state.chartData} />
      </div>
    );
  }
}
const mapStateToProps = ({ newsData }) => {
  return {
    newsData,
  };
};
const mapDispatchToProps = {
  fetchHackNews,
  receiveData,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsHomePage);
