import React from "react";
import { Input } from "../../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setEventSearch, setTopicSearch } from "../../../app/store";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imageSrc: string;
  placeholder: string;
  otherClasses?: string;
  slice: "eventSearch" | "topicSearch";
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imageSrc,
  placeholder,
  otherClasses,
  slice,
}: CustomInputProps) => {
  const value = useSelector((state: RootState) => state[slice]);
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (slice === "eventSearch") {
      dispatch(setEventSearch(e.target.value));
    } else if (slice === "topicSearch") {
      dispatch(setTopicSearch(e.target.value));
    }
  };
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <img
          src={imageSrc}
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}

      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <img
          src={imageSrc}
          alt="search-icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
