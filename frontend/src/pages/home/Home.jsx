import React /*,{ useContext }*/ from 'react';
import './Home.css';

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
// import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  // const { authActions } = useContext(AuthContext);
  // window.addEventListener('beforeunload', () => {
  //   authActions.logout();
  // });

  return (
    <div className="home">
      <Topbar />
      <div className="homeBody">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
