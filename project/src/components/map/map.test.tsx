import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import { makeMapLocationMock, makeMapPointnMock, makeMockRootState } from '../../utils/mocks';
import Map from './map';

const mockState = makeMockRootState();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Map', () => {
  const store = mockStore(mockState);
  const activePoint = makeMapPointnMock();
  const points = [activePoint, makeMapPointnMock(), makeMapPointnMock()];
  const activePointId = activePoint.id;
  const mapCenterPoint = makeMapLocationMock();

  it('should render correctly', () => {
    const { container } = render(
      <Provider store={ store }>
        <BrowserRouter history={ history }>
          <Map
            points={points}
            activePointId={activePointId}
            mapCenterPoint={mapCenterPoint}
          />
        </BrowserRouter>
      </Provider>);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
  });
});
