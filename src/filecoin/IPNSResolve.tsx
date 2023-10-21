import * as Name from "w3name";

export const IPNSResolve = async (name: string) => {
  const nameParsed = Name.parse(name);
  const revision = await Name.resolve(nameParsed);
  return revision;
};
