// @ts-nocheck
'use client'
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "../separator";
import { Loader2 } from "lucide-react";
import { useConvex } from "convex/react";


function SIgnInDialog({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: () => void;
}) {
  const { setUserDetails } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.createUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const convex = useConvex();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        console.log("Login Success:", tokenResponse);
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        
        console.log("User Info:", userInfo.data);
        const user = userInfo.data;
        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4(),
        });
        
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
        }
        const result = await convex.query(api.users.GetUser, {
                email: user?.email || "",
              });
              
        setUserDetails(result);
        closeDialog();
      } catch (error) {
        console.error("Error during login:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Login Failed:", error);
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Welcome to Bolt.new
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue to your account
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-center">
            <Button
              onClick={googleLogin}
              variant="outline"
              className="w-full max-w-xs px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <FcGoogle className="h-5 w-5" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Continue with Google
                  </span>
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3 my-2">
            <Separator className="flex-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SIgnInDialog;