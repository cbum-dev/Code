import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

function WorkspaceHistory() {
  const { userDetails } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceHistory, setWorkspaceHistory] = useState<any[]>([]);

  const getAllWorkspaceHistory = async () => {
    try {
      const result = await convex.query(api.workspace.GetWorkspaceByUserId, {
        // @ts-ignore
        userId: userDetails?._id || "",
      });
      setWorkspaceHistory(result);
      console.log("Workspace History:", result);
    } catch (error) {
      console.error("Error fetching workspace history:", error);
    }
  };
  useEffect(() => {
    void (userDetails && getAllWorkspaceHistory());
  }, [userDetails]);
  return (
    <>
        <h2 className="text-lg  mb-3 ml-3">Chat History</h2>
      {workspaceHistory.length > 0 ? (
        <div className="space-y-2 ml-2">
          {workspaceHistory.map((workspace) => (
            <div
              key={workspace._id}
              className="hover:bg-gray-100 dark:hover:bg-neutral-800 py-1 px-2 rounded-lg "
            >
              <Link href={"/workspace/" + workspace?._id}>
                <h3 className="">{workspace.message[0].content}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 ml-3">No workspace history found.</p>
      )}
    </>
  );
}

export default WorkspaceHistory;
