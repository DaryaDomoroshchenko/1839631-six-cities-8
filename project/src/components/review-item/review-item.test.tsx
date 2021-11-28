import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeReviewMock } from '../../utils/mocks';
import ReviewItem from './review-item';

const mockStore = configureMockStore();
const mockState = makeMockRootState();

const store = mockStore(mockState);
const history = createMemoryHistory();
const mockReview = makeReviewMock();
const comment = mockReview.comment;

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewItem review={mockReview}/>
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.reviews__item')).not.toBeNull();
    expect(screen.getByText(new RegExp(comment, 'i'))).toBeInTheDocument();
  });
});
