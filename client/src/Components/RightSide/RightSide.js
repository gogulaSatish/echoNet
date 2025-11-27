import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../Img/home.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Noti from "../../Img/noti.png";
import Comment from "../../Img/comment.png";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/AuthAction";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>

        <Link to={`/profile/${user._id}`}>
          <SettingsOutlinedIcon />
        </Link>
        <a
          href="https://www.snapchat.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Noti} alt="" />
        </a>
        {/* <img src={Comment} alt="" /> */}
        <button
          className="button"
          style={{ width: "7rem", height: "2rem" }}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>

      <TrendCard />

      <div className="button rg-button" onClick={() => setModalOpened(true)}>
        Share
      </div>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
