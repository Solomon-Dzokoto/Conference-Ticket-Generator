import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Header = () => {
    const [navData, setNavData] = useState([
        { name: "Event", active: true },
        { name: "My Ticket", active: false },
        { name: "About Page", active: false },
    ]);

    const onActive = (index: number) => {
        setNavData(navData.map((item, i) => ({
            ...item,
            active: i === index
        })));
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
            <button className="bg-[#f4f4f4] flex group text-[#041E23] p-2 hover:bg-[#24A0B5] hover:text-[#f4f4f4] px-4 rounded-md">
                My Ticket <span><IoIosArrowRoundForward /></span>
            </button>
        </header>
    );
};

export default Header;