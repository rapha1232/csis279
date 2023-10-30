"use client";
import React, { useState } from "react";
import { Input } from "../../../components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imageSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearcchBar = ({
  route,
  iconPosition,
  imageSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const [query, setQuery] = useState("");
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
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
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

export default LocalSearcchBar;
