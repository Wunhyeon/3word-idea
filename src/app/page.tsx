import Image from "next/image";
import Card from "./card/page";
import List from "./list/page";

export default function Home() {
  return (
    <>
      <section className="h-full">
        <Card />
        <List limit={5} orderby="created_at" ascDsc="DSC" isVisible={true} />
      </section>
    </>
  );
}
