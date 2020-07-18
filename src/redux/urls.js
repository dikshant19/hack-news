export const FETCH_NEWS = (pageNum) =>
  `https://hn.algolia.com/api/v1/search?page=${pageNum}`;
