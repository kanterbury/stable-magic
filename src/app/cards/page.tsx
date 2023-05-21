import { z } from "zod";

const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const cardsSchema = z.object({
  contents: z.array(cardSchema),
});

async function getData() {
  const apiKey = process.env.X_MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error("microCMS's API Key is not defined");
  }
  const res = await fetch("https://stable-magic.microcms.io/api/v1/cards", {
    headers: { "X-MICROCMS-API-KEY": apiKey },
  });
  if (!res.ok) {
    throw new Error("Error");
  }

  const data = await res.json();

  return cardsSchema.parse(data);
}

export default async function Page() {
  const cards = await getData();
  return (
    <>
      <h1>Cards</h1>
      <li className="list-none">
        {cards.contents.map((card) => (
          <ul key={card.id}>{card.name}</ul>
        ))}
      </li>
    </>
  );
}
