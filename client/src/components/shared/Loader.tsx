import React from "react";

/**
 * Component for rendering a loader.
 * @returns {Object} An object containing a loader.
 */
const Loader = () => (
  <div className="flex-center w-full">
    <img
      src="/assets/icons/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin"
    />
  </div>
);

export default Loader;
