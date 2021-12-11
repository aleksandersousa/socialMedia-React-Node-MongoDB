import React from 'react';
import './Home.css';

import Topbar from '../components/topbar/Topbar';
import Sidebar from '../components/sidebar/Sidebar';
import Feed from '../components/feed/Feed';
import Rightbar from '../components/rightbar/Rightbar';

export default function Home() {
  return (
    <div className="home">
      <Topbar />
      <body className="homeBody">
        <Sidebar />
        <Feed />
        <Rightbar />
      </body>
    </div>
  );
}
