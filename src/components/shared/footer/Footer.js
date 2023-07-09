import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="w-full p-6 text-sky-50 bg-[url('https://images.unsplash.com/photo-1589859762194-eaae75c61f64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-no-repeat bg-center bg-cover">
      <div className="text-center">
        <h3 className="text-3xl font-bold">OneDemic</h3>
        <p className="text-base font-normal mt-4">
          Let&apos;s get started on something great
        </p>
        <p className="text-base font-semibold mt-4 flex items-center justify-center gap-2">
          <MdOutlineEmail /> hey.onedemic@gmail.com
        </p>
      </div>
      <div className="w-full border-t-2 border-blue-400 text-center p-2 mt-14">
        <p className="text-base">2023 OneDemic</p>
      </div>
    </div>
  );
};

export default Footer;
