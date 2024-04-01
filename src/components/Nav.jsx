import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
const list = ["Profile", "Exercises", "History", "About", "Contact us "];



export default function Nav() {

  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  }

  const img = "./images/PoseFit (2).png";

  return (




    <>

      <div className=" sticky z-20">

        <div className=" max-w-screen-xl     md:px-8 ">
          <div className="flex h-16 items-center  justify-between">
            <div className=" md:flex md:items-center  ml-4 absolute md:gap-12">
              <a className="flex " href="www.google.com">
                <img src={img} alt="logo" className="w-10 absolute" />
                <span className="">POSEFIT AI</span>
              </a>
            </div>

            <div className="md:flex flex-1 justify-end  md:items-center relative md:gap-12">
              <nav aria-label="Global" className={` md:static absolute w-full mt-12 md:mt-0   md:block ${isopen ? "block animate-slideDown" : "hidden animate-slideUp"}`}>
                <ul id="hidden" className={`flex items-center gap-4 text-sm  justify-end flex-col md:flex-row`}>
                  {list.map((item, index) => {
                    return (
                      <li key={index} className="w-full md:w-auto  px-4 md:px-0">
                        <Link to={`/${item}`} className=" font-semibold hover:text-gray-500/75 "> {item} </Link>
                        {/* <a className=" font-semibold hover:text-gray-500/75" href="www.google.com"> {item} </a> */}
                      </li>
                    )
                  }

                  )}
                </ul>
              </nav>

              <div className="flex items-center gap-4 justify-end">
                <div className="sm:flex sm:gap-4">
                  <a
                    className="rounded-md bg-red-400 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="www.google.com"
                  >
                    Logout
                  </a>
                </div>

                <div className="block md:hidden">

                  <label className="btn btn-circle swap swap-rotate">

                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onClick={toggle} />

                    {/* hamburger icon */}
                    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>

                    {/* close icon */}
                    <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

                  </label>
                  {/* <button   className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
           
            <HiOutlineMenu className="w-8 h-6 " />

            </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}