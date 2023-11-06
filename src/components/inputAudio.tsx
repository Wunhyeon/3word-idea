import Crunker from "crunker";

// export

export default function InputAudio() {
  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("audioConcat !!!");
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];
    if (!target.files || target.files.length < 1) {
      return;
    }

    let crunker = new Crunker();

    const buffers = await crunker.fetchAudio(...target.files);
    const concatenation = crunker.concatAudio(buffers);
    const output = crunker.export(concatenation);
    const downloadFile = crunker.download(output.blob, "test");

    console.log("downloadFIle : ", downloadFile);

    // console.log("concatenation : ", concatenation);

    // const output = crunker.export(concatenation,'test')
    // concat(buffers);
    // return buffers;
  };

  return (
    <input onChange={onFileInputChange} type="file" accept="audio/*" multiple />
  );
}
