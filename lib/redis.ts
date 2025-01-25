import Redis from "ioredis";

const redis = new Redis();

export async function getAllNotes() {
  const data = await redis.hgetall("notes");

  return await redis.hgetall("notes");
}

export async function addNote(data:any) {
  const uuid = Date.now().toString();
  await redis.hset("notes", [uuid], data);
  return uuid;
}

export async function updateNote(uuid:string, data:any) {
  await redis.hset("notes", [uuid], data);
}

export async function getNote(uuid: string) {
  try {
    const value = await redis.hget("notes", uuid);
    if (!value) {
      throw new Error(`Note with UUID ${uuid} not found.`);
    }
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`Failed to get note with UUID ${uuid}: ${error}`);
  }
}

export async function delNote(uuid:string) {
  return redis.hdel("notes", uuid);
}

export default redis;
