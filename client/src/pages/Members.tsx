import React from "react";
import { useGetAllQuery } from "../app/store";
import MemberCard from "../components/cards/MemberCard";
import Loader from "../components/shared/Loader";
import { User } from "../types";
const Members = () => {
  const { data, isLoading, isSuccess } = useGetAllQuery();
  console.log(data);
  return (
    <div className="mt-10">
      <h2 className="h2-bold text-dark100_light900">Our Members</h2>
      <div className="mt-4 w-full flex-row gap-6 flex-wrap grid grid-cols-3 max-md:grid-cols-1">
        {isLoading && <Loader />}
        {isSuccess && data.length === 0 && <div>No members</div>}
        {isSuccess &&
          data.map((user: User) => (
            <MemberCard key={user.UserID} user={user} />
          ))}
      </div>
    </div>
  );
};

export default Members;
