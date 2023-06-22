import { Outlet } from "react-router-dom";
import Footer from "../components/root/footer";
import Navbar from "../components/root/navbar";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
