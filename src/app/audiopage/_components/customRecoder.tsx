"use client";

import { useEffect, useState } from "react";

export default function CustomRecorder({
  setRecordAudioBuffer,
  setIsRecordingOutPage,
}: {
  setRecordAudioBuffer: (audioBuffer: AudioBuffer) => void;
  setIsRecordingOutPage: (is: boolean) => void;
}) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPause, setIsPause] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false); // 한번 시작하면 True로 바뀌고, 그 뒤에 값 안바뀜

  useEffect(() => {
    const initMediaRecorder = async () => {
      console.log("initMediaRecorder");

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const getMediaRecorder = new MediaRecorder(mediaStream);
          getMediaRecorder.ondataavailable = (e) => {
            console.log("e.data : ", e.data);
            chunks.push(e.data);
          };
          setMediaRecorder(getMediaRecorder);
        } catch (err) {
          console.log("err in initMediaRecorder : ", err);
        }
      }
    };
    initMediaRecorder();

    setAudioContext(new AudioContext());
  }, []);

  const recordStart = () => {
    console.log(mediaRecorder);
    if (mediaRecorder) {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      setIsRecording(true);
      setIsRecordingOutPage(true);
      setIsStarted(true);
    }
  };

  const recordPause = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      console.log(mediaRecorder.state);
      setIsRecording(false);
      setIsPause(!isPause);
    }
  };

  const recordOnPause = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      console.log(mediaRecorder.state);
      setIsRecording(true);
      setIsPause(!isPause);
    }
  };

  const recordStop = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      setIsRecording(false);

      mediaRecorder.onstop = async (e) => {
        console.log("mediaRecorder onstop");
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const arrayBuffer = await blob.arrayBuffer();
        console.log("arrayBuffer : ", arrayBuffer);
        console.log("audioContext : ", audioContext);

        if (audioContext) {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          setRecordAudioBuffer(audioBuffer);
        }
      };
    }

    setChunks([]);
    setIsRecording(false);
  };

  return (
    <div className="flex">
      {!isStarted && (
        <button
          className={`${
            isRecording ? "bg-red-500" : ""
          } w-30 h-30 rounded-full bg-red-500`}
          onClick={recordStart}
        >
          욕 갈겨버려~ (Record)
        </button>
      )}

      {/* {isStarted && isPause ? (
        <button onClick={recordOnPause}>다시 욕해</button>
      ) : (
        <button onClick={recordPause}>잠깐 쉬어</button>
      )}

      {isStarted && <button onClick={recordStop}>욕 다했어. 시원하다.</button>} */}

      {isStarted && (
        <div className="flex gap-5">
          {isPause ? (
            <button
              className="w-30 h-30 rounded-full bg-red-300"
              onClick={recordOnPause}
            >
              다시 욕해
            </button>
          ) : (
            <button
              className="w-30 h-30 rounded-full bg-red-300"
              onClick={recordPause}
            >
              잠깐 쉬어
            </button>
          )}
          <button
            className="w-30 h-30 rounded-full bg-blue-500"
            onClick={recordStop}
          >
            욕 다했어. 시원하다.
          </button>
        </div>
      )}
    </div>
  );
}
