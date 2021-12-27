import React, { useEffect, useState } from 'react';
import './Profile.css';

import axios from 'axios';
import { useParams } from 'react-router';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { AddAPhoto, AddCircle, Cancel, PhotoCamera } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const IMGBB_URL = process.env.REACT_APP_IMGBB_URL;
  const API_KEY = process.env.REACT_APP_IMGBB_API_KEY;
  const [ user, setUser ] = useState({});
  const [ fileProfile, setFileProfile ] = useState(null);
  const [ fileCover, setFileCover ] = useState(null);
  const { user: currentUser, authActions } = useContext(AuthContext);
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  }, [username]);

  const handleClick = (cover) => {
    if (fileProfile || fileCover) {
      let data = new FormData();
      let fileReader = new FileReader();
      fileReader.readAsDataURL(cover ? fileCover : fileProfile);
      fileReader.onload = async () => {
        let base64 = fileReader.result;
        base64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
        data.append('image', base64);
        try {
          const res = await axios.post(IMGBB_URL, data, { params: { key: API_KEY } });
          const updatedUser = cover 
            ? {
                ...user,
                userId: user._id,
                coverPicture: res.data.data.url,
              }
            : {
              ...user,
              userId: user._id,
              profilePicture: res.data.data.url,
            }
          await axios.put('/users/' + user._id, updatedUser);
          delete updatedUser['userId'];
          authActions.updateStorage(updatedUser);
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
              {user.username !== currentUser.username
                ? <img src={user.coverPicture ? user.coverPicture : PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                : fileCover
                  ? (
                    <>
                      <div className="previewCoverContainer">
                        <div></div>
                        <button className="coverCancelImg" onClick={() => setFileCover(null)}>
                          Cancelar
                        </button>
                        <button className="coverAddImg" onClick={() => handleClick(true)}>
                          Salvar Alterações
                        </button>
                      </div>
                      <img src={URL.createObjectURL(fileCover)} alt="" className="profileCoverImg" />
                    </>
                  )
                  : (
                    <div className="coverPictureContainer">
                      <img src={user.coverPicture ? user.coverPicture : PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                        <button className="changeCoverPictureButton" onClick={() => {
                          document.getElementById('coverFile').click();
                        }}>
                          Change cover picture
                          <PhotoCamera className="changeCoverButtonIcon"/>
                          <input 
                            style={{"display": "none"}} 
                            type="file" id="coverFile" 
                            accept=".png, .jpeg, .jpg" 
                            onChange={(e) => setFileCover(e.target.files[0])} 
                          />
                        </button>
                    </div>
                  )
              }
              {user.username !== currentUser.username 
                ? <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                : (
                  <label htmlFor="profileFile" className="coverImgContainer">
                    <AddAPhoto className="ImgContainerIcon" />
                    <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                  </label>
              )}
              <input 
                style={{"display": "none"}} 
                type="file" id="profileFile" 
                accept=".png, .jpeg, .jpg" 
                onChange={(e) => setFileProfile(e.target.files[0])} 
              />
              {fileProfile && (
                <div className="previewProfileContainer">
                  <img src={URL.createObjectURL(fileProfile)} alt="" className="profileImg" />
                  <Cancel style={{"color": "red"}} className="profileCancelImg" onClick={() => setFileProfile(null)} />
                  <AddCircle style={{"color": "green"}} className="profileAddImg" onClick={() => handleClick(false)} />
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
