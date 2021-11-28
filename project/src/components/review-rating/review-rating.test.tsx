import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeReviewMock } from '../../utils/mocks';
import ReviewRating from './review-rating';

const mockStore = configureMockStore();
const mockState = makeMockRootState();

const store = mockStore(mockState);
const history = createMemoryHistory();
const mockReview = makeReviewMock();
const rating = mockReview.rating;

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewRating
            rating={rating}
            isPending={false}
            handleRatingChange={() => String(rating)}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.reviews__rating-form')).not.toBeNull();
  });
});
