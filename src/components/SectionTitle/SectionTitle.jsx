
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-5 ">

            <h1 className="text-[#D99904] mb-4">---{subHeading}---</h1>
            <p className="text-4xl border-y-4 py-4 uppercase text-black ">{heading}</p>

        </div>
    );
};

export default SectionTitle;