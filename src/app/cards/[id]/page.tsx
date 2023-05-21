import cardSchema from "@/app/schemas/cardSchema";

async function getData(id: string) {
  const apiKey = process.env.X_MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error("microCMS's API Key is not defined");
  }
  const res = await fetch(
    `https://stable-magic.microcms.io/api/v1/cards/${id}`,
    {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    }
  );
  if (!res.ok) {
    throw new Error("Error");
  }

  const data = await res.json();

  return cardSchema.parse(data);
}

export default async function Page({ params }: { params: { id: string } }) {
  const card = await getData(params.id);
  return (
    <>
      <h1>{card.name}</h1>
    </>
  );
}
