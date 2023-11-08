"use client";

import { useEffect, useState } from "react";

export default function Recorder({
  setRecordAudioBuffer,
}: {
  setRecordAudioBuffer: (audioBuffer: AudioBuffer) => void;
}) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [recordingState, setRecordingState] = useState<"recording" | "stopped">(
    "stopped"
  );

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
      alert("start!");

      mediaRecorder.start();
      console.log(mediaRecorder.state);
      setRecordingState("recording");
    }
  };

  const recordPause = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      console.log(mediaRecorder.state);
    }
  };

  const recordOnPause = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      console.log(mediaRecorder.state);
    }
  };

  const recordStop = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);

      mediaRecorder.onstop = async (e) => {
        console.log("mediaRecorder onstop");
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        const arrayBuffer = await blob.arrayBuffer();
        console.log("arrayBuffer : ", arrayBuffer);
        console.log("audioContext : ", audioContext);

        if (audioContext) {
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          setRecordAudioBuffer(audioBuffer);
          alert(`audioBuffer : ${audioBuffer}`);
        }
      };
    }

    setChunks([]);
    setRecordingState("stopped");
  };

  return (
    <div>
      <button
        className={`${recordingState === "recording" ? "bg-red-500" : ""}`}
        onClick={recordStart}
      >
        Record
      </button>
      <button onClick={recordPause}>Pause</button>
      <button onClick={recordOnPause}>on Pause</button>
      <button onClick={recordStop}>Stop</button>
    </div>
  );
}
