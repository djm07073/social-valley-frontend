import * as Name from "w3name";

export function saveSigningKey(name: Name.WritableName) {
  const bytes = name.key.bytes;
  console.log(bytes);
  return bytes;
}
