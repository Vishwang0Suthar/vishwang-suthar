"use client";
import Projectcard from "@/components/projectcard";
import React, { useEffect, useState } from "react";
import { ProjectInfo } from "@/lib/constData";
import Project from "@/containers/projects";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="bg-black min-h-screen">
        <Project />
      </div>{" "}
    </>
  );
};

export default Projects;
