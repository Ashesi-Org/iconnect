import { useContext, useState } from "react";
import AppDialog from "../../components/ui/AppDialog";
import heroImg from "../../assets/hero2.svg";
import { Logo } from "../../components/ui/Logo";
import { userContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { api } from "../../api";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import About from "./About";
import AnimateSection from "../../components/auth/AnimateSection";
import Footer from "../../components/common/Footer";

const LandingPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");
      queryClient.invalidateQueries("user");
      toast.success("You Logged out", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const { user } = useContext(userContext);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden bg-app-background-1 lg:w-screen">
      <nav className="border-b h-20 flex justify-between items-center p-3 md:items-center md:pl-0 space-x-2 lg:space-x-3 xl:space-x-6 md:relative bg-transparent z-10">
        <div className="flex gap-1">
          <Logo width={30} height={30} />
          <span className="relative text-[22px] font-normal mr-10 text-black">
            &nbsp;iConnect
            <span className="absolute text-[10px] px-1 text-green-400">
              Beta
            </span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-app-white">
          <span className="cursor-pointer">About</span>
          <span className="cursor-pointer">Help</span>
          {user && Object.keys(user).length !== 0 ? (
            <>
              <Link
                to="/complaints"
                className="font-semibold text-app-brown rounded-lg px-10 p-2"
              >
                {" "}
                Dashboard{" "}
              </Link>
              <span
                className="cursor-pointer font-semibold text-app-brown rounded-lg px-10 p-2"
                onClick={handleLogout}
              >
                Logout
              </span>
            </>
          ) : (
            <button
              className="font-semibold text-app-brown rounded-lg px-10 p-2"
              onClick={openLoginModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <section className="w-full lg:p-2 md:p-20 bg-app-background-1 flex items-center justify-center lg:min-h-screen">
        <div className="flex items-center flex-col md:flex-row md:mb-10 md:justify-center">
          <div className="w-full md:w-3/5 gap-5 text-center md:text-left">
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-4xl md:text-5xl tracking-normal text-black flex flex-col gap-2">
                Seamless. Swift.
                <span className="font-semibold text-4xl md:text-5xl tracking-normal text-red-900">
                  Elevate your Ashesi experience
                </span>
                <p className="text-black"> with Ashesi iConnect</p>
              </h2>
              <h3 className="my-2 text-lg text-app-white">
                where communication meets resolution for a thriving and a
                vibrant campus community tailored for you!
              </h3>
            </div>

            {user && Object.keys(user).length !== 0 ? <h3 className="font-semibold my-4 text-red-900 rounded-lg px-10 p-3">Welcome {user?.displayName}</h3>:
            <button className="font-semibold my-4 bg-red-900 text-white rounded-lg px-10 p-3" onClick={() => navigate('/register')}>
              Register
            </button>
}
          </div>
          <img
            src={heroImg}
            className="md:w-2/5 h-full object-cover"
            alt="Hero"
          />
        </div>
      </section>
      <section className="w-full bg-app-background-2 flex items-center justify-center md:h-[800px]">
        <div className="flex items-center flex-col md:flex-row md:mb-10 md:justify-center">
          <AnimateSection />
          <About />
        </div>
      </section>
      <Footer />

      <AppDialog
        open={loginModalVisible}
        defaultOpen={loginModalVisible}
        setOpenChange={closeLoginModal}
        content={<LoginModal />}
      />
    </main>
  );
};

export default LandingPage;
