import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
      <div className="mt-12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default Root;
