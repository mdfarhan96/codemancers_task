import React from "react";
import { useState } from "react";
import user from "../image/user.jpg";
import style from "../styles/Input.module.css";
import Gif from "./Gif";

export default function Input() {
  const [toggleGifBox, setToggleGifBox] = useState(false);

  const [selectedGifShow, setSelectedGifShow] = useState();

  const [writtenPost, setWrittenPost] = useState("");

  const [posts, setPosts] = useState([]);

  const toggleGifSearchBox = () => {
    setToggleGifBox(!toggleGifBox);
  };

  const handleGifUpdate = (elem) => {
    setSelectedGifShow(elem);
    setToggleGifBox(!toggleGifBox);
  };

  const handlePosts = () => {
    if (writtenPost !== "" && selectedGifShow) {
      setPosts([
        ...posts,
        {
          text: writtenPost,
          image: selectedGifShow.images.downsized.url,
        },
      ]);
      setSelectedGifShow();
      setWrittenPost("");
    } else if (writtenPost === "" && !selectedGifShow) {
      alert("write something in post and select a gif");
    } else if (writtenPost === "") {
      alert("write something in post");
    } else if (!selectedGifShow) {
      alert("select a gif");
    }
  };

  return (
    <div>
      <div className={style.input}>
        <div>
          <img src={user} alt="userImg" />
          <textarea
            name="text"
            id="Post"
            placeholder=" Write something here...
                         ಇಲ್ಲಿ ಏನಾದರೂ ಬರೆಯಿರಿ..."
            value={writtenPost}
            onChange={(e) => setWrittenPost(e.target.value)}
          ></textarea>
        </div>

        {selectedGifShow && (
          <img src={selectedGifShow.images.downsized.url} alt="gif" />
        )}

        <div className={style.boxes}>
          <div onClick={toggleGifSearchBox}>SELECT GIF</div>
        </div>

        {toggleGifBox && <Gif selectedGifs={handleGifUpdate} />}

        <div className={style.buttonDiv}>
          <button onClick={handlePosts}>Post</button>
        </div>
      </div>
      <div className={style.posts}>
        {posts === []
          ? null
          : posts.map((post) => (
              <div className={style.post_text} key={post.image}>
                <p className={style.post_p}>{post.text}</p>
                <img
                  className={style.post_img}
                  src={post.image}
                  alt="this is gif "
                />
              </div>
            ))}
      </div>
    </div>
  );
}
