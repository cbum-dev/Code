import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import WorkspaceHistory from "./WorkspaceHistory";
import {
  MessageCircleCode,
  Settings,
  HelpCircle,
  CreditCard,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserDetailContext } from "@/context/UserDetailContext";
import React, { useContext } from "react";
import SIgnInDialog from "./SIgnInDialog";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();
  // @ts-ignore
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarHeader className="mt-12">
          <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
            <MessageCircleCode className="h-5 w-5" />
            <span>Start a new chat</span>
          </Button>
        </SidebarHeader>

        <SidebarGroup />
        <WorkspaceHistory />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="space-y-2 p-4">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <HelpCircle className="h-4 w-4" />
          Help Center
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <CreditCard className="h-4 w-4" />
          My Subscription
        </Button>

        <Separator className="my-2" />

        {userDetails ? (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("user");
              }
              setUserDetails(null);
              router.push("/");
              window.location.reload();
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => setOpenDialog(true)}
          >
            <LogOut className="h-4 w-4" />
            Login
          </Button>
        )}
              <SIgnInDialog
        openDialog={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
      </SidebarFooter>
    </Sidebar>
  );
}
