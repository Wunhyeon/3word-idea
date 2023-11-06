import Crunker from "crunker";
import { useState } from "react";

// export

export default function InputAudio({
  setInputAudioBuffer,
}: {
  setInputAudioBuffer: (buffer: AudioBuffer) => void;
}) {
  const [recordedAudioBuffer, setRecordedAudioBuffer] =
    useState<AudioBuffer[]>();
  const [newAudioBuffer, setNewAudioBuffer] = useState<AudioBuffer[]>();

  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const target = e.currentTarget;
      if (!target.files || target.files.length < 1) {
        return;
      }
      const file = (target.files as FileList)[0];

      let crunker = new Crunker();

      const buffer = await crunker.fetchAudio(file);
      console.log("buffer : ", buffer);

      setInputAudioBuffer(buffer[0]);

      setRecordedAudioBuffer(buffer);
    } catch (err) {
      console.log("err : ", err);
    }
  };

  const concatAudio = async () => {
    try {
      let crunker = new Crunker();

      // // const buffers = await crunker.fetchAudio(...target.files);
      // const concatenation = crunker.concatAudio(buffers);
      // const output = crunker.export(concatenation);
      // const downloadFile = crunker.download(output.blob, "test");

      // console.log("downloadFIle : ", downloadFile);
    } catch (err) {
      console.log("err : ", err);
    }

    // console.log("concatenation : ", concatenation);

    // const output = crunker.export(concatenation,'test')
    // concat(buffers);
    // return buffers;
  };

  const cutAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (!target.files || target.files.length < 1) {
      return;
    }

    let crunker = new Crunker();

    const buffers = await crunker.fetchAudio(...target.files);
    const buffer = buffers[0];
    const sliceAudioResult = sliceAudio(buffer, 2500, 5900);
    const output = crunker.export(sliceAudioResult);
    const downloadFile = crunker.download(output.blob, "sliceTest");
  };

  function sliceAudio(
    buffer: AudioBuffer,
    start: number,
    end: number,
    fadeIn: number = 0,
    fadeOut: number = 0
  ): AudioBuffer {
    const _context: AudioContext = new AudioContext();
    const _sampleRate = 44100; /*smaple rate. 나중에 더 자세히 찾아보자 */
    if (start >= end)
      throw new Error(
        'Crunker: "start" time should be less than "end" time in sliceAudio method'
      );

    const length = (end / 1000 - start / 1000) * _sampleRate;
    const offset = (start / 1000) * _sampleRate;
    const newBuffer = _context.createBuffer(
      buffer.numberOfChannels,
      length,
      _sampleRate
    );

    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const inputData = buffer.getChannelData(channel);
      const outputData = newBuffer.getChannelData(channel);

      for (let i = 0; i < length; i++) {
        outputData[i] = inputData[offset + i];
      }
    }

    return newBuffer;
  }

  return (
    <div>
      <input onChange={onFileInputChange} type="file" accept="audio/*" />
      {/* <input onChange={cutAudio} type="file" accept="audio/*" multiple /> */}
    </div>
  );
}
