import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../Img/home.png";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Noti from "../../Img/noti.png";
import Comment from "../../Img/comment.png";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>

        <Link to={`/profile/${user._id}`}>
          <SettingsOutlinedIcon />
        </Link>
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
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
