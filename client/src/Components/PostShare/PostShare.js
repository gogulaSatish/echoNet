import React, { useState, useRef } from "react";
import "./PostShare.css";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  // Make sure serverPublic is correctly set
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // Image selection handler
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  // Reset function
  const reset = () => {
    setImage(null);
    setImagePath(null);
    desc.current.value = "";
  };

  // Handle form submission (upload image + post)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // If there is an image to upload
    if (image) {
      const data = new FormData();
      data.append("file", image);

      // Dispatch upload image action
      dispatch(uploadImage(data))
        .then((response) => {
          console.log("Image upload response:", response);

          // Backend returns the filename and image path
          const filenameFromServer = response.data.filename;

          // Set image path for preview
          setImagePath(response.data.imagePath);

          // Attach the image filename to the new post object
          newPost.image = filenameFromServer;

          // Now proceed to upload the post
          dispatch(uploadPost(newPost));
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    } else {
      // If no image, just upload the post
      dispatch(uploadPost(newPost));
    }

    // Reset after submitting
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? ` ${serverPublic}/images/${user.profilePicture}`
            : serverPublic + "/images/defaultProfile.png"
        }
        alt="Profile"
      />

      <div>
        <input
          type="text"
          placeholder="Write a caption..."
          required
          ref={desc}
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <PhotoOutlinedIcon />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <PlayCircleOutlineIcon />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <LocationOnOutlinedIcon />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <CalendarMonthOutlinedIcon />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <CloseOutlinedIcon onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}

        {/* Display the uploaded image after the post is created */}
        {imagePath && (
          <div className="uploadedImage">
            <img
              src={serverPublic + imagePath} // Correct image URL
              alt="Uploaded"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
