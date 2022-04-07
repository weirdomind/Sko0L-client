import { Error, ErrorOutline, ErrorTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import Layout from "../layout/Layout";

const OfflineComponent = ({ setIsOnline }: any) => {
  return (
    <Layout>
      <div className="w-full min-h-nonav flex justify-center items-center">
        <div className="flex gap-3 flex-col justify-center items-center py-4 px-10 text-9xl bg-white rounded-lg">
          <ErrorTwoTone color="error" fontSize="inherit" />
          <div className="text-5xl text-red-500">You are offline</div>
          <Button
            onClick={() => {
              setIsOnline(true);
            }}
            variant="contained"
            color="error"
            className="text-3xl p-2"
          >
            continue anyway
          </Button>
        </div>
      </div>
    </Layout>
  );
};
export default OfflineComponent;
