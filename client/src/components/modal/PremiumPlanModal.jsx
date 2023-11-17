import React from 'react';
import Button from '../ui/Button';

const PremiumPlanModal = ({handleToggle}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none premium-plan-modal ">
      <div className="relative w-w_50 bg-app-background-1 rounded-2xl p-10 shadow-md backdrop-filter backdrop-blur-xl">
      <button
          className="absolute top-4 right-4 bg-app-background-1 p-2 text-gray-500 hover:text-red-700     hover:outline-0"
          onClick={handleToggle}
        >
          <span className="text-3xl">&times;</span>
        </button>
        <div className="flex justify-center  mb-2">
        <h2 className="text-xl flex justify-center place-content-center font-semibold pb-6">Choose Your Premium Plan</h2>
          
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Plan Card */}
          <div className="bg-app-background-2 p-4 rounded-xl shadow-md">
            <h3 className="text-lg text-left text-app-gray font-normal mb-2">Basic Plan</h3>
            <p className="text-app-white mb-4 text-left font-semibold">$500/<span className='text-gray-400'>forever</span></p>
            <p className="text-app-gray mb-6 text-left">
              This plan is suitable for individuals aiming to use the enlighten app for more than a year.
            </p>
            <div className="text-app-gray text-left  pb-7">
              <p>Packages included:</p>
              <ul className="list-disc list-inside">

                <li>All grade level learning contents</li>
                <li>All video contents</li>
                <li>All simulations</li>
                <li>All star checkpoints</li>
              </ul>
            </div>
            <Button type="secondary">
              Get Started
            </Button>
          </div>
          
          {/* One Time Payment Card */}

          <div className="bg-app-background-2 p-4 rounded-xl shadow-md">
            <h3 className="text-lg text-left text-app-gray font-normal mb-2">Basic Plan</h3>
            <p className="text-app-white mb-4 font-semibold text-left">$80/<span className='text-gray-400'>monthly</span></p>
            <p className="text-app-gray mb-6 text-left">
              This plan is suitable for individuals aiming to use the enlighten app for more than a year.
            </p>
            <div className="text-app-gray text-left  pb-7">
              <p>Packages included:</p>
              <ul className="list-disc list-inside">
                
                <li>All grade level learning contents</li>
                <li>All video contents</li>
                <li>All simulations</li>
                <li>All star checkpoints</li>
              </ul>
            </div>
            <Button type='primary'>
              Get Started
            </Button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default PremiumPlanModal;
