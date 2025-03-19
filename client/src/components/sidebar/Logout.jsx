import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Logging out...</span>
        </div>
      ) : (
        <button
          onClick={logout}
          className="h-9 w-9 text-black cursor-pointer"
          aria-label="Logout"
        >
          <BiLogOutCircle className="h-9 w-9 text-black" />
        </button>
      )}
    </div>
  );
};

export default Logout;
