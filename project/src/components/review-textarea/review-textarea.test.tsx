import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMockRootState, makeReviewMock } from '../../utils/mocks';
import ReviewTextarea from './review-textarea';

const mockStore = configureMockStore();
const mockState = makeMockRootState();

const store = mockStore(mockState);
const history = createMemoryHistory();
const mockReview = makeReviewMock();
const review = mockReview.comment;

describe('Component: ReviewTextarea', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ReviewTextarea
            review={review}
            isPending={false}
            handleReviewAdding={() => review}
          />
        </BrowserRouter>
      </Provider>,
    );

    expect(container.querySelector('.reviews__textarea')).not.toBeNull();
    expect(screen.getByText(new RegExp(review, 'i'))).toBeInTheDocument();
  });
});
