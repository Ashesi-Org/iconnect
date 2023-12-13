import React, { useContext, useState } from "react";
import { Mail, Eye } from "lucide-react";

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
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "../../utils/validation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const width = 400;
const height = 500;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { conn } = useContext(WebSocketContext);
  const myDevice = useScreenType();
  const navigate = useNavigate()

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    const isValidEmail = await validateEmail(email);
    const isValidPassword = await validatePassword(password);
    const validFName = await validateFirstName(firstName);
    const validLName = await validateLastName(lastName);

    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!isValidPassword) {
      toast.error("Invalid password");
      return;
    }

    if (!validFName) {
      toast.error("First Name cannot be empty");
      return;
    }
    if (!validLName) {
      toast.error("Last Name cannot be empty");
      return;
    }

    const userData = {
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    };

    try {
        const res = await api.post("/auth/local/signup", userData);
        console.log(res?.data?.user)
        toast.success(res?.data?.message);
        navigate("/login")
    } catch (error) {
        console.error(error)

        toast.error("something went wrong")
        
    }
  };

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
        <AuthFieldsContainer classNames="w-full max-w-md mx-auto px-4 md:px-0 overflow-y-auto">
           <div className="flex justify-center items-center flex-col-reverse gap-0 pb-5">
            <h2 className="text-app-white text-2xl">
              Get Started With Ashesi iConnect
            </h2>
            <Logo width={50} height={50} />
          </div>
          <div className="pl-5 pr-5 flex flex-col gap-1 w-full">
              <h3 className="text-app-white">First Name</h3>
              <Input
                placeholder=""
                value={firstName}
                onChange={handleFirstNameChange}
                classNames='w-full'
              />
            </div>

            <div className="pl-5 pr-5 flex flex-col gap-1 w-full"  >
              <h3 className="text-app-white">Last Name</h3>
              <Input
                placeholder=""
                value={lastName}
                onChange={handleLastNameChange}
                classNames='w-full'
              />
            </div>

          <div className="pl-5 pr-5 flex flex-col gap-2 w-full">
              <h3>Email Address</h3>
              <Input
                placeholder=""
                value={email}
                onChange={handleEmailChange}
                icon={<Mail />}
                classNames='w-full'
              />
            </div>
            <div className="pl-5 pr-5 flex flex-col gap-2 w-full">
              <h3>Password</h3>
              <Input
                placeholder=""
                value={password}
                type={"password"}
                onChange={handlePasswordChange}
                classNames='w-full'
              />
            </div>

            <div className="pl-5 pr-5 flex flex-col gap-2 w-full">
              <h3>Confirm Password</h3>
              <Input
                placeholder=""
                value={confirmPassword}
                type={"password"}
                onChange={handleConfirmPasswordChange}
                classNames='w-full'
              />
              {password !== confirmPassword && (
                <span className="text-red-500 text-xs">password do not match</span>
              )}
            </div>

            <div className="p-5 pt-8 flex flex-col gap-2">
              <ButtonM
                type="primary"
                className="text-lg text-white bg-red-900 hover:bg-red-700 w-full md:w-auto"
                onClick={handleRegister}
              >
                Register
              </ButtonM>
            </div>
            <div className="text-lg text-center text-gray-700">
              Continue with your socials
            </div>
            <div className="flex justify-between items-center mr-5 ml-5">
              <ButtonM
                onClick={() => {
                  googleLogin();
                }}
                type="primary"
                className="p-5 bg-gray-200 text-black text-xs"
                icon={
                  <img src={google} height={20} width={20} alt="Google Icon" />
                }
              >
                Cont to Google login
              </ButtonM>
              <span>OR</span>
              <ButtonM
                onClick={() => {
                  officeLogin();
                }}
                type="primary"
                className="p-5 bg-gray-200 text-black text-xs"
                icon={
                  <img src={office} height={20} width={20} alt="Google Icon" />
                }
              >
               Cont to Office login
              </ButtonM>
            </div>
            <div className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <a href="/login" className=" text-red-900">Login</a>
            </div>
        </AuthFieldsContainer>
      </section>
    </div>
  );
};

export default Register;
