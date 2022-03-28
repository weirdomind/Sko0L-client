import React, { FC, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Footer from "../footer/footer";
import Navbar from "../navbar/Navbar";

interface LayoutInterface {
    children: React.ReactNode
}

const Layout: FC<LayoutInterface> = ({ children }) => {
    const spring = useSpring({
        to: {
            opacity: 1,
            marginLeft: 0,
        },
        from: {
            opacity: 0.5,
            marginLeft: -window.innerWidth * 5,
        },
        delay: 100,
        config: {
            mass: 2,
            friction: 30
        }
    });
    useEffect(() => {
        scrollTo(0, 0);

        return () => {

        }
    }, [])

    return (
        <div className="w-full pt-12 min-h-screen bg-primary overflow-x-hidden">
            <Navbar />
            <animated.main style={spring}>
                {/* NAVBAR */}
                {children}
                <Footer />
            </animated.main>
        </div>
    );
};

export default Layout;