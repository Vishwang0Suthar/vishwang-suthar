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
