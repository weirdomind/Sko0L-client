import { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";

function Loader() {
  const [isToRight, setIsToRight] = useState(false);
  const [props, setProps]: any = useState(
    useSpring({
      to: {
        transform: `translateX(10.5rem)`,
        height: "0.75rem",
        width: "2.5rem",
        borderTopRightRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
        borderTopLeftRadius: "0.25rem",
        borderBottomLeftRadius: "0.25rem",
      },
      from: {
        transform: `translateX(0.5rem)`,
        height: "0.75rem",
        width: "0.75rem",
        borderTopRightRadius: "0.25rem",
        borderBottomRightRadius: "0.25rem",
        borderTopLeftRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
      },
      delay: 300,
      reset: true,
      onRest: () => setIsToRight((itr) => !itr),
      reverse: isToRight,
      config: config.gentle,
    })
  );
  useEffect(() => {
    return () => {
      setProps(useSpring({}));
    };
  }, []);
  return (
    <div className="rounded-full w-60 bg-gradient-to-r from-indigo-600 to-pink-500 border-4 border-white p-2">
      <animated.div
        className="rounded-full bg-white w-10"
        style={props}
      ></animated.div>
    </div>
  );
}

export default Loader;
