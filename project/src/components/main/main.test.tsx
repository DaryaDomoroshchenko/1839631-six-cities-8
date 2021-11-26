import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState } from '../../utils/mocks';
import Main from './main';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly', () => {
    const store = mockStore(mockState);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Main/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(container.querySelector('.tabs')).not.toBeNull();
    expect(container.querySelector('.cities')).not.toBeNull();
  });
});
