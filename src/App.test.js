import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/configureStore';

const store = configureStore();

describe('<App />', () => {
  it('Renders <App /> component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });
});
