import React from "react";
import { useEffect, useState } from "react";
import style from "../styles/GifSearchBox.module.css";

function Gif({ selectedGifs }) {
  const [search, setSearch] = useState("trending");
  const [gifs, setGifs] = useState();

  const api_key = "FELpXCOR7GqhBofgneaZzHHmXIGIXtUS";

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=10`
    )
      .then((res) => res.json())
      .then((resData) => setGifs(resData));
  }, [search]);

  const onSelectedGif = (item) => {
    selectedGifs(item);
  };
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={style.main}>
      <div>
        <input type="text" onChange={handleInputChange} />
      </div>
      <div>
        {gifs
          ? gifs.data.map((item) => (
              <img
                key={item.id}
                src={item.images.downsized.url}
                alt={item.title}
                onClick={() => onSelectedGif(item)}
              />
            ))
          : null}
      </div>
    </div>
  );
}
export default Gif;
