"use client";
import React, { useEffect, useState } from "react";
import UsersCard from "./UsersCard";
import Loader from "./Loader/Loader";
import NoDataFound from "./NoDataFound/NoDataFound";

import { Users } from "lucide-react";

const FeaturedProvider = () => {
  const [users, setUsers] = useState({ users: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // get all users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiKey}/user/all-users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data?.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [apiKey]);

  return (
    <div className="xl:container xl:mx-auto px-2 xl:px-0 py-20">
      {/* title  */}
      <div>
        <h2 className="text-center text-xl md:text-3xl text-textHeadingColor font-bold">
          Featured Service Providers
        </h2>
        <p className=" max-w-xl mx-auto text-center text-gray-600 mt-2 mb-6 text-sm sm:text-base">
          Meet our top-rated professionals. Verified, skilled, and ready to
          serve you.
        </p>
      </div>

      {/* provider list  */}
      <div>
        <div>
          <div>
            {isLoading && <Loader />}

            {!isLoading && error && (
              <div className="flex justify-center py-10">
                <p className="bg-red-100 text-red-600 px-4 py-2 rounded-lg shadow">
                  ❌ {error}
                </p>
              </div>
            )}

            {!isLoading && !error && users?.users?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {users?.users?.map((user, index) => (
                  <UsersCard user={user} key={index} />
                ))}
              </div>
            )}

            {!isLoading && !error && users?.users?.length === 0 && (
              <NoDataFound
                icon={<Users />}
                text="No Users Found"
                subText="We couldn’t find any users at the moment. Please try again later."
              />
            )}

          </div>
        </div>

        {users?.users?.length > 8 && (
          <div className="text-center mt-5">
            <button className="btn">See all providers</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProvider;
