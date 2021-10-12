import Main from '../main/main';

type AppProps = {
  roomCount: number;
}

function App({roomCount}: AppProps): JSX.Element {
  return (
    <Main roomCount={roomCount}/>
  );
}

export default App;
