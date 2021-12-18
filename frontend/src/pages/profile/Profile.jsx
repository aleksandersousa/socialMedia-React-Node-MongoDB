import React, { useEffect, useState } from 'react';
import './Profile.css';

import axios from 'axios';
import { useParams } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { AddAPhoto, AddCircle, Cancel } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const IMGBB_URL = process.env.REACT_APP_IMGBB_URL;
  const API_KEY = process.env.REACT_APP_IMGBB_API_KEY;
  const [ user, setUser ] = useState({});
  const [ file, setFile ] = useState(null);
  const { user: currentUser, authActions } = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username]);

  const handleClick = () => {
    if (file) {
      let data = new FormData();
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = async () => {
        let base64 = fileReader.result;
        base64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
        data.append('image', base64);
        try {
          const res = await axios.post(IMGBB_URL, data, { params: { key: API_KEY } });
          const updatedUser = {
            userId: user._id,
            profilePicture: res.data.data.url,
          };
          await axios.put('/users/' + user._id, updatedUser);
          authActions.updateStorage(res.data.data.url);
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    <div className="profile">
      <Topbar />
      <div className="profileBody">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <label htmlFor="profileFile" className="coverImgContainer">
                <img src={user.coverPicture ? user.coverPicture : PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                <AddAPhoto className="ImgContainerIcon" />
              </label>
              <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
              <input style={{"display": "none"}} type="file" id="profileFile" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
              {file && (
                <div className="previewProfileContainer">
                  <img src={URL.createObjectURL(file)} alt="" className="profileImg" />
                  <Cancel style={{"color": "red"}} className="profileCancelImg" onClick={() => setFile(null)} />
                  <AddCircle style={{"color": "green"}} className="profileAddImg" onClick={handleClick} />
                </div>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
}
