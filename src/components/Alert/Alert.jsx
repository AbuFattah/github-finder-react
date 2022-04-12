import React, { useEffect, useState } from "react";

const Alert = ({ alert }) => {
  const [alertState, setAlertState] = useState();
  let icon;

  switch (alert?.type) {
    case "error":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;

    case "success":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
      break;
    default:
      break;
  }

  useEffect(() => {
    if (!alert?.type) {
      setAlertState("");
      return;
    }
    const alertContent = (
      <div className=" mb-3 flex gap-2">
        {icon}
        {alert?.message}
      </div>
    );
    setAlertState(alertContent);

    let timeoutId = setTimeout(() => {
      setAlertState("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [alert]);

  return <div>{alertState}</div>;
};

export default Alert;
