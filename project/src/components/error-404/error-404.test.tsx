import { render, screen } from '@testing-library/react';
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Error404 from './error-404';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeMockRootState } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockState = makeMockRootState();
const history = createMemoryHistory();

describe('Component: Error404', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <BrowserRouter history={history}>
        <Error404/>
      </BrowserRouter>,
    );

    const titleElement = getByText('404 Not Found');
    const linkElement = getByText('Back to main page');

    expect(titleElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect from "Error404" to "Main" screen when user click to link', () => {
    history.push('/non-existent-route');
    const store = mockStore(mockState);

    render(
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path={AppRoute.Main}/>
            <Route exact>
              <Error404/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>,
    );

    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toEqual(AppRoute.Main);
  });
});
