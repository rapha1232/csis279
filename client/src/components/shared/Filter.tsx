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

/**
 * This is a component that is used to add filters to the page.
 * @property {Array<{ name: string; value: string }>} filters - An array of filter options with a name and value.
 * @property {string} [otherClasses] - Additional CSS classes to be applied to the filter component.
 * @property {string} [containerClasses] - Additional CSS classes for the container of the filter component.
 * @property {(newQ: string) => void} onFilterChange - Callback function triggered when the filter value changes.
 */
const Filter = ({
  filters,
  otherClasses,
  containerClasses,
  onFilterChange,
}: Props) => {
  // Make sure the q parameter is set to all if it is not set
  const params = new URLSearchParams(window.location.search);
  const [active, setActive] = useState(params.get("q") || "all");

  /**
   * This function is used to update the q parameter in the url and call the provided callback.
   * @param {string} newQ - The new value of the q parameter
   */
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
