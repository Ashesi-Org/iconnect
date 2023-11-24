/* eslint-disable react/prop-types */
import ComplaintForm from "../../components/complaints/ComplaintForm";
import { Nfc, Home, Layers, Settings, Contact, HelpCircle } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from "../../components/common/AppSideBar";

const SubmitComplaint = ({ isDarkMode }) => {
  return (
    <>
      <AppLayout sidebar={<AppSideBar />} column={<SubmitCont />} />
    </>
  );
};

export default SubmitComplaint;

const SubmitCont = () => {
  return (
    <div className="w-full h-screen pt-[2px] flex flex-col gap-5">
      <div>

      <h2 className="font-[Inter] font-bold text-[28px] mb-4">
        General Complaints
      </h2>
      <p className="font-[Inter] font-normal text-[18px] leading-10 tracking-wide  w-2/3">
        General grievances encompass a wide range of concerns and complaints
        that members of Ashesi University may have during their affiliation with
        the institution. These complaints are not specific to one particular
        area but may relate to various aspects of university life, policies,
        services, or interactions.{" "}
        <span className="text-green-500 cursor-pointer">
          Read more ...
        </span>
      </p>
      </div>
      <ComplaintForm />
    </div>
  );
};
