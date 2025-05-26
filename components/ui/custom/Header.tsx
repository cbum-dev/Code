import React, { useContext } from "react";
import { Button } from "../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

function Header() {
  const { userDetails } = useContext(UserDetailContext);

  return (
    <div className="flex items-center border-b justify-between px-4 py-3  shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Bolt.new
      </h1>
      {!userDetails && (
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Login
          </Button>
          <Button
            variant="secondary"
            className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Sign Up
          </Button>
        </div>
      )}
      <Avatar>
        {userDetails ? (
          <>
            <AvatarImage
              src={userDetails.picture || "/default-avatar.png"}
              alt={userDetails.name || "User Avatar"}
            />
            <AvatarFallback className="text-xs">
              {userDetails.name ? userDetails.name[0].toUpperCase() : "U"}
            </AvatarFallback>
          </>
        ) : (
          <AvatarFallback className="text-xs">U</AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}

export default Header;
