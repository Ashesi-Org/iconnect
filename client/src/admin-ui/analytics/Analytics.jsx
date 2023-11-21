import React from 'react'
import './../analytics/analytics.css'
import { Nfc, Home, Layers, Settings, ActivitySquare, Contact } from "lucide-react";
// components
import { AppLayout } from "../../components/ui/AppLayout";
import { SideNav } from "../../components/ui/SideNav";
import StatusChart from './AnalysisTools';
import PercentageStatus from './PercnetAnalysis'
import StatusLineChart from './StatusLineChart';
import { COMPLAINTS, CONTACT, HELP, HOME, ROOMS } from '../../utils/Routes';

const Analytics = () => {
  return (
    <>
      <AppLayout
        sidebar={
          
          <SideNav className='w-[15px]' 
          routes =  {[HOME, COMPLAINTS, ROOMS, HELP, CONTACT, "settings"]}
            tabIcons={[
              <Home
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Layers
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Nfc
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <ActivitySquare
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Contact
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
              <Settings
                className="text-app-white group-active:scale-90 transition-all duration-50 ease-in"
                size={20}
              />,
            ]}
          />
        }

        column={
            <div>
                <Charts /> 
            </div>
        }
      />
    </>
  )
}

const Summary = () => {
    return (
        <div className="mt-20 flex flex-col justify-start">
            <h2 className="text-xl font-semibold">Analysis Summary</h2>
            <div className="flex flex-col justify-start">
              <div className="flex flex-row items-center gap-[3.7rem]">
                <Item text={'Resolved'} value={58.54} color={'bg-[#46DCAF]'}/>
                <Item text={'Pending'} value={41.46} color={'bg-[#C57DFB]'}/>
                <select id="departmentSelect" name="departments" className='rounded-lg border-solid border-2 border-[#333] outline-none w-[160px] p-2'>
                  <option value="General" selected>General</option>
                  <option value="SLE">SLE</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Academics">Academics</option>
                  <option value="Finance">Finance</option>
                  <option value="Support Center">Support Center</option>
                </select>
              </div>
              <div className="flex flex-row items-center"></div>
            </div>
        </div>
    )
}

const Item = ({text, value, color}) => {
  return (
    <div className="flex flex-row items-center gap-2 h-[120px]">
      <div className={`w-[15px] h-[50%] ${color}`}></div>
      <div className="flex flex-col justify-around">
        <h2 className='text-lg font-semibold text-[30px]'>{value}%</h2>
        <p className='text-sm font-normal text-[10px] pt-2'>{text}</p>
      </div>
    </div>
  )
}

const Charts = () => {
  return (
      <>
        <div className='flex flex-row gap-5 mt-3'>
          <div className="card w-[600px] h-[400px] rounded-lg p-5 drop-shadow-xl mb-4">
            <h2 className="text-xl font-semibold">Departments Analysis</h2>
            <StatusChart />
          </div>
          <div className="card w-[600px] h-[400px] rounded-lg p-5 drop-shadow-xl">
            <h2 className="text-xl font-semibold">Complaints Status Analysis</h2>
            <StatusLineChart />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-row w-[550px] items-center justify-start">
            <h2 className="text-xl font-semibold text-center -mt-28">Complaints Status Analysis</h2>
            <PercentageStatus />
          </div>
          <Summary />
        </div>
        </>
  );
};
export default Analytics
