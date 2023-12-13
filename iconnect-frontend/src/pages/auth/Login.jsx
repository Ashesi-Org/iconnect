import React, { useContext, useState } from "react";
import {Mail, Eye} from "lucide-react"


// components
import AuthFieldsContainer from "../../components/auth/AuthFieldsContainer";
import Input from "../../components/ui/Input";
import { Logo } from "../../components/ui/Logo";
import ButtonM from "../../components/ui/ButtonM";
import google from "../../assets/google.png";
import office from "../../assets/office.jpeg";
import useScreenType from "../../hooks/useScreenType";
import { WebSocketContext } from "../../contexts/WebsocketContext";
import { api, baseURL } from "../../api";
import AnimateSection from "../../components/auth/AnimateSection";
import { validateEmail, validatePassword } from "../../utils/validation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const width = 400;
const height = 500;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const { conn } = useContext(WebSocketContext);
  const myDevice = useScreenType();
  const navigate = useNavigate()


    const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

const handleLogin = async () => {
  const isValidEmail = await validateEmail(email);
  const isValidPassword = await validatePassword(password);

  if (!isValidEmail) {
    toast.error("Invalid email");
    return;
  }
  if (!isValidPassword) {
    toast.error("Invalid password");
    return;
  }

  const userData = {
    email,
    password,
  };


    try {
        const res = await api.post("/auth/login", userData);
        if(res.success){
          toast.success(res?.data.message);
          navigate('/complaints')
        }

    } catch (error) {
        console.error(error)
        toast.error("something went wrong")   
    }
}

  const left =
    typeof window !== "undefined" && window.innerWidth / 2 - width / 2;
  const top =
    typeof window !== "undefined" && window.innerHeight / 2 - height / 2;

  const googleLogin = () => {
    myDevice === "isDesktop"
      ? window.open(
          `${baseURL}/auth/google `,
          "",
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
      : window.location.replace(`${baseURL}/auth/google`);
  };

  const officeLogin = () => {
    myDevice === "isDesktop"
      ? window.open(
          `${`${baseURL}/auth/microsoft`}`,
          "",
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
      : window.location.replace(`${baseURL}/auth/microsoft`);
  };

  return (
        <div className="flex flex-col md:flex-row justify-center items-center w-full">
      <section className="w-full md:w-1/2 h-screen relative overflow-hidden">
        {/* Background image and AnimateSection */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/courtyard.png")',
          }}
        >
          <AnimateSection />
        </div>
      </section>
        <section className="w-full md:w-1/2 flex justify-center items-center">
        {/* Login form */}
        <AuthFieldsContainer classNames="w-full max-w-md mx-auto px-4">
          <div className="flex justify-center items-center flex-col-reverse gap-0 pb-5">
            <h2 className="text-app-white text-2xl font-semibold">
              Log in to Ashesi iConnect
            </h2>
            <Logo width={120} />
          </div>
     
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-2">
              <h3>Email Address</h3>
              <Input
                placeholder=""
                value={email}
                onChange={handleEmailChange}
                icon={<Mail />}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3>Password</h3>
              <Input
                placeholder=""
                value={password}
                type={"password"}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <ButtonM
                type="primary"
                className="text-lg text-white bg-red-900 hover:bg-red-700 w-full md:w-auto"
                onClick={handleLogin}
              >
                Login
              </ButtonM>
            </div>
            <div className="text-lg text-center text-gray-700">
              Continue with your socials
            </div>
            <div className="flex justify-between items-center">
              <ButtonM
                onClick={() => {
                  googleLogin();
                }}
                type="primary"
                className="p-5 bg-gray-200 text-black text-xs" 
                icon={<img src={google} height={20} width={20} alt="Google Icon" />}
              >
                Google login
              </ButtonM>
              <span>OR</span>
              <ButtonM
                onClick={() => {
                  officeLogin();
                }}
                type="primary"
                className="p-5 bg-gray-200 text-black text-xs"
                icon={<img src={office} height={20} width={20} alt="Google Icon" />}
              >
                Office login
              </ButtonM>
            </div>
            <div className="text-sm text-center text-gray-400">
              Don't have an account yet?{" "}
              <a href="/register" className="text-red-900">Register</a>
            </div>
          </div>
        </AuthFieldsContainer>
      </section>
    </div>
  );
};

export default Login;
