import React from "react";
import RenderTag from "../RenderTag";
import { Link } from "react-router-dom";
import { useArticlesQuery, useGetEventsQuery } from "../../../app/store";

const RightSideBar = () => {
  const { data, isLoading, isSuccess } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    pollingInterval: 5000,
    skip: false,
  });

  const {
    data: articles,
    isLoading: isArticleLoading,
    isSuccess: isArticleSuccess,
  } = useArticlesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    pollingInterval: 5000,
    refetchOnFocus: true,
    skip: false,
  });
  return (
    <section className="background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Upcoming Events</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {isLoading && <div>Loading...</div>}
          {isSuccess && data.length === 0 && <div>No Events Yet</div>}
          {isSuccess &&
            data.slice(0, 5).map((event) => (
              <Link
                to={`/events/${event.EventID}`}
                key={event.EventID}
                className="flex cursor-pointer items-center justify-between gap-7"
              >
                <p className="body-medium text-dark500_light700">
                  {event.Title}
                </p>
                <img
                  src="/assets/icons/chevron-right.svg"
                  alt="chevron-right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            ))}
        </div>
      </div>
      <div className="mt-14">
        <h3 className="h3-bold text-dark200_light900">Articles of the day</h3>
        <div className="mt-7 flex flex-col gap-4">
          {isArticleLoading && <div>Loading...</div>}
          {isArticleSuccess && articles.length === 0 && (
            <div>No Events Yet</div>
          )}
          {isArticleSuccess &&
            articles.map((article) => (
              <RenderTag
                key={article.id}
                url={article.url}
                name={article.title}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
