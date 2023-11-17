import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import category from '../../assets/category.svg'
import categoryDark from '../../assets/categoryDark.svg'
import SubmitBtn from './SubmitBtn';
import SubjectInput from './SubjectInput';
import DescriptionInput from './DescriptionInput';

const ComplaintForm = ({isDarkMode}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div className={`${selectedImage ? 'flex' : 'none'} gap-5`}>
            <div className='mt-[5.5rem]'>
                {selectedImage && (
                    <div className='text-center'>
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '230px' }} />
                        <figcaption>Preview</figcaption>
                    </div>
                )}
            </div>
            <form onSubmit={(e) => e.preventDefault()} className={`font-[Inter] flex flex-col items-end mt-20`}>
                <SubjectInput img={isDarkMode? categoryDark : category} text={"Subject:"}/>
                <DescriptionInput img={<PlusCircle />} text={"Description:"} handleImageChange={handleImageChange} />
                <div className='flex flex-row items-center'>
                    <div className=''>
                        <input
                            type="file"
                            accept="image/*"
                            id="description"
                            onChange={handleImageChange} 
                        />
                    </div>
                    <SubmitBtn text={"SUBMIT"} />
                </div>
            </form>
        </div>
    )
}

export default ComplaintForm

