import React from "react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
interface Props {
  _id: number;
  name: string;
  totalQ?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQ, showCount }: Props) => {
  return (
    <Link to={`/article/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>
      {showCount && (
        <p className="small-medium text-dark500_light700 ">{totalQ}</p>
      )}
    </Link>
  );
};

export default RenderTag;
