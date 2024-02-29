import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";



export default function Nav() {
  
  const [isopen, setisopen] = useState(false);
   const toggle = () => {
    setisopen(!isopen);
  }
      
  const img = "./images/PoseFit (2).png";
  
  return (




    <>
  <div className=" max-w-screen-xl   md:px-8 ">
    <div className="flex h-16 items-center  justify-between">
      <div className=" md:flex md:items-center  ml-4 absolute md:gap-12">
        <a className="block text-teal-600" href="www.google.com">
          <img src={img} alt="logo" className="w-32 h-10" />         
        </a>
      </div>

      <div className="md:flex flex-1 justify-end  md:items-center relative md:gap-12">
        <nav aria-label="Global" className={` md:static absolute w-full mt-12 md:mt-0   md:block ${isopen ? "block duration-500": "hidden" }`}>
          <ul id="hidden" className={`flex items-center gap-6 text-sm  justify-end flex-col md:flex-row`}>
            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> About </a>
            </li>

            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> Careers </a>
            </li>

            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> History </a>
            </li>

            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> Services </a>
            </li>

            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> Projects </a>
            </li>

            <li>
              <a className="text-gray-500  hover:text-gray-500/75" href="www.google.com"> Blog </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-end">
          <div className="sm:flex sm:gap-4">
            <a
              className="rounded-md bg-red-400 px-5 py-2.5 text-sm font-medium text-white shadow"
              href="www.google.com"
            >
              Login
            </a>
          </div>

          <div className="block md:hidden">
            <button onClick={toggle}  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
            <HiOutlineMenu className="w-8 h-6" />

            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}