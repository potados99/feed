export type Message = {
  id: string;
  channel: string;
  timestamp: number;
  date: string;
  userAgent: string;
  sourceId: string;
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
  // await sleep(2000);
  return await res.json();
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
