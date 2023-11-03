import { useParams } from "react-router-dom";

import React from "react";
import { useGetInfoQuery } from "../app/store";
import { User2 } from "lucide-react";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetInfoQuery(Number(id));

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <User2
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{data?.FirstName}</h2>

            <p className="paragraph-regular text-dark400_light800 mt-8">
              {data?.Email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
