import { FC } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

interface LogoProps {
  small?: boolean;
}

const Logo: FC<LogoProps> = ({ small }) => {
  const spring = useSpring({
    from: {
      opacity: 0,
      y: 20,
      rotateX: "90deg",
    },
    to: {
      opacity: 1,
      y: 0,
      rotateX: "0deg",
    },
    duration: 1000,
  });
  return (
    <animated.div style={spring}>
      <Link
        to="/"
        className={`select-none overflow-hidden hover:text-yellow duration-200 py-1 font-black text-white ${
          small ? "text-2xl" : "text-3xl"
        }`}
      >
        Sko0L
      </Link>
    </animated.div>
  );
};

export default Logo;
