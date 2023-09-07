import { Input } from "./input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setText } from "../app/store";
import React from "react";
export const Search = () => {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.text);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    dispatch(setText(newText)); // Dispatch the action to update the text state
  };
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        value={text}
        onChange={handleInputChange}
      />
    </div>
  );
};
