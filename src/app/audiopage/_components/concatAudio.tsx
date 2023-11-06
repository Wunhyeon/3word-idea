"use client";
import Crunker from "crunker";
import { useState } from "react";

export default function ConcatAudio({
  inputAudioBuffer,
  recordAudioBuffer,
}: {
  inputAudioBuffer: AudioBuffer;
  recordAudioBuffer: AudioBuffer;
}) {
  const [audioSrc, setAudioSrc] = useState<string>();

  const concatAudio = () => {
    const bufferList = [inputAudioBuffer, recordAudioBuffer];
    try {
      const crunker = new Crunker();
      const concat = crunker.concatAudio(bufferList);
      const output = crunker.export(concat);
      const audioURL = window.URL.createObjectURL(output.blob);
      setAudioSrc(audioURL);
      console.log("audioURL : ", audioURL);
    } catch (err) {
      console.log("err in concatAudio");
    }
  };

  return (
    <div>
      <button onClick={concatAudio}>Concat</button>
      {audioSrc && <audio src={audioSrc} controls></audio>}
      <audio src={audioSrc} />
    </div>
  );
}
