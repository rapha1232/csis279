import React from "react";
import { useApodQuery } from "../app/store";
import Loader from "../components/shared/Loader";

const APOD = () => {
  const { data, isLoading, isSuccess } = useApodQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnReconnect: true,
    skip: false,
  });
  isLoading && <Loader />;
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          The Astronomy Picture of the Day!!
        </h1>
      </div>
      <div className="my-11 flex items-center justify-between gap-5 max-sm:flex-col">
        <h2 className="h2-bold">{data?.title}</h2>
      </div>
      <img src={data?.url} alt={data?.title} className="w-full" />
      <div className="my-10">
        <h4 className="h3-bold">{data?.explanation}</h4>
      </div>
    </>
  );
};

export default APOD;
