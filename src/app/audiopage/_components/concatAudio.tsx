"use client";
import Crunker from "crunker";
import { useEffect, useState } from "react";

export default function ConcatAudio({
  inputAudioBuffer,
  recordAudioBuffer,
  setOutputAudioURL,
}: {
  inputAudioBuffer: AudioBuffer;
  recordAudioBuffer: AudioBuffer;
  setOutputAudioURL: (audioURL: string) => void;
}) {
  useEffect(() => {
    console.log("concatAudio %%%%%");

    const concatted = concatAudio([inputAudioBuffer, recordAudioBuffer]);
    const output = crunkerExport(concatted);
    const audioURL = window.URL.createObjectURL(output.blob);
    setOutputAudioURL(audioURL);
    console.log("audioURL : ", audioURL);
  }, [inputAudioBuffer && recordAudioBuffer]);

  // const concatAudio = (bufferList: AudioBuffer[]) => {
  //   // const bufferList = [inputAudioBuffer, recordAudioBuffer];
  //   try {
  // const crunker = new Crunker();
  //     const concat = crunker.concatAudio(bufferList);
  // const output = crunker.export(concat);
  //     const audioURL = window.URL.createObjectURL(output.blob);
  //     setAudioSrc(audioURL);
  //     console.log("audioURL : ", audioURL);
  //   } catch (err) {
  //     console.log("err in concatAudio");
  //   }
  // };

  const concatAudio = (bufferList: AudioBuffer[]) => {
    const crunker = new Crunker();
    const concat = crunker.concatAudio(bufferList);
    return concat;
  };

  const crunkerExport = (buffer: AudioBuffer, type?: string | undefined) => {
    const crunker = new Crunker();
    const output = crunker.export(buffer, type);
    return output;
  };

  return (
    <div hidden>
      {/* <button onClick={concatAudio}>Concat</button>
      {audioSrc && <audio src={audioSrc} controls></audio>}
      <audio src={audioSrc} /> */}
    </div>
  );
}
