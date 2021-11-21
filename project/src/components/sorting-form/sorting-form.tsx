import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { SortingTypes } from '../../const';
import { setSortingType } from '../../store/actions/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';
import { getClassNames } from '../../utils';

const mapStateToProps = ({ APP }: State) => ({
  sortingType: APP.sortingType,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  setSortingTypeHandler(type: SortingTypes) {
    dispatch(setSortingType(type));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SortingForm({ sortingType, setSortingTypeHandler }: PropsFromRedux): JSX.Element {
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
