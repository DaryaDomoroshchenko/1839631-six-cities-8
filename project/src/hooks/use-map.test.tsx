import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import { MutableRefObject } from 'react';
import { makeMapLocationMock } from '../utils/mocks';
import useMap from './use-map';

const div = document.createElement('div');
const cityLocation = makeMapLocationMock();

describe('Hook: useMap', () => {
  it('should render correctly', () => {
    const ref: MutableRefObject<HTMLDivElement> = {
      current: div,
    };

    const { result } = renderHook(() => useMap(ref, cityLocation));
    const map = result.current;
    expect(map).toBeInstanceOf(Map);
  });
});
