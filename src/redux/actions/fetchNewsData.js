import { REQUEST_DATA, RECEIVE_DATA } from '../constant';
import { FETCH_NEWS } from '../urls';

const requestData = () => {
  return {
    type: REQUEST_DATA,
  };
};

export const receiveData = (payload) => {
  return {
    type: RECEIVE_DATA,
    payload,
  };
};

export const fetchHackNews = (pageNum) => {
  return (dispatch) => {
    dispatch(requestData());
    return fetch(FETCH_NEWS(pageNum))
      .then((response) => response.json())
      .then((json) => {
        // Using localStorage as DB to store/update data
        if (
          localStorage.getItem('currentPage') === pageNum &&
          localStorage.getItem('newsData')
        ) {
          return dispatch(
            receiveData(JSON.parse(localStorage.getItem('newsData')))
          );
        } else {
          localStorage.setItem('newsData', JSON.stringify(json));
          localStorage.setItem('currentPage', pageNum);
        }
        return dispatch(receiveData(json));
      });
  };
};
