
// libraries
import React, { useState } from 'react';
import { BadgeCent } from 'lucide-react';

// components
import PremiumPlanModal from './PremiumPlanModal';
import Button from '../ui/Button';

const ModalButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className='flex gap-1 justify-center place-content-center w-auto'>
      <BadgeCent size={30} className='text-app-yellow'/>
      <Button onClick={handleToggleModal} style={{backgroundColor:"rgba(206, 177, 74, 0.89)", height:"30px", display:"flex", alignItems:"center"}} className='bg-app-yellow'>Go Premium</Button>
      {isModalOpen && <PremiumPlanModal handleToggle = {handleToggleModal} />}
    </div>
  );
};

export default ModalButton;
