import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { User2 } from "lucide-react";
import React from "react";
import PostedTab from "../components/shared/PostedTab";
import SavedTab from "../components/shared/SavedTab";
import useGetUser from "../hooks/useGetUser";

const Profile = () => {
  const user = useGetUser();
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <User2
            width={140}
            height={140}
            className="rounded-full object-cover text-dark100_light900"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.FirstName}</h2>

            <p className="paragraph-regular text-dark400_light800 mt-8">
              {user.Email}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="posted" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="posted" className="tab">
              Posted
            </TabsTrigger>
            <TabsTrigger value="saved" className="tab">
              Saved
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posted" className="flex w-full flex-col gap-6">
            <PostedTab />
          </TabsContent>
          <TabsContent value="saved" className="flex w-full flex-col gap-6">
            <SavedTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
