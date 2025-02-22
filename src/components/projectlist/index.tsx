import React from "react";
import FlowingMenu from "../FlowingMenu/FlowingMenu";
import { demoItems } from "@/lib/constData";

const ProjectList = () => {
  return (
    <>
      <div className="relative h-[520px]">
        <FlowingMenu items={demoItems} />
      </div>
    </>
  );
};

export default ProjectList;
