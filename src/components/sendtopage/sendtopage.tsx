import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Loading/loading";

const SendTo = ({ page = "/" }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(page);
    return () => {};
  }, []);

  return <Loading text={`REDIRECTING TO ${page}`} />;
};
export default SendTo;
