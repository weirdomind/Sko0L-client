import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/loader";

function Loading({ text = "LOADING" }) {
  return (
    <Layout>
      <div className="w-screen min-h-screen pt-20 px-0 md:px-16">
        <div className="flex flex-col h-nonav bg-primary justify-center items-center">
          <Loader />
          <span className="uppercase text-xl font-bold text-secondary">
            {text}
          </span>
        </div>
      </div>
    </Layout>
  );
}

export default Loading;
