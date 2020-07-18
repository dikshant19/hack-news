export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

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
    return fetch(`https://hn.algolia.com/api/v1/search?page=${pageNum}`)
      .then((response) => response.json())
      .then((json) => {
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
