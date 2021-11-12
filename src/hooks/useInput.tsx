import { useRef, useState } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";

export const Input = styled.input`
  padding: 5px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  margin: 1rem;
  outline-width: 0;
  width: 80%;
`;

export const useInput = (
  style?: any,
  useDebounce = false
): [string, JSX.Element] => {
  const [value, setValue] = useState("");
  const [returnedValue, setReturnedValue] = useState<string>("");

  const debouncedSave = useRef(
    debounce((nextValue: string) => setReturnedValue(nextValue), 1000)
  ).current;

  const update = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    if (useDebounce) {
      debouncedSave(value);
    } else {
      setReturnedValue(value);
    }
  };

  const input = (
    <Input value={value} onChange={update} style={style} type="text" />
  );
  return [returnedValue, input];
};
