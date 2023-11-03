import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  onFilterChange: (newQ: string) => void;
}

const Filter = ({
  filters,
  otherClasses,
  containerClasses,
  onFilterChange,
}: Props) => {
  const params = new URLSearchParams(window.location.search);
  const [active, setActive] = useState(params.get("q") || "all");

  const handleFilterChange = (newQ: string) => {
    setActive(newQ);
    onFilterChange(newQ); // Call the provided callback to update the q parameter
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select onValueChange={(newQ) => handleFilterChange(newQ)}>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="background-light800_dark300 text-dark500_light700 body-regular">
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                onSelect={(event: React.SyntheticEvent<HTMLDivElement>) =>
                  handleFilterChange(item.value)
                }
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
