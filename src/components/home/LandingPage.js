import Image from "next/image";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { SiAdguard, SiChartmogul } from "react-icons/si";

const LandingPage = () => {
  return (
    <>
      <div>
        {/* ONE */}
        <div className="block md:flex items-center p-10 sm:p-16 md:p-32 h-auto bg-[url('https://i.ibb.co/pRkZXDZ/joanna-kosinska-sz-FUQoyvrx-M-unsplash.jpg')] bg-no-repeat bg-center bg-cover">
          <div className="antialiased md:text-left p-10 md:p-0 backdrop-blur-sm md:backdrop-blur-none">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-100">
              Streamline Your Assessment Process
            </h1>
            {`\n`}
            <h1 className="text-5xl md:text-6xl font-bold text-blue-100">
              With <span className="text-sky-100">OneDemic</span>
            </h1>
            {`\n`}
            <h4 className="text-xl text-blue-100 font-medium my-10">
              An online exam service that provides a seamless and efficient
              platform for conducting and managing exams
            </h4>
            {`\n`}
            <Link
              href={`/signup`}
              className="flex justify-center items-center gap-1 py-3 px-4 border-double border-4 border-blue-50 rounded-xl text-2xl text-blue-50 font-semibold w-full md:w-44"
            >
              Join Now{" "}
              <IoIosArrowForward className="font-black text-yellow-200" />
            </Link>
          </div>
        </div>
        {/* TWO */}
        <div className="block p-10 sm:p-16 md:p-32 h-auto text-blue-50 bg-[url('https://images.unsplash.com/photo-1589859762194-eaae75c61f64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-no-repeat bg-center bg-cover">
          <div className="mb-6">
            <h2 className="text-5xl font-semibold">We&apos;re offering</h2>
          </div>
          <div className="block md:flex gap-5 justify-between items-center">
            <div className="block md:flex justify-center items-center p-10 sm:p-14 md:p-16 mb-4 md:mb-0 backdrop-blur-md bg-white/30 rounded-3xl">
              <div className="text-center">
                <SiAdguard className="text-9xl mx-auto mb-4 text-[#10b981]" />
                <h4 className="text-2xl sm:text-xl md:text-2xl font-medium">
                  Secure Exam Environment
                </h4>
              </div>
            </div>
            <div className="block md:flex justify-center items-cente p-10 sm:p-16 md:p-16 mb-4 md:mb-0 backdrop-blur-md bg-white/30 rounded-3xl">
              <div className="text-center">
                <FiSettings className="text-9xl mx-auto mb-4 text-[#e0e7ff]" />
                <h4 className="text-2xl sm:text-xl md:text-2xl font-medium">
                  Customizable Exam Settings
                </h4>
              </div>
            </div>
            <div className="block md:flex justify-center items-center p-10 sm:p-16 md:p-16 mb-4 md:mb-0 backdrop-blur-md bg-white/30 rounded-3xl">
              <div className="text-center">
                <SiChartmogul className="text-9xl mx-auto mb-4 text-[#7dd3fc]" />
                <h4 className="text-2xl sm:text-xl md:text-2xl font-medium">
                  Automated Grading System
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[url('https://i.ibb.co/543X2mj/Untitled-design-2.png')] bg-no-repeat bg-center bg-cover">
          {/* THREE */}
          <div className="block md:flex p-10 sm:p-16 md:p-32 h-auto text-white">
            <div className="w-full md:w-1/2">
              <div className="">
                <h1 className="text-6xl font-semibold leading-normal">
                  Reliable For Teachers{" "}
                  <br className="visible sm:hidden md:visible" />
                  In Every Way
                </h1>
                <p className="text-xl mt-8 font-medium leading-normal">
                  From arranging an exam to managing students in courses,
                  <br />
                  everything is tailored for ease of access.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 my-5 md:my-0">
              <Image
                src={`https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80`}
                alt="teachers"
                className="rounded-3xl"
                width={450}
                height={300}
                layout="responsive"
              />
            </div>
          </div>
          {/* FOUR */}
          <div className="block md:flex p-10 sm:p-16 md:p-32 h-auto text-blue-50">
            <div className="w-full md:w-1/2">
              <Image
                src={`https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`}
                alt="teachers"
                className="rounded-3xl"
                width={450}
                height={300}
                layout="responsive"
              />
            </div>
            <div className="w-full md:w-1/2 flex justify-end my-5 md:my-0">
              <div className="ml-0 md:ml-10">
                <h1 className="text-6xl font-semibold leading-normal">
                  Student-Friendly Features <br />
                  For A Seamless Experience
                </h1>
                <p className="text-xl mt-8 font-medium leading-normal">
                  Intuitive user-inteface allow students to focus on answering
                  questions without distractions.
                </p>
              </div>
            </div>
          </div>
          {/* FIVE */}
          <div className="block md:flex justify-center items-center p-10 sm:p-16 md:p-32 h-auto text-blue-50">
            <div>
              <h1 className="text-5xl text-start md:text-center font-semibold leading-normal">
                Experience OneDemic To The Next Level With The{" "}
                <span className="p-3 border-double border-4 text-yellow-200 border-yellow-500 rounded-xl shadow-md">
                  Pro
                </span>{" "}
                Package
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

//images
// https://images.unsplash.com/photo-1587116987844-bd3d2f866f16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
// https://images.unsplash.com/photo-1541256942802-7b29531f0df8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
// https://images.unsplash.com/photo-1589859762194-eaae75c61f64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80
