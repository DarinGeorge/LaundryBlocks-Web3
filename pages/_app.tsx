import {AppProps} from 'next/app';
import {MapProvider} from '../context/map';

import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import {Amplify} from 'aws-amplify';
import awsExports from '../aws-exports';
import {MetamaskProvider} from '../context/metamask';
Amplify.configure(awsExports);

function App({Component, pageProps}: AppProps) {
  return (
    <MetamaskProvider>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </MetamaskProvider>
  );
}

export default App;
