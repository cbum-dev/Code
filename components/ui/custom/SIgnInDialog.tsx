import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

function SIgnInDialog({openDialog,closeDialog}: {openDialog: boolean, closeDialog: () => void}) {
  const {userDetails, setUserDetails} = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
      setUserDetails(userInfo.data);
      console.log("User Details Set:", userDetails);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      // Handle login failure here, e.g., show an error message
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Sign In
            
          </DialogTitle>
          <DialogDescription>
           <Button onClick={googleLogin}>Signin with google</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SIgnInDialog;
