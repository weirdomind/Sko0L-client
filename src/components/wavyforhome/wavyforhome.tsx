import React, { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

interface WavyForHomeProps {
  className?: string;
}

const WavyForHome: FC<WavyForHomeProps> = ({ className }) => {
  const [scroll, setscroll] = useState(0)
  const waveSpring1 = useSpring({
    from: {
      x: -30,
      y: -15,
      rotate: 180
    },
    to: {
      x: 30,
      y: 15,
      rotate: 180,
      scale: 1.5
    },
    loop: { reverse: true },
    config: {
      mass: 1,
      friction: 0,
      duration: 5000
    },
  });
  const waveSpring2 = useSpring({
    from: {
      x: 30,
      y: -15,
      rotate: 180
    },
    to: {
      x: -30,
      y: 15,
      rotate: 180,
      scale: 1.5
    },
    loop: { reverse: true },
    config: {
      mass: 1,
      friction: 0,
      duration: 7500
    },
  });
  const hideWaveSpring = useSpring({
    from: {
      y: 0,
    },
    to: {
      y: scroll > 0 ? -scroll / 2 : 0,
    },
    config: {
      duration: 1000,
    },
  });
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setscroll(window.scrollY);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setscroll(window.scrollY);
      });
    }
  }, [])

  return (
    <animated.div style={hideWaveSpring}>
      <animated.svg
        style={waveSpring1}
        id="wave"
        className={
          "duration-200 fixed left-0 transform scale-y-150" + ` ${className}`
        }
        viewBox="0 0 1440 210"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(97, 89, 230, 1)" offset="0%"></stop>
            <stop stopColor="rgba(97, 89, 230, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          className="opacity-100"
          fill="#ffc200"
          d="M0,84L60,70C120,56,240,28,360,31.5C480,35,600,70,720,91C840,112,960,119,1080,101.5C1200,84,1320,42,1440,24.5C1560,7,1680,14,1800,14C1920,14,2040,7,2160,17.5C2280,28,2400,56,2520,63C2640,70,2760,56,2880,70C3000,84,3120,126,3240,119C3360,112,3480,56,3600,59.5C3720,63,3840,126,3960,140C4080,154,4200,119,4320,87.5C4440,56,4560,28,4680,31.5C4800,35,4920,70,5040,80.5C5160,91,5280,77,5400,66.5C5520,56,5640,49,5760,52.5C5880,56,6000,70,6120,63C6240,56,6360,28,6480,35C6600,42,6720,84,6840,94.5C6960,105,7080,84,7200,73.5C7320,63,7440,63,7560,52.5C7680,42,7800,21,7920,17.5C8040,14,8160,28,8280,49C8400,70,8520,98,8580,112L8640,126L8640,210L8580,210C8520,210,8400,210,8280,210C8160,210,8040,210,7920,210C7800,210,7680,210,7560,210C7440,210,7320,210,7200,210C7080,210,6960,210,6840,210C6720,210,6600,210,6480,210C6360,210,6240,210,6120,210C6000,210,5880,210,5760,210C5640,210,5520,210,5400,210C5280,210,5160,210,5040,210C4920,210,4800,210,4680,210C4560,210,4440,210,4320,210C4200,210,4080,210,3960,210C3840,210,3720,210,3600,210C3480,210,3360,210,3240,210C3120,210,3000,210,2880,210C2760,210,2640,210,2520,210C2400,210,2280,210,2160,210C2040,210,1920,210,1800,210C1680,210,1560,210,1440,210C1320,210,1200,210,1080,210C960,210,840,210,720,210C600,210,480,210,360,210C240,210,120,210,60,210L0,210Z"
        ></path>
      </animated.svg>
      <animated.svg
        style={waveSpring2}
        id="wave"
        className={
          "duration-500 fixed left-0 transform scale-y-150" + ` ${className}`
        }
        viewBox="0 0 1440 210"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(152, 146, 255, 1)" offset="0%"></stop>
            <stop stopColor="rgba(152, 146, 255, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          className="opacity-100"
          style={{}}
          fill="#6159e6"
          d="M0,0L60,21C120,42,240,84,360,94.5C480,105,600,84,720,94.5C840,105,960,147,1080,136.5C1200,126,1320,63,1440,45.5C1560,28,1680,56,1800,70C1920,84,2040,84,2160,73.5C2280,63,2400,42,2520,38.5C2640,35,2760,49,2880,66.5C3000,84,3120,105,3240,101.5C3360,98,3480,70,3600,56C3720,42,3840,42,3960,42C4080,42,4200,42,4320,38.5C4440,35,4560,28,4680,45.5C4800,63,4920,105,5040,133C5160,161,5280,175,5400,168C5520,161,5640,133,5760,108.5C5880,84,6000,63,6120,52.5C6240,42,6360,42,6480,63C6600,84,6720,126,6840,126C6960,126,7080,84,7200,63C7320,42,7440,42,7560,66.5C7680,91,7800,140,7920,154C8040,168,8160,147,8280,126C8400,105,8520,84,8580,73.5L8640,63L8640,210L8580,210C8520,210,8400,210,8280,210C8160,210,8040,210,7920,210C7800,210,7680,210,7560,210C7440,210,7320,210,7200,210C7080,210,6960,210,6840,210C6720,210,6600,210,6480,210C6360,210,6240,210,6120,210C6000,210,5880,210,5760,210C5640,210,5520,210,5400,210C5280,210,5160,210,5040,210C4920,210,4800,210,4680,210C4560,210,4440,210,4320,210C4200,210,4080,210,3960,210C3840,210,3720,210,3600,210C3480,210,3360,210,3240,210C3120,210,3000,210,2880,210C2760,210,2640,210,2520,210C2400,210,2280,210,2160,210C2040,210,1920,210,1800,210C1680,210,1560,210,1440,210C1320,210,1200,210,1080,210C960,210,840,210,720,210C600,210,480,210,360,210C240,210,120,210,60,210L0,210Z"
        ></path>
      </animated.svg>
    </animated.div>
  );
};

export default WavyForHome;
