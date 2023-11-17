const DescriptionInput = ({img, text}) => {
    return (
        <div className="flex flex-row items-start my-2">
            <label htmlFor="description" className='mr-3 flex flex-row'><img src={img} alt="AdImage" width={35} height={35} /> 
            </label>
            <textarea cols={50} rows={3} type="text" placeholder={text} required className="bg-[#F5F5F5] dark:bg-[#333] rounded-lg w-[500px] py-3 px-4 outline-[#800000] dark:outline-[#80000090] font-normal border-none" />
        </div>
    )
}

export default DescriptionInput