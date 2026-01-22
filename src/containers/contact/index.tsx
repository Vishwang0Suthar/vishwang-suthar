"use client";

import { useTheme } from "@/components/ThemeContext";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* ------------------ Validation Schema ------------------ */

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------ Component ------------------ */

const Contact = () => {
  const { isDark } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ContactFormData) => {
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!key) {
      throw new Error("Web3Forms access key is missing");
    }

    const payload = {
      ...data,
      access_key: key,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      console.log("Form submitted successfully", result);
    }
  };

  /* ------------------ Styling Helpers ------------------ */

  const baseInput = "text-xl p-2 outline-none border-2 transition-colors";

  const border = (hasError?: boolean) =>
    hasError ? "border-red-500" : isDark ? "border-black" : "border-white";

  const bg = isDark ? "bg-white text-black" : "bg-black text-white";

  return (
    <section className={`py-56 ${isDark ? "text-black" : "text-white"}`}>
      <div className="flex gap-6 flex-col md:flex-row">
        {/* Left Section */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-4xl">Get in touch!</h1>
          <Image
            src="/images/plane-graphics-3.png"
            alt="Plane png"
            className={`${isDark ? "invert-0" : "invert"} h-auto select-none w-auto`}
            width={1200}
            height={800}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-6 flex-col">
              <input
                {...register("name")}
                placeholder="Your name"
                className={`${baseInput} ${bg} ${border(!!errors.name)}`}
              />

              <input
                {...register("email")}
                placeholder="Your mail id"
                className={`${baseInput} ${bg} ${border(!!errors.email)}`}
              />

              <textarea
                {...register("message")}
                placeholder="Your message"
                className={`${baseInput} ${bg} h-64 resize-none ${border(
                  !!errors.message,
                )}`}
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
                <button className="p-2 w-full  text-xl " type="submit">
                  Submit
                </button>
              </div>
              {/* <div
                className={`relative border-2 overflow-hidden w-full group cursor-pointer flex items-center justify-center ${bg} ${
                  isDark ? "border-black" : "border-white"
                }`}
              >
                <div className="absolute h-full w-full bg-black invert filter group-hover:-translate-y-[0] duration-200 mix-blend-difference translate-y-[100%]" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 w-full text-xl relative z-10"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
