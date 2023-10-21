import * as Name from "w3name";

export async function loadSigningKey(bytes: Uint8Array) {
  const name = await Name.from(bytes);
  return name;
}
