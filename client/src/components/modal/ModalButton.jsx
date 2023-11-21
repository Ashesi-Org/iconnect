
// libraries
import React, { useState } from 'react';
import { BadgeCent } from 'lucide-react';

// components
import PremiumPlanModal from './PremiumPlanModal';
import ButtonM from '../ui/ButtonM';

const ModalButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className='flex gap-1 justify-center place-content-center w-auto'>
      <BadgeCent size={30} className='text-app-yellow'/>
      <ButtonM onClick={handleToggleModal} style={{backgroundColor:"rgba(206, 177, 74, 0.89)", height:"30px", display:"flex", alignItems:"center"}} className='bg-app-yellow'>Go Premium</ButtonM>
      {isModalOpen && <PremiumPlanModal handleToggle = {handleToggleModal} />}
    </div>
  );
};

export default ModalButton;
