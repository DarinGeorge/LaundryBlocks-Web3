import {Navbar, Map, Requestor} from '../components';
import {styles} from '../styles/pages/Home.tailwind';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Map />
      <Requestor />
    </div>
  );
}
