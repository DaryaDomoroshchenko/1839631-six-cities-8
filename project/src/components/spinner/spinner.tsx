import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div data-testid="spinner" className='spinner'>
      <div className="lds-dual-ring"/>
    </div>
  );
}

export default Spinner;
