import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Router as BrowserRouter, Switch } from 'react-router-dom';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter history={history}>
        <Footer/>
      </BrowserRouter>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect from "Favorites" to "Main" screen when user click to logo', () => {
    history.push(AppRoute.Favorites);

    render(
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path={AppRoute.Main}/>
          <Route exact path={AppRoute.Favorites}>
            <Footer/>
          </Route>
        </Switch>
      </BrowserRouter>,
    );

    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toEqual(AppRoute.Main);
  });
});
