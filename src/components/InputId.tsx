/** @jsxImportSource @emotion/react */
import { SerializedStyles } from "@emotion/react";
import { useEffect, useState } from "react";

export default function InputId({
  socialType,
  address,
  groupId,
  nextId,
  setGroupId,
  setNextId,
  SubTitle,
  StyledInput,
  setActiveButton,
}: {
  socialType: string;
  groupId: string;
  address: any;
  nextId: string;
  setGroupId: Function;
  setNextId: Function;
  SubTitle: SerializedStyles;
  StyledInput: SerializedStyles;
  setActiveButton: Function;
}) {
  const [preAddress, setPreAddress] = useState(address);

  useEffect(() => {
    setPreAddress(address);
  }, []);

  return socialType == "MASK" ? (
    <div>
      <div css={SubTitle}>Next Id</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Write your next id"
        value={nextId}
        onChange={(e) => {
          setNextId(e.target.value);

          if (e.target.value.length > 0) {
            setActiveButton(true);
          } else {
            setActiveButton(false);
          }
        }}
        required
      />
    </div>
  ) : (
    <div>
      <div css={SubTitle}>Group Id</div>
      <input
        css={StyledInput}
        type="text"
        placeholder="Write your social group id"
        value={groupId}
        onChange={(e) => {
          setGroupId(e.target.value);

          if (e.target.value.length > 0 && preAddress != address) {
            setActiveButton(true);
          } else {
            setActiveButton(false);
          }
        }}
        required
      />
    </div>
  );
}
