import Crunker from "crunker";

export const sliceAudio = (
  buffer: AudioBuffer,
  start: number,
  end: number,
  fadeIn: number = 0,
  fadeOut: number = 0
): AudioBuffer => {
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
};

export const concatenatingAudio = (bufferList: AudioBuffer[]) => {
  const crunker = new Crunker();
  const concat = crunker.concatAudio(bufferList);
  return concat;

  // const audioURL = window.URL.createObjectURL(output.blob);
  // setAudioSrc(audioURL);
  // console.log("audioURL : ", audioURL);
};

export const crunkerExport = (
  buffer: AudioBuffer,
  type?: string | undefined
) => {
  const crunker = new Crunker();
  const output = crunker.export(buffer, type);
  return output;
};
