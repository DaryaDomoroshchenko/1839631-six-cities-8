import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router as BrowserRouter } from 'react-router-dom';
import Footer from './footer';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter history={history}>
        <Footer />
      </BrowserRouter>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
