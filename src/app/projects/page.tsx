"use client";
import Projectcard from "@/components/projectcard";
import React, { useEffect, useState } from "react";
import { ProjectInfo } from "@/lib/constData";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      {/* // </div> */}
      {/* // <> */}
      <h1 className="text-6xl py-10">Projects</h1>
      {isLoading ? (
        // <div className="h-64 grid place-items-center ">
        <div className="loader absolute top-1/2 left-1/2"></div>
      ) : (
        <div className="carousell grid lg:grid-cols-3 lg:gap-8 gap-4 md:grid-cols-2 grid-cols-1">
          {ProjectInfo.map((info, index) => (
            <Projectcard
              key={index}
              heading={info.heading}
              title={info.title}
              body={info.body}
              imgURL={info.imgURL}
              videoLink={info.videoLink}
              deploymentLink={info.deploymentLink}
            />
          ))}
        </div>
        // </>
      )}
    </section>
  );
};

export default Projects;
