import React from "react";

const Navbar = ({ filterItem, smspropstwo }) => {
  return (
    <>
      <nav className="navbar">
        <div className="btn-group">
          {smspropstwo.map((curElem) => {
            return (
              <button
                className="btn-group__item"
                onClick={() => filterItem(curElem)}
                key={curElem}>
                {curElem}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
