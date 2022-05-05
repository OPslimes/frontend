import React from "react";
import { FaPersonBooth, FaCodepen, FaIcons } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const toast = useToast();

  function handleBooth() {
    window.location.href = "/profile";
  }

  function handleLogOut() {
    removeCookie("userId");
    toast({
      title: "Logged Out",
      description: "You have been logged out.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    window.location.reload();
  }

  return (
    <>
      <div className="flex navbar justify-center">
        <div className="align-top image-full">
          <img src="/assests/God.png" alt="Hello World" />
        </div>

        <div>
          <FaCodepen className="badge btn btn-sm m-3" />
          <FaPersonBooth className="badge btn btn-sm m-3" onClick={handleBooth}/>
          <FaIcons className="badge btn btn-sm m-3" />
          {cookies.userId ? <BiLogOut className="badge btn btn-sm m-3" onClick={() => handleLogOut()} /> : null}
        </div>
      </div>
    </>
  );
}

export default Navbar;
