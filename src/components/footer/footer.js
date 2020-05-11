import React from "react";

const Footer = () => {
  return (
    <footer className="text-center p-2 text-gray-400 text-sm border-t  border-gray-300">
      &copy; {new Date().getFullYear()} xtra cart limited
    </footer>
  );
};

export default Footer;
