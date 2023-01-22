import React from "react";
// Import icon
import { FaPortrait } from "react-icons/fa";

function Header() {
  return (
    <header>
      <nav className="grid grid-rows-2 ">
        <form>
          <input type="text" id="link_url" className="" placeholder="http://example.com" required />
          <input type="text" id="link_title" className="" placeholder="Example title"/>
        </form>
        <FaPortrait />
      </nav>
    </header>
    // <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    //   <div className="flex items-center flex-shrink-0 text-white mr-6">
    //     <span className="font-semibold text-xl tracking-tight">
    //       Менеджер ссылок
    //     </span>
    //   </div>
    // </nav>
  );
}

export default Header;
