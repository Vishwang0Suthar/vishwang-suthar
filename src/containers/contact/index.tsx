// import TextPressure from "@/ui/TextPressure/TextPressure";
import { useTheme } from "@/components/ThemeContext";
import React from "react";

const Contact = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-56 ${isDark ? "text-black" : "text-white"}`}>
      <div className="md:flex-row flex-col flex gap-6">
        <div className="flex-1">
          <h1 className="text-4xl">Get in touch!</h1>
          {/* <TextPressure textColor="black" text="Get in touch !" /> */}
        </div>
        <div className="flex-1">
          {" "}
          <form>
            <div className="flex gap-6 flex-col">
              {/* <label>E-mail:</label> */}
              <input
                className={`text-xl p-2  outline-none border-2 ${
                  isDark
                    ? "bg-white text-black border-black"
                    : "bg-black text-white border-white"
                } `}
                placeholder="Your mail id"
              />
              <textarea
                className={`resize-none text-xl p-2 outline-none border-2 ${
                  isDark
                    ? "bg-white text-black border-black"
                    : "bg-black text-white border-white"
                } h-64`}
                placeholder="Your message"
              />
              <div
                className={`relative border-2 overflow-hidden w-full group cursor-pointer flex items-center justify-center ${
                  isDark
                    ? "bg-white text-black border-black"
                    : "bg-black text-white border-white"
                }`}
              >
                {/* <div
                  className={`absolute h-full w-full  filter group-hover:-translate-y-[0]  duration-300 mix-blend-difference  translate-y-[100%] ${
                    isDark ? "bg-black" : "bg-white"
                  }`}
                ></div> */}
                <div className="absolute h-full w-full bg-black invert filter group-hover:-translate-y-[0]  duration-200 mix-blend-difference  translate-y-[100%]            "></div>
                {/* <div className="absolute aspect-square group-hover:scale-150 duration-700 bg-black w-0 filter invert  mix-blend-difference group-hover:w-full rounded-full"></div> */}
                <button className="p-2 w-full  text-xl ">Submit</button>
              </div>
            </div>{" "}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
