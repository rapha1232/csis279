import { useGetInfoQuery } from "../app/store";

export const getName = (UserId: number) => {
  const { data } = useGetInfoQuery(UserId);
  return data?.FirstName + " " + data?.LastName;
};
