import Minimize from "@/public/icons/minimize.svg";
import Restore from "@/public/icons/restore.svg";
import Close from "@/public/icons/close.svg";
import Gift from "@/public/images/projects-thumbnails/gift-city.png";
import MemoryGame from "@/public/images/projects-thumbnails/memory-game.png";
import CRTtv from "@/public/images/projects-thumbnails/crt-tv-2.png";

export const Icons = [
  {
    icon: Minimize,
    alt: "minimize icon",
  },
  { icon: Restore, alt: "restore icon" },
  {
    icon: Close,
    alt: "close icon",
  },
];

export const ProjectInfo = [
  {
    heading: "Gift City Web",
    title: "Gift Connect",
    body: `Built an interactive Gift City homepage during SSPI 2.0, featuring
                hover effects, Framer Motion carousel with sound, and interactive
                polls, enhancing UI/UX with React.`,
    imgURL: Gift,
    link: "https://gift-city-web.vercel.app/",
  },
  {
    heading: "Card Game",
    title: "Memory Game",
    body: `An interactive memory game where players flip and match cards while enjoying their favorite Spotify tracks. Built as a fun personal project to enhance engagement with music and gameplay!`,
    imgURL: MemoryGame,
    link: "https://memory-game-flax-six.vercel.app/#",
  },
  {
    heading: "Fun Project",
    title: "CRT-TV",
    body: `A fun personal project featuring a 3D-styled button, a toggleable CRT TV effect, along with theme toggle,and interactive animations. Enhanced with sound effects using React’s useSound library and a creative image-based illusion, this project brings nostalgia with a modern twist!`,
    imgURL: CRTtv,
    link: "https://crt-tv.vercel.app/",
  },
];

import one from "@/public/images/catalogue/1.jpg";
import two from "@/public/images/catalogue/2.jpg";
import three from "@/public/images/catalogue/3.jpg";
import four from "@/public/images/catalogue/4.jpg";
import five from "@/public/images/catalogue/5.jpg";
import six from "@/public/images/catalogue/6.jpg";
import seven from "@/public/images/catalogue/7.jpg";
import eight from "@/public/images/catalogue/8.jpg";
import nine from "@/public/images/catalogue/9.jpg";
import ten from "@/public/images/catalogue/10.jpg";
import tenone from "@/public/images/catalogue/11.jpg";
export const Catalogue = [
  { imgUrl: one, alt: "Cata-img-1" },
  { imgUrl: two, alt: "Cata-img-2" },
  { imgUrl: three, alt: "Cata-img-3" },
  { imgUrl: four, alt: "Cata-img-4" },
  { imgUrl: five, alt: "Cata-img-5" },
  { imgUrl: six, alt: "Cata-img-6" },
  { imgUrl: seven, alt: "Cata-img-7" },
  { imgUrl: eight, alt: "Cata-img-8" },
  { imgUrl: nine, alt: "Cata-img-9" },
  { imgUrl: ten, alt: "Cata-img-10" },
  { imgUrl: tenone, alt: "Cata-img-11" },
];
