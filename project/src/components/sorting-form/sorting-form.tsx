import { useState } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { SortingTypes } from '../../const';
import { setSortingType } from '../../store/actions/action';
import { getSortingType } from '../../store/reducers/app-reducer/selectors';
import { Actions } from '../../types/action';
import { getClassNames } from '../../utils';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setSortingTypeHandler(type: SortingTypes) {
    dispatch(setSortingType(type));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SortingForm({ setSortingTypeHandler }: PropsFromRedux): JSX.Element {
  const sortingType = useSelector(getSortingType);

  const [isSortingOpened, setSortingOpened] = useState(false);

  const handleClickOnType = (type: SortingTypes) => {
    setSortingTypeHandler(type);
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

export { SortingForm };
export default connector (SortingForm);
