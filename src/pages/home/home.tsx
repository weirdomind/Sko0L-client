import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import WavyForHome from "../../components/wavyforhome/wavyforhome";
import book_lover from "./book_lover.svg";

const Home = () => {
  return (
    <Layout>
      <WavyForHome className="" />
      <div className="w-screen min-h-screen px-0 md:px-16 py-10 sm:pt-40 md:py-0">
        <div className="flex flex-col pt-40 md:pt-20 h-nonav justify-center items-center md:flex-row gap-10">
          <div className="flex w-3/4 md:w-1/2 gap-4 md:gap-10 flex-col justify-center">
            <div className="font-bold">
              <div className="max-w-min text-white mb-4 md:mb-8 text-5xl rounded-lg lg:text-6xl">
                Sko0L
              </div>
              <span className="text-2xl md:text-3xl text-white">
                The community for <br className="lg:hidden" />{" "}
                <span className="text-yellow">LEARNERS</span>.
              </span>
            </div>
            <div className="text-xl text-white">
              Intelligently designed study planner and executor for&nbsp;
              <br />
              <Text mark>&nbsp;students under 200 years.&nbsp;</Text> <br />
              Made with love &lt;3,
              <br />
              by students like you.
            </div>
            <div className="flex gap-4 w-full justify-center md:justify-start items-center">
              <Link to="/explore">
                <div className="ring-1 rounded-sm py-2 px-3 bg-white hover:bg-primary hover:text-white ring-white uppercase duration-300">
                  Explore
                </div>
              </Link>
              <Link to="/signup">
                <div className="ring-1 rounded-sm py-2 px-3 hover:bg-white bg-primary hover:text-primary text-white ring-white uppercase duration-300">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
          <div className="flex w-full p-10 md:w-1/2 justify-center items-center">
            <div className="w-full max-w-md">
              <img draggable="false" src={book_lover} alt="Study" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
