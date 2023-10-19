export default function IdeaList({
  idea,
}: {
  idea: {
    id: string;
    title: string;
    description: string | null;
    words_ideas: {
      words_id: string;
    }[];
    profiles: {
      name: string | null;
    } | null;
  };
}) {
  return (
    <div className="border-2 border-indigo-600">
      {idea.words_ideas.map((word) => (
        <span className="mx-2  bg-lime-300 rounded-lg" key={word.words_id}>
          {word.words_id}
        </span>
      ))}
      <span>
        title : {idea.title}, description : {idea.description}
      </span>
      <span>Writer : {idea.profiles ? idea.profiles.name : "Anonymous"}</span>
    </div>
  );
}
