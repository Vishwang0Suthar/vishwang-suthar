import React from "react";
import Heroimg from "@/public/images/img-hero.jpg";
import Image, { StaticImageData } from "next/image";
import { Icons } from "@/lib/constData";
import { nanum } from "@/ui/font";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Brushstroke from "@/components/brushstroke";
import { useTheme } from "@/components/ThemeContext";

const Hero = () => {
  const { isDark } = useTheme();
  const handleDownload = async () => {
    const res = await fetch(
      "https://nitywsr4matykjq1.public.blob.vercel-storage.com/files/Vishwang_Suthar_fs.pdf",
    );
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Vishwang's-Resume.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className={` ${isDark ? "text-black" : "text-white"}`}>
      <div className="flex h-[38rem] lg:flex-row flex-col gap-24 lg:gap-4">
        <div className="flex-1 flex  items-center justify-center lg:justify-start  p-6">
          <div className="flex flex-col gap-8 ">
            <h1 className="lg:text-4xl text-2xl  flex flex-col gap-4 font-semibold  ">
              Hey there this is <br />{" "}
              <div>
                <span
                  className={`${nanum.className} relative md:text-6xl text-5xl w-fit z-10`}
                >
                  Vishwang Suthar
                </span>
                <Brushstroke />
              </div>
            </h1>

            <p className="text-lg">
              Creating some patterns in this infinite chaos.
            </p>
            <div
              onClick={handleDownload}
              className={` ${isDark ? "border-black divide-black" : "border-white divide-white"} 
              border-2 w-fit flex p-4 px-8 h-full items-center justify-center gap-4 cursor-pointer relative duration-300 overflow-hidden  group`}
            >
              {" "}
              <div className="absolute h-full w-full filter group-hover:-translate-y-[0] invert duration-300 mix-blend-difference bg-black translate-y-[100%] "></div>
              <p className=" text-lg lg:text-xl">Resume</p>
              <div className=" h-fit  duration-500">
                <Image
                  src="/icons/arrow.svg"
                  alt="link"
                  className={`h-4 w-4 rotate-[225deg] transition duration-300 ${
                    isDark
                      ? "group-hover:invert"
                      : "invert group-hover:invert-0"
                  }`}
                  height={100}
                  width={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* <Image
            className="h-full w-full rounded-lg"
            alt="profile_img"
            src={Hero}
          /> */}
          <TiltedCard
            imageSrc={Heroimg}
            altText="Cover"
            captionText="Dripy"
            containerHeight="320px"
            containerWidth="320px"
            imageHeight="320px"
            imageWidth="320px"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            showMobileWarning={true}
            showTooltip={true}
            displayOverlayContent={true}
            // overlayContent={<p className="tilted-card-demo-text">Dripy</p>}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
