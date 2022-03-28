import { Link } from "react-router-dom";
import insta from "./instagram.png";
import gmail from "./gmail.png";
import github from "./github.png";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={
        "w-full bg-secondary text-white px-10 md:px-32 py-10 " + className
      }
    >
      <div className="flex justify-between items-baseline ">
        <Link
          className="h-full text-lg md:text-xl hover:text-white"
          to="/about"
        >
          <div>About</div>
        </Link>
        <Link to="/">
          <div className="text-xl text-white font-bold p-2 border-2 rounded-sm">
            Sko0L
          </div>
        </Link>
        <Link
          className="h-full text-lg md:text-xl hover:text-white"
          to="/contact"
        >
          <div>Contact</div>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-10 pt-10 w-full h-full">
        <div className="w-10 h-10 p-1.5 rounded-full bg-primary border transform hover:scale-105 duration-300">
          <img alt="Instagram" draggable="false" src={insta} />
        </div>
        <div className="w-10 h-10 p-1.5 rounded-full bg-primary border transform hover:scale-105 duration-300">
          <img alt="Gmail" draggable="false" src={gmail} />
        </div>
        <div className="w-10 h-10 p-1.5 rounded-full bg-primary border transform hover:scale-105 duration-300">
          <img
            className="filter invert"
            alt="Github"
            draggable="false"
            src={github}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
