import React from "react";
import FlowingMenu from "../FlowingMenu/FlowingMenu";
import { demoItems } from "@/lib/constData";
import ListHover from "../ListHover";

const ProjectList = () => {
  return (
    <>
      <div className="relative h-[520px]">
        {/* <FlowingMenu items={demoItems} /> */}
        <ListHover items={demoItems} />
      </div>
    </>
  );
};

export default ProjectList;
