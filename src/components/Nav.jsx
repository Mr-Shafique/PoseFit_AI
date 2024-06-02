// import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const list = ["Profile", "Main", "PlankExercise ","SquatExercise" ];

export default function Nav() {

  const [isopen, setisopen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');  // Redirect to homepage or login page after logout
  }
  const toggle = () => {
    setisopen(!isopen);
  }

  // const img = "./images/PoseFit (2).png";

  return (

    <>

      <div className=" z-20 sticky top-0 flex   ">

        <div className="w-full    bg-white md:px-8">
          <div className="flex h-20 items-center  justify-between ">
            <div className=" md:flex md:items-center  ml-4 absolute md:gap-12">
              
              <div className="flex items-center gap-4">
                {/* <img src="./images/PoseFit (2).png" alt="logo" className="w-16 h-16" /> */}
                <h1 className="text-2xl font-semibold text-[#ff834d]">PoseFit AI</h1>

                </div>

            </div>

            <div className="md:flex flex-1 justify-end  md:items-center relative md:gap-12">
              <nav aria-label="Global" className={` md:static absolute w-full md:w-auto  mt-12 md:mt-0 bg-white   md:block ${isopen ? "block animate-slideDown" : "hidden animate-slideUp"}`}>
                <ul id="hidden" className={`flex items-center gap-4 text-md  justify-end flex-col md:flex-row   `}>
                  {list.map((item, index) => {
                    return (
                      <li key={index} className="w-full md:w-auto py-2  px-4 md:px-0">
                        <Link to={`/${item}`} className=" font-semibold hover:text-[#ff834d] "> {item} </Link>
                        {/* <a className=" font-semibold hover:text-gray-500/75" href="www.google.com"> {item} </a> */}
                      </li>
                    )
                  }

                  )}
                </ul>
              </nav>

              <div className="flex items-center gap-4 justify-end">
                <div className="sm:flex sm:gap-4">
                <button
                    className="rounded-md bg-[#ff834d] px-5 py-2.5 text-sm font-medium text-white shadow"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
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