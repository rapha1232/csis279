import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  setEventSearch,
  setQuestionSearch,
  setTopicSearch,
} from "../../../app/store";
import { Input } from "../../ui/input";

/**
 * CustomInputProps interface represents the props expected by the LocalSearchBar component.
 */
interface CustomInputProps {
  route: string;
  iconPosition: string;
  imageSrc: string;
  placeholder: string;
  otherClasses?: string;
  slice: "eventSearch" | "topicSearch" | "questionsSearch";
}

/**
 * LocalSearchBar component represents a custom search bar with dynamic functionality.
 *
 * @param {CustomInputProps} props - The properties passed to the component.
 * @returns {JSX.Element} The JSX for the LocalSearchBar component.
 */
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

  /**
   * handleChange function is called when the input value changes.
   * It dispatches the appropriate action to update the search value in the Redux store.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatch the appropriate action based on the specified slice
    if (slice === "eventSearch") {
      dispatch(setEventSearch(e.target.value));
    } else if (slice === "topicSearch") {
      dispatch(setTopicSearch(e.target.value));
    } else if (slice === "questionsSearch") {
      dispatch(setQuestionSearch(e.target.value));
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
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none text-dark100_light900"
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
