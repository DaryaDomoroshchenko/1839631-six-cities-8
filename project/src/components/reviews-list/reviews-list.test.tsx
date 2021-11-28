import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { AuthStatus } from '../../const';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import ReviewsList from './reviews-list';

const mockStore = configureMockStore();
const mockStateWithAuth = makeMockRootState();
mockStateWithAuth.USER.authStatus = AuthStatus.auth;

const store = mockStore(mockStateWithAuth);
const history = createMemoryHistory();

const mockOffer = makeOfferMock();
const offerId = mockOffer.id;

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewsList offerId={offerId}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(container.querySelector('.reviews')).not.toBeNull();
  });

  it('should render ReviewForm correctly if user is authorized', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewsList offerId={offerId}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(container.querySelector('.reviews__form')).toBeInTheDocument();
  });
});
