export type Message = {
  id: string;
  channel: string;
  timestamp: number;
  date: string;
  body: string;
};

export async function getTopics(): Promise<Message[]> {
  return await getMessages("topics");
}

export async function getFeed(topic: string): Promise<Message[]> {
  return await getMessages(topic);
}

async function getMessages(channel: string): Promise<Message[]> {
  const res = await fetch(
    `https://collect.potados.com/${channel}?response=api`,
  );
  //await sleep(2000);
  const json = (await res.json()) as any[];

  return json.map((raw) => ({
    id: raw.id,
    channel: raw.channel,

    // API가 주는 호환용 필드를 사용합니다.
    timestamp: raw.timestamp,
    date: raw.date,
    body: raw.body,
  }));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
