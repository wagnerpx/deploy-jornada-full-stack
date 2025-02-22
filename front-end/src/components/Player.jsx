import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faBackwardStep,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const formatTime = (timeInSecunds) => {
  const minutes = Math.floor(timeInSecunds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(timeInSecunds - minutes * 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const timeInSecunds = (timeString) => {
  const splitArray = timeString.split(":");
  const minutes = Number(splitArray[0]);
  const segunds = Number(splitArray[1]);

  return segunds + minutes * 60;
};

const Player = ({
  duration,
  randomIdFromArtist,
  randomId2FromArtist,
  audio,
}) => {
  // const audioplayer
  const audioPlayer = useRef();
  const progressBar = useRef();
  const [isPlaying, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(formatTime(0));
  const durationInSecunds = timeInSecunds(duration);

  // console.log(durationInSecunds);

  // função
  // console.log(audioPlayer.current.Play());
  const playPause = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();

    setPlaying(!isPlaying);
    setCurrentTime(formatTime(audioPlayer.current.currentTime));

    // console.log(formatTime(audioPlayer.current.currentTime));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying)
        setCurrentTime(formatTime(audioPlayer.current.currentTime));

      progressBar.current.style.setProperty(
        "--_progress",
        (audioPlayer.current.currentTime / durationInSecunds) * 100 + "%"
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // setIsPlaying(false)

  return (
    <div className="player">
      <div className="player__controllers">
        <Link to={`/song/ ${randomIdFromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faBackwardStep} />
        </Link>

        <FontAwesomeIcon
          className="player__icon player__icon--play"
          icon={isPlaying ? faCirclePause : faCirclePlay}
          onClick={() => playPause()}
        />

        <Link to={`/song/ ${randomId2FromArtist}`}>
          <FontAwesomeIcon className="player__icon" icon={faForwardStep} />
        </Link>
      </div>

      <div className="player__progress">
        <p>{currentTime}</p>

        <div className="player__bar">
          <div ref={progressBar} className="player__bar-progress"></div>
        </div>

        <p>{duration}</p>
      </div>

      <audio ref={audioPlayer} src={audio}></audio>
    </div>
  );
};

export default Player;
