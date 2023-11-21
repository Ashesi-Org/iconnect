

import React, { useState } from "react";
import AuthFieldsContainer from "../../components/auth/AuthFieldsContainer";
import Input from "../../components/ui/Input";
import { Logo } from "../../components/ui/Logo";
import google from "../../assets/google.png"
import ButtonM from "../../components/ui/ButtonM";

const Register = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="bg-app-background-1 w-screen h-screen flex justify-center place-content-center items-center">
            <AuthFieldsContainer>
                <div className="flex justify-center items-center flex-col-reverse gap-0 pb-5">
                    <h2 className="text-app-white text-2xl">Get Started With Ashesi iConnect</h2>
                    <Logo width={120} />
                </div>
                <div className="p-5 flex gap-3">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-app-white">First Name</h3>
                        <Input
                            placeholder=""
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-app-white">Last Name</h3>
                        <Input
                            placeholder=""
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
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
                <div className="p-5 flex flex-col gap-2">
                    <h3 className="text-app-white">Email Address </h3>
                    <Input
                   
                        value={inputValue}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="p-5 flex flex-col gap-2">
                    <ButtonM type="primary" className={`text-lg text-app-white bg-input-bg-color  hover:bg-app-hover-green flex justify-center`}>Register</ButtonM>
                </div>
                <div className="p-5 flex gap-10 justify-between items-center">

                    <ButtonM type="primary"  className={`p-5 bg-input-bg-color`} icon={<img src={google} height={20} width={20} alt="Google Icon" />}>
                        Continue with Google
                    </ButtonM>
                        <span>OR</span>
                    <ButtonM type="primary" className={`p-5 bg-input-bg-color`} icon={<img src={google} height={20} width={20} alt="Google Icon" />}>
                        Continue with facebook 
                    </ButtonM>
 
                </div>
                 <div className="text-sm text-center pb-2 text-gray-400">
                        Already have an account yet? <span className=" cursor-pointer  text-app-green   "> Login</span>
                </div>
            </AuthFieldsContainer>
        </div>
    );
};

export default Register;
