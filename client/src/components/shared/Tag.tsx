import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
interface Props {
  url: string;
  name: string;
}

/**
 *
 * @param {string} url - The url of the tag
 * @param {string} name - The name of the tag
 * @returns {JSX.Element} - A tag with a link
 */
const RenderTag = ({ url, name }: Props) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-between gap-2"
    >
      <Badge className="w-full subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2">
        {name}
      </Badge>
    </Link>
  );
};

export default RenderTag;
