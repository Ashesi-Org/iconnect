import React, { useContext, useState } from "react";
import AuthFieldsContainer from "../../components/auth/AuthFieldsContainer";
import Input from "../../components/ui/Input";
import { Logo } from "../../components/ui/Logo";
import ButtonM from "../../components/ui/ButtonM";
import google from "../../assets/google.png"
import useScreenType from "../../hooks/useScreenType";
import { WebSocketContext } from "../../contexts/WebsocketContext";

const width = 400;
const height = 500;

const Login = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    //TODO: GOOGLE AUTH LOGIN HELPER FUNCTION
    const myDevice = useScreenType();

    const left =
        typeof window !== "undefined" && window.innerWidth / 2 - width / 2;
    const top =
        typeof window !== "undefined" && window.innerHeight / 2 - height / 2;

    const googleLogin = () => {
        myDevice == "isDesktop"
        ? window.open(
            `${"http://localhost:8000/auth/google"
                // process.env.NODE_ENV == "production"
                // ? `${process.env.REACT_APP_PROD_API}/auth/google`
                // : `${process.env.REACT_APP_DEV_API}/auth/google`
            }`,
            "",
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
            )
        : window.location.replace(
            `${
                "http://localhost:8000/auth/google"
                // process.env.NODE_ENV == "production"
                // ? `${process.env.REACT_APP_PROD_API}/auth/google`
                // : `${process.env.REACT_APP_DEV_API}/auth/google`
            }`
            );
    };


    const { conn } = useContext(WebSocketContext);
    return (
            
            <AuthFieldsContainer classNames="w-[600px]">
              
                <div className="flex justify-center items-center flex-col-reverse gap-0 pb-5">
                    <h2 className="text-app-white text-2xl font-semibold">Log in to Ashesi iConnect</h2>
                    <Logo width={120} />
                </div>
                 <div className="p-5 flex flex-col gap-2">
                    <h3 className="text-app-white">Email Address </h3>
                    <Input
                        placeholder=""
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                </div>
                
                <div className="pl-5  pr-5 flex flex-col gap-2">
                    <h3 className="text-app-white">Password </h3>
                    <Input
                        placeholder=""
                        value={inputValue}
                        type={'password'}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                </div>
        
                <div className="p-5 pt-8 flex flex-col gap-2">
                    <ButtonM type="primary" className={`text-lg text-white bg-red-900  hover:bg-red-700 flex justify-center`}>Login</ButtonM>
                </div>
                <div className="text-lg text-center text-app-white">
                    Continue with your socials
                </div>
                <div className="pt-4 pb-4 flex gap-1 justify-between items-center">

                    <ButtonM onClick={() => {googleLogin();}} type="primary"  className={`p-5 bg-input-bg-color text-black`} icon={<img src={google} height={20} width={20} alt="Google Icon" />}>
                        Continue with Google
                    </ButtonM>
                        <span>OR</span>
                    <ButtonM type="primary" className={`p-5 bg-input-bg-color text-black`} icon={<img src={google} height={20} width={20} alt="Google Icon" />}>
                        Continue with facebook 
                    </ButtonM>
                </div>
                  <div className="text-sm text-center pb-2 text-gray-400">
                    Don't have an account yet? <span className=" cursor-pointer  text-red-900"> Register</span>
                </div>
            </AuthFieldsContainer>
           
    );
};

export default Login;
