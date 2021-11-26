import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState } from '../../utils/mocks';
import OffersEmpty from './offers-empty';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
mockState.DATA.isOffersLoaded = true;

const history = createMemoryHistory();

describe('Component: OffersEmpty', () => {
  it('should render correctly when offers are empty', () => {
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <OffersEmpty/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});
