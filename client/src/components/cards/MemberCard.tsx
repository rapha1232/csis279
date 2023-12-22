import React from "react";
import { User } from "../../types";
import Metric from "../shared/Metric";

/**
 * Functional component representing a member card.
 * @param {Object} props - Component props.
 * @param {User} props.user - Search parameter.
 * @returns {JSX.Element} - Rendered MemberCard component.
 */
const MemberCard = ({ user }: { user: User }) => {
  return (
    <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 max-w-[400px] col-span-1">
      <Metric
        icon="user"
        title=""
        textStyles="body-medium text-dark400_light700"
        iconSize={50}
      />
      <div className="mt-4 text-center">
        <h4 className="h3-bold text-dark200_light900 line-clamp-1">
          {user.FirstName} {user.LastName}
        </h4>
        <p className="body-regular text-dark500_light500 mt-2">{user.Email}</p>
      </div>
    </article>
  );
};

export default MemberCard;
