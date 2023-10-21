import { Web3Storage } from "web3.storage";

export const MakeStorageClient = async () => {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxMTAxQjAwMjdGM2VGRGRFNEFhYTAwNmVmZjhhRDhkRkQyYTZDZDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTcyMDgwMjYzOTksIm5hbWUiOiJ2YWxsZXkifQ.74ogIuXucrdgY_shIa_Cla1OcSp9uuUmZePakIpKuvI",
  });
};
