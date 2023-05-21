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

  return res.json().then((data) => data.contents);
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <h1>Cards</h1>
      <p>{data[0].name}</p>
    </>
  );
}
