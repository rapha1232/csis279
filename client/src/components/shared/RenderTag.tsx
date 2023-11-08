import React from "react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
interface Props {
  url: string;
  name: string;
}

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
