import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center h-nonav items-center pt-16 md:pt-0 px-0 md:px-16">
        <div className="flex flex-col h-nonav justify-center items-center gap-10">
          <div className="text-3xl text-center font-black text-yellow">
            Looks like you are in the wrong classroom <br />
            Please Verify the Room Number.
            <div className="text-sm font-light text-riflegreen">
              don't worry we'll keep it between us&nbsp;&nbsp;&nbsp;{";-)"}
            </div>
          </div>
          <div className="text-white">
            <div className="text-xl">Maybe you are looking for</div>
            <ul
              style={{
                listStyleType: "circle",
              }}
              className="pl-20"
            >
              <li className="text-lg">
                <Link to="/">Home</Link>
              </li>
              <li className="text-lg">
                <Link to="/about">About</Link>
              </li>
              <li className="text-lg">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="text-lg">
                <Link to="/mission">Mission</Link>
              </li>
              <li className="text-lg">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="text-lg">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li className="text-lg">
                <Link to="/signin">Sign In</Link>
              </li>
              <li className="text-lg">
                <Link to="/explore">Explore</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-6 text-white text-sm font-light">
          If you think this is a mistake please{" "}
          <Link
            className="underline hover:font-normal duration-300"
            to="/notfoundreport"
          >
            Let us know
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
