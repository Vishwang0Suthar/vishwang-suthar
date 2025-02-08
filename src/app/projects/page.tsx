import Projectcard from "@/components/projectcard";
import React from "react";
import { ProjectInfo } from "@/lib/constData";
type Props = {};

const Projects = (props: Props) => {
  return (
    <section>
      <h1 className="text-6xl py-10">Projects</h1>
      <div className="carousell grid lg:grid-cols-3 lg:gap-8 gap-4 md:grid-cols-2 grid-cols-1">
        {ProjectInfo.map((info, index) => (
          <Projectcard
            key={index}
            heading={info.heading}
            title={info.title}
            body={info.body}
            imgURL={info.imgURL}
            link={info.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
