const SubjectInput = ({img, text}) => {
    return (
        <div className="flex flex-row items-center my-2">
            <label htmlFor="subject"><img src={img} alt="Category" width={35} height={35} className='mr-3' /></label>
            <input type="text" id="subject" placeholder={text} required className="bg-[#F5F5F5] dark:bg-[#333] rounded-lg w-[500px] py-3 px-4 outline-solid outline-2 outline-[#800000] dark:outline-[#80000090] border-none font-normal" />
        </div>
    )
}

export default SubjectInput