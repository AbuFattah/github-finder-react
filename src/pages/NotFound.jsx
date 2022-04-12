import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col space-y-6 items-center justify-center">
      <h1 className="text-7xl font-bold">Oops!</h1>
      <h3 className="text-4xl font-semibold">404 - Page Not Found</h3>
      <Link to="/" className="btn btn-primary  rounded">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
