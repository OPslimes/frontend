import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { FaPersonBooth, FaCodepen, FaIcons, FaSearchengin, FaChevronRight } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import "../styles/Navbar.css";

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const toast = useToast();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  const inputRef = useRef(null);
  const searchWrapper = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleBooth() {
    window.location.href = "/profile";
  }

  function handleLogOut() {
    removeCookie("token");
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

  function handleSearch(input) {
    toast({
      title: "Search",
      description: "Search is not yet implemented.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  async function handleOnKeyUp() {
    searchWrapper.current.classList.add("active");

    const input = inputRef.current.value;
    if (input.length > 0) {
      setIsLoading(true);

      const res = await axios({
        baseURL: "http://localhost:4000/",
        method: "POST",
        url: "api/v1/graphql",
        withCredentials: true,
        data: {
          query: `
          query SearchUsers($username: String!) {
            searchUsers(username: $username) {
                avatar
                username
                email
            }
          }
        `,
          variables: {
            username: input,
          },
        },
      });

      if (res.data.data) {
        const users = res.data.data.searchUsers;
        setSearchResults(users);
        setIsLoading(false);
      }
    } else searchWrapper.current.classList.remove("active");
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [showSearchInput]);

  return (
    <div className="flex">
      <div className="navbar justify-center">
        <div className="align-top image-full">
          <img src="/assets/God.png" alt="Hello World" />
        </div>

        <div>
          <FaCodepen className="badge btn btn-sm m-3 h-10 pt-1 pb-1 bg-gray-500" />
          <FaPersonBooth className="badge btn btn-sm m-3 h-10 pt-1 pb-1 bg-gray-500" onClick={handleBooth} />
          <FaIcons className="badge btn btn-sm m-3 h-10 pt-1 pb-1 bg-gray-500" />
          {cookies.token ? (
            <BiLogOut className="badge btn btn-sm m-3 h-10 pt-1 pb-1 bg-gray-500" onClick={() => handleLogOut()} />
          ) : null}
        </div>
      </div>
      <Container
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        hover={showSearchInput}
        ref={searchWrapper}>
        <SearchInput
          ref={inputRef}
          showSearchInput={showSearchInput}
          onKeyUp={async () => await handleOnKeyUp(inputRef.current?.value)}
          type="text"
          placeholder="Search..."
        />
        {showSearchInput ? (
          <IconRightArrow onClick={() => handleSearch(inputRef.current?.value)} />
        ) : (
          <IconMagnifyingGlass />
        )}
        <div className="autocomplete-box">
          {!isLoading
            ? searchResults.map((user) => (
                <div style={{ float: "left", width: "100%", margin: "5px 0", lineHeight: "55px" }}>
                  <div
                    className="item"
                    onClick={() =>
                      toast({
                        title: "Search",
                        description: `HEHE THIS GUYS EMAIL IS "${user.email}"`,
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                      })
                    }>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundSize: "100% auto !important",
                        float: "left",
                        marginRight: "10px",
                        alignSelf: "center",
                        justifySelf: "center",
                        borderRadius: "50%",
                      }}
                      src={user.avatar}
                      alt="Avatar"
                    />
                    <li key={user.username}>{user.username}</li>
                  </div>
                </div>
              ))
            : null}
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  position: absolute;
  margin: 27px 55px 0px 0px;
  width: 55px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 20px;
  border: 0px solid;
  padding: 5px;
  background: #222831;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  self-align: end;
  left: auto;
  right: 0;

  ${({ hover }) =>
    hover &&
    css`
      width: 50%;
      height: 40px;
      margin: 30px 55px 0px 0px;
      border-radius: 10px;
      -webkit-box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.74);
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.74);
      border: 3px solid rgb(255, 255, 255);

      @media (min-width: 768px) {
        width: 17%;
      }
    `}

  &.active .autocomplete-box {
    padding: 10px 8px;
    opacity: 1;
    pointer-events: auto;
  }

  &.active .autocomplete-box .item {
    display: block;
    fontsize: 12px;
    float: left;
    display: flex;
    width: 100%;
    color: black;
    lineheight: 55px;
    alignitems: center;
    justifycontent: center;
    flexdirection: row;
  }

  &.active {
    border-radius: 10px 10px 0px 0px;
    border: 0px;
  }
`;

const SearchInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  line-height: 20px;
  outline: 0;
  border: 0;
  font-size: 1rem;
  color: #fff;
  border-radius: 10px;
  padding: 0 20px;
  margin: 0;
  background: #222831;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  display: ${(props) => (props.showSearchInput ? "block" : "none")};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const IconCommonCss = css`
  height: 1.25rem;
  width: 1.25rem;
  fill: white;
  z-index: 10;
  animation: ${fadeIn} 1s linear;
`;

const IconMagnifyingGlass = styled(FaSearchengin)`
  ${IconCommonCss}
  height: 3rem;
`;

const IconRightArrow = styled(FaChevronRight)`
  ${IconCommonCss}
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    fill: #393e46;
  }
`;

export default Navbar;
