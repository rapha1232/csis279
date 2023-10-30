import React from "react";
import { useParams } from "react-router-dom";

const SingleEvent = () => {
  const { id } = useParams();
  return <div>SingleEvent {id}</div>;
};

export default SingleEvent;
