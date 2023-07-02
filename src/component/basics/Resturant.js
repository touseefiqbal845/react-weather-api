import React, { useState } from "react";
import "./style.css";
import Menu from "./MenuApi";
import MenuCard from "./Men";
import Navbar from "./Navbar";

const unique = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];

const Resturant = () => {
  const [dishData, setDishData] = useState(Menu);
  const [dishDataa, setDishDataa] = useState(unique);

  const filterItem = (category) => {
    if (category === "All") {
      setDishData(Menu);
    } else {
      const updatedlist = Menu.filter((curElem) => {
        return curElem.category === category;
      });
      setDishData(updatedlist);
    }
  };

  return (
    <>
     
        <h1 style={{ textAlign: "center", color: "red" ,fontSize: "40px" }}>TOUSEEF RESTURANT</h1>
        <h3 style={{ textAlign: "center" , marginBottom:"0px" }}>OUR FULL-DAY MENUS PLEASE SELECT</h3>
    

      <Navbar filterItem={filterItem} smspropstwo={dishDataa} />
      <MenuCard smsprops={dishData} />
    </>
  );
};

export default Resturant;
