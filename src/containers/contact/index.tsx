import TextPressure from "@/ui/TextPressure/TextPressure";
import React from "react";
import mono from "@/public/fonts/";
import { IBM_Plex_Mono } from "next/font/google";
type Props = {};

const Contact = (props: Props) => {
  return (
    <section className="py-56">
      <div className="flex gap-6">
        <div className="flex-1">
          {/* <h1 className="md:text-6xl  text-4xl">Get in touch!</h1> */}
          <TextPressure textColor="black" text="Get in touch !" />
        </div>
        <div className="flex-1">
          {" "}
          <form>
            <div className="flex gap-6 flex-col">
              {/* <label>E-mail:</label> */}
              <input
                className="text-xl p-2  outline-none border-2 border-black"
                placeholder="Your mail id"
              />
              <textarea
                className="resize-none text-xl p-2 outline-none border-2  border-black h-64"
                placeholder="Your message"
              />
              <div className="relative overflow-hidden bg-white w-full group cursor-pointer flex items-center justify-center">
                {/* <div className="absolute h-full w-full filter group-hover:-translate-y-[0] invert duration-300 mix-blend-difference bg-black translate-y-[100%] "></div> */}
                <div className="absolute aspect-square group-hover:scale-150 duration-700 bg-black w-0 filter invert  mix-blend-difference group-hover:w-full rounded-full"></div>
                <button className="border-2 p-2 w-full  text-xl text-black border-black">
                  Submit
                </button>
              </div>
            </div>{" "}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
