import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortingTypes } from '../../const';
import { setSortingType } from '../../store/actions/action';
import { getSortingType } from '../../store/reducers/app-reducer/selectors';
import { getClassNames } from '../../utils';

function SortingForm(): JSX.Element {
  const sortingType = useSelector(getSortingType);
  const dispatch = useDispatch();

  const [isSortingOpened, setSortingOpened] = useState(false);

  const handleClickOnType = (type: SortingTypes) => {
    dispatch(setSortingType(type));
    setSortingOpened(false);
  };

  const renderSortingTypes =  Object.values(SortingTypes).map((type) => (
    <li
      className={getClassNames([
        'places__option',
        {'places__option--active': type === sortingType},
      ])}
      tabIndex={0}
      key={type}
      onClick={() => handleClickOnType(type)}
    >
      {type}
    </li>
  ));

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setSortingOpened(!isSortingOpened)}
      >
        {sortingType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={getClassNames([
          'places__options',
          'places__options--custom',
          {'places__options--opened': isSortingOpened},
        ])}
      >
        {renderSortingTypes}
      </ul>
    </form>
  );
}

export default SortingForm;
