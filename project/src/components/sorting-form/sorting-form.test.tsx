import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { SortingType } from '../../const';
import { setSortingType } from '../../store/actions/data-actions';
import { makeMockRootState } from '../../utils/mocks';
import SortingForm from './sorting-form';

const mockState = makeMockRootState;
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SortingForm', () => {
  it('should render correctly', () => {
    const store = mockStore(mockState);

    const {container} = render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <SortingForm/>
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(container.querySelector('.places__option--active')).not.toBeNull();
  });

  it('should set active sorting type when user click on it', () => {
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <SortingForm/>
        </BrowserRouter>
      </Provider>,
    );

    const typeLink = screen.getByText(/Top rated first/i);
    userEvent.click(typeLink);

    expect(store.getActions())
      .toEqual([
        setSortingType(SortingType.TopRated),
      ]);
  });
});
