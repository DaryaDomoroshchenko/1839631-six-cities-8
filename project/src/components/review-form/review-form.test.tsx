import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import createAPI from '../../services/api';
import { State } from '../../types/state';
import { makeMockRootState, makeOfferMock } from '../../utils/mocks';
import ReviewForm from './review-form';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

const mockState = makeMockRootState();
const store = mockStore(mockState);
const history = createMemoryHistory();
const mockOffer = makeOfferMock();
const offerId = mockOffer.id;

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewForm offerId={offerId}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(container.querySelector('.reviews__form')).not.toBeNull();
  });

  it ('should change submit button status', () => {
    const comment = lorem.sentence(20);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewForm offerId={offerId}/>
        </BrowserRouter>
      </Provider>,
    );

    const ratingLabel = container.querySelector('label[for="4-stars"]') as HTMLLabelElement;
    const formTextarea = screen.getByTestId('form-textarea') as HTMLTextAreaElement;
    const sendButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    userEvent.type(formTextarea, comment);
    expect(sendButton.disabled).toBeTruthy();

    userEvent.click(ratingLabel);
    expect(sendButton.disabled).toBeFalsy();
  });
});
