import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getDetails } from "../context/getDataStored";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [navData, setNavData] = useState([
        { name: "Event", active: true },
        { name: "My Ticket", active: false },
        { name: "About Page", active: false },
    ]);

    const details = getDetails();
    const navigate = useNavigate();
    const access = () => details ? navigate("/book-ticket") : null



    const onActive = (index: number) => {
        setNavData(navData.map((item, i) => ({
            ...item,
            active: i === index
        })));
        if (index === 1) {
            access()
        } else if (index === 0) {
            navigate("/attendee-ticket")
        } else {
            return null
        }

    };

    return (
        <header className="justify-between w-[80vw] mx-auto items-center p-4 rounded-2xl border border-[#24A0B5] mb-8  flex">
            <span className="">
                <img src="assets/Frame 1618871078.png" alt="logo" />
            </span>
            <nav>
                <ul className="flex items-center">
                    {navData.map((item, index) => (
                        <li
                            onClick={() => onActive(index)}
                            key={index}
                            className={`mr-4 cursor-pointer ${item.active ? "text-white" : "text-gray-400"}`}
                        >
                            <a href="#">{item.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            <button onClick={access} className="bg-[#f4f4f4] items-center flex group text-[#041E23] p-2 hover:bg-[#24A0B5] transition-bg duration-200 hover:text-[#f4f4f4] px-4 rounded-md">
                My Ticket <span className="group-hover:-rotate-45  transition-rotate duration-300 transition-all text-xl"><IoIosArrowRoundForward /></span>
            </button>
        </header>
    );
};

export default Header;