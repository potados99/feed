export type Message = {
  id: string;
  channel: string;
  timestamp: number; // createdAt 의 timestamp
  createdAt: string;
  updatedAt?: string;
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
  const json = (await res.json()) as any[];

  return json.map(parseMessage);
}

export async function getMessage(
  channel: string,
  messageId?: string,
): Promise<Message | undefined> {
  if (messageId == null) {
    return undefined;
  }

  const res = await fetch(
    `https://collect.potados.com/${channel}/${messageId}?response=api`,
  );
  const json = (await res.json()) as any;

  return parseMessage(json);
}

function parseMessage(raw: any): Message {
  const date = (d: Date) =>
    new Date(d).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  const commits = raw.commits as any[];
  const firstCommit = commits[0];
  const lastCommit = commits.filter((c) => c.type === "patch").pop();

  return {
    id: raw.id,
    channel: raw.channel,
    timestamp: raw.timestamp,
    createdAt: date(firstCommit.committedAt),
    updatedAt: lastCommit ? date(lastCommit.committedAt) : undefined,
    body: raw.body,
  };
}

export async function postMessage(channel: string, body: string) {
  await fetch(`https://collect.potados.com/${channel}`, {
    method: "POST",
    body,
  });
}

export async function editMessage(
  channel: string,
  messageId: string,
  body: string,
) {
  await fetch(`https://collect.potados.com/${channel}/${messageId}`, {
    method: "PATCH",
    body,
  });
}

export async function submitMessage(
  topic: string,
  messageId: string | undefined,
  text: string,
) {
  if (messageId) {
    await editMessage(topic, messageId, text);
  } else {
    await postMessage(topic, text);
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
