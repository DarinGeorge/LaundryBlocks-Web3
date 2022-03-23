import {AppProps} from 'next/app';
import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {MapProvider} from '../context/map';

function App({Component, pageProps}: AppProps) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}

export default App;
