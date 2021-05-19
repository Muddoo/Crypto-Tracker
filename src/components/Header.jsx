import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/" className="d-block m-auto text-center text-warning mt-3 mb-4 heading">Coinstar</Link>
    </div>
  );
};

export default Header;
