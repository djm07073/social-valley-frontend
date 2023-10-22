const CID = require("cids");

//store taskargs as useable variables
export const cidToBytes = (taskArgs: any) => {
  const cid = taskArgs.cid;

  //convert piece CID string to hex bytes
  const cidHexRaw = new CID(cid).toString("base16").substring(1);
  const cidHex = "0x00" + cidHexRaw;
  console.log("Hex bytes are:", cidHex);
  console.log("Complete!");
};
