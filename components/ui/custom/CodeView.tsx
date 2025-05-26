"use client";
import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

function CodeView() {
  const [activeTab, setActiveTab] = React.useState("code");

  return (
    <div>
      <div>
        <div>
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm ${activeTab == "code" && "text-blue-700"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm ${activeTab == "preview" && "text-blue-700"}`}
          >
            Preview
          </h2>
        </div>
      </div>{" "}
      <SandpackProvider template="react" theme={"dark"}>
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview showNavigator={true} style={{ height: "80vh" }} />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
