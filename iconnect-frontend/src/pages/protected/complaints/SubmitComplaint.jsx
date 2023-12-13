/* eslint-disable react/prop-types */
import ComplaintForm from "../../../components/complaints/ComplaintForm";
// components
import { AppLayout } from "../../../components/ui/AppLayout";
import AppSideBar from "../../../components/common/AppSideBar";
import {ContentScrollable} from "../../../components/ui/ContentScrollable"

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
    <div className=" pt-[2px] flex flex-col gap-5">
      <ContentScrollable content = {
      
      <><div className="pl-12 pr-8">

          <h2 className="font-[Inter] font-bold text-[28px] mb-4">
            General Complaints
          </h2>
          <p className=" font-normal text-[18px] leading-10">
            General grievances encompass a wide range of concerns and complaints
            that members of Ashesi University may have during their affiliation with
            the institution. These complaints are not specific to one particular
            area but may relate to various aspects of university life, policies,
            services, or interactions.{" "}
            <span className="text-green-500 cursor-pointer">
              Read more ...
            </span>
          </p>
        </div><ComplaintForm /></>
    }/>
      </div>
  );
};
