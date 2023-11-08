// import AudioPageClient from "./_components/audioPageClient";
import dynamic from "next/dynamic";
import Recorder from "./_components/customRecoder";
const AudioPageClient = dynamic(() => import("./_components/audioPageClient"), {
  ssr: false,
});

export default async function AudioPage() {
  return (
    <div>
      <AudioPageClient />
    </div>
  );
}
