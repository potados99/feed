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
  await sleep(2000);
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
  return {
    id: raw.id,
    channel: raw.channel,

    // API가 주는 호환용 필드를 사용합니다.
    timestamp: raw.timestamp,
    date: raw.date,
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
