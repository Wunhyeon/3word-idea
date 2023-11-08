"use client";
import dynamic from "next/dynamic";
import CustomRecorder from "./customRecoder";
import { useEffect, useState } from "react";
import AudioPlayerForCustom from "./audioPlayerForCustom";
import Crunker from "crunker";
import { sliceAudio } from "../_action/action";
import AudioPlayer from "@/components/audioPlayer/audioPlayer";

const InputAudio = dynamic(() => import("./inputAudio"), {
  ssr: false,
});

const ConcatAudio = dynamic(() => import("./concatAudio"), { ssr: false });

export default function AudioPageClient() {
  const [inputAudioBuffer, setInputAudioBuffer] = useState<AudioBuffer>(); // 외부 녹음된 파일의 audioBuffer
  const [inputAudioURL, setInputAudioURL] = useState<string>(); // 외부 녹음된 파일의 audio Source (URL)
  const [recordAudioBuffer, setRecordAudioBuffer] = useState<AudioBuffer>(); // 이번에 녹음하는 audioBuffer
  const [inputAudioStarted, setInputAudioStarted] = useState<boolean>(false); // 외부 녹음된 파일이 재생되었나? 재생되었으면 True로 바뀌고 그 후 바뀌지 않음.
  const [isRecordingOutPage, setIsRecordingOutPage] = useState<boolean>(false); // 지금 녹음을 하고있나? 녹음하면 true로 바뀌고 그 후 바뀌지 않음.
  const [currentTimeOutPage, setCurrentTimeOutPage] = useState<
    number | undefined
  >(); // 녹음파일의 currentTime
  const [outputAudioURL, setOutputAudioURL] = useState<string>();

  useEffect(() => {
    console.log("@@@ outpage!!!");
    if (inputAudioBuffer && currentTimeOutPage && recordAudioBuffer) {
      console.log("currentTimeOutPage : ", currentTimeOutPage);

      const crunker = new Crunker();
      // 1. input file slice
      const sliced = crunker.sliceAudio(
        inputAudioBuffer,
        0,
        currentTimeOutPage
      );
      // 2. concat sliced + record
      const concatted = crunker.concatAudio([sliced, recordAudioBuffer]);
      const output = crunker.export(concatted);
      const audioURL = window.URL.createObjectURL(output.blob);
      setOutputAudioURL(audioURL);

      ////////////////
      // // 1. input file slice
      // const slicedInput = sliceAudio(inputAudioBuffer, 0, currentTimeOutPage);
      // // 2. concat sliced + record
      // const concatted = concatAudio([slicedInput, recordAudioBuffer]);
      // const output = crunkerExport(concatted);
      // const audioURL = window.URL.createObjectURL(output.blob);
      // setOutputAudioURL(audioURL);
    }
  }, [recordAudioBuffer]);

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

    // 1. 녹음파일 불러오기 o
    // 2. 녹음파일을 불러오면 오디오 플레이어가 나옴. o
    // 3. 녹음된 파일 오디오 재생하면 밑에 욕밖기 버튼 생김. (욕밖기, 일시정지, 욕완료) o
    // 4. 욕밖기 버튼을 누르면 녹음된 파일 오디오 중지. 현재 재생시간 반환. & 녹음시작. & 녹음파일 오디오 플레이어 사라짐. o
    // 5. 욕완료 버튼 누르면 concat
    // 6. concat된 오디오파일 나타남.

    <div>
      {/* 1. 녹음파일 불러오기 */}
      {!isRecordingOutPage && (
        <InputAudio
          setInputAudioBuffer={setInputAudioBuffer}
          setInputAudioURL={setInputAudioURL}
        />
      )}
      {/* 2. 녹음파일 불러오면 오디오 플레이어가 나옴 */}
      {inputAudioURL && (
        <div>
          <span className={isRecordingOutPage ? "hidden" : ""}>녹음파일!</span>
          <AudioPlayerForCustom
            audioSrc={inputAudioURL}
            setInputAudioStarted={setInputAudioStarted}
            isRecordingOutPage={isRecordingOutPage}
            setCurrentTimeOutPage={setCurrentTimeOutPage}
          />
        </div>
      )}

      {/* 3. 레코딩. 불러온 녹음파일을 재생하면 그 때 등장. */}
      {inputAudioStarted && !outputAudioURL && (
        <CustomRecorder
          setRecordAudioBuffer={setRecordAudioBuffer}
          setIsRecordingOutPage={setIsRecordingOutPage}
        />
      )}

      {/* 최종 OutputURL이 나왔을 때 */}
      {outputAudioURL && (
        <div>
          <div>최종!</div>
          <AudioPlayer audioSrc={outputAudioURL} />
        </div>
      )}
    </div>
  );
}
