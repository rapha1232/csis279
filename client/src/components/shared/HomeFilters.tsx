import React, { useState } from "react";
import { MainFilters } from "../../constants/filters";
import { Button } from "../ui/button";

/**
 * This is a component that is used to add the main filters to the page.
 * @returns {JSX.Element} - A component that renders the main filters.
 */
const HomeFilters = ({
  onFilterChange,
}: {
  onFilterChange: (newQ: string) => void;
}) => {
  const params = new URLSearchParams(window.location.search);
  const [active, setActive] = useState(params.get("q") || "all");

  const handleFilterChange = (newQ: string) => {
    setActive(newQ);
    onFilterChange(newQ);
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {MainFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {
            handleFilterChange(item.value);
          }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
