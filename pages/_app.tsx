import {AppProps} from 'next/app';
import {MapProvider} from '../context/map';

import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function App({Component, pageProps}: AppProps) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}

export default App;
