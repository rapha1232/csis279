import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
const GlobalSearch = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <img
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="Search"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search Globally..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          className="paragraph-regular no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none font-spaceGrotesk shadow-none outline-none"
        ></Input>
      </div>
    </div>
  );
};

export default GlobalSearch;
