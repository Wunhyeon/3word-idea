import { useEffect, useRef, useState } from "react";

export default function AudioPlayerForCustom({
  audioSrc,
  setInputAudioStarted,
  isRecordingOutPage,
  setCurrentTimeOutPage,
}: {
  audioSrc: string | undefined;
  setInputAudioStarted: (isStarted: boolean) => void;
  isRecordingOutPage: boolean;
  setCurrentTimeOutPage: (currentTime: number | undefined) => void;
}) {
  // state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // ref
  const audioPlayer = useRef<HTMLAudioElement>(null); // reference our audio component
  const progressBar = useRef<HTMLInputElement>(null); // reference our progress bar
  const animationRef = useRef<number>(); // reference the animation

  useEffect(() => {
    if (isRecordingOutPage) {
      console.log("stopAndReturnCurrentTime() : ", stopAndReturnCurrentTime());

      setCurrentTimeOutPage(stopAndReturnCurrentTime());
    }
  }, [isRecordingOutPage]);

  const stopAndReturnCurrentTime = () => {
    setIsPlaying(false);
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      return audioPlayer.current?.currentTime;
    }
  };

  const togglePlayPause = () => {
    console.log("isPlaying : ", isPlaying);

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      setInputAudioStarted(true);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current || 0);
    }
  };

  const onLoadedMetadata = () => {
    const time = audioPlayer.current!.duration;
    const seconds = Math.floor(time);
    setDuration(seconds);
    if (progressBar.current) {
      progressBar.current.max = String(time);
    }
  };

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnSeconds}`;
  };

  const whilePlaying = () => {
    if (audioPlayer.current && progressBar.current) {
      const playCurrentTime = audioPlayer.current.currentTime; // 현재 재생되고 있는 audio의 currentTIme
      progressBar.current.value = String(playCurrentTime); // progressBar가 지속적으로 움직여주게 하기위해
      setCurrentTime(Number(playCurrentTime));
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = () => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value); // progressBar를 움직여서 음악 재생되고있는 부분을 바꿀때
      setCurrentTime(Number(progressBar.current.value));
    }
  };

  const backThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = String(
        Number(progressBar.current.value) - 30
      );
      changeRange();
    }
  };

  const forwardThirty = () => {
    if (progressBar.current) {
      progressBar.current.value = String(
        Number(progressBar.current.value) + 30
      );
      changeRange();
    }
  };

  return (
    <div
      className={`flex w-[700px] border-2 border-red-500 items-center ${
        isRecordingOutPage ? "hidden" : ""
      }`}
    >
      <audio
        preload="metadata"
        ref={audioPlayer}
        src={audioSrc}
        onLoadedMetadata={(e) => {
          console.log("e : ", e);
          onLoadedMetadata();
        }}
      />
      <button
        className="flex items-center cursor-pointer hover:bg-pink-500"
        onClick={backThirty}
      >
        ⬅ back 30
      </button>
      <button
        className="bg-pink-500
      w-20 h-20 text-2xl
      rounded-full
      text-yellow-300
      flex
      justify-center
      items-center
      "
        onClick={togglePlayPause}
      >
        {isPlaying ? "pause" : "play"}
      </button>
      <button
        className="flex items-center cursor-pointer hover:bg-pink-500"
        onClick={forwardThirty}
      >
        forward 30 ➡
      </button>

      {/* current time */}
      <div className="text-xl">{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          className=""
          type="range"
          defaultValue={0}
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className="text-xl">
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
}
