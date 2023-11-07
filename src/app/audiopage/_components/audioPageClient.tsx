"use client";
import dynamic from "next/dynamic";
import Recorder from "./recoder";
import { useState } from "react";
const InputAudio = dynamic(() => import("./inputAudio"), {
  ssr: false,
});

const ConcatAudio = dynamic(() => import("./concatAudio"), { ssr: false });

export default function AudioPageClient() {
  const [inputAudioBuffer, setInputAudioBuffer] = useState<AudioBuffer>();
  const [recordAudioBuffer, setRecordAudioBuffer] = useState<AudioBuffer>();

  return (
    // <div>
    //   <InputAudio setInputAudioBuffer={setInputAudioBuffer} />
    //   <Recorder setRecordAudioBuffer={setRecordAudioBuffer} />
    //   {inputAudioBuffer && recordAudioBuffer ? (
    //     <div>
    //       <ConcatAudio
    //         inputAudioBuffer={inputAudioBuffer}
    //         recordAudioBuffer={recordAudioBuffer}
    //       />
    //     </div>
    //   ) : (
    //     <div>아직없음</div>
    //   )}
    // </div>

    <div>
      <InputAudio setInputAudioBuffer={setInputAudioBuffer} />
      <Recorder setRecordAudioBuffer={setRecordAudioBuffer} />
      {inputAudioBuffer && recordAudioBuffer ? (
        <div>
          <ConcatAudio
            inputAudioBuffer={inputAudioBuffer}
            recordAudioBuffer={recordAudioBuffer}
          />
        </div>
      ) : (
        <div>아직없음</div>
      )}
    </div>
  );
}
