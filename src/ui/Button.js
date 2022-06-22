import React from "react";

function Button({ btnType, children, className, ...props }) {
  const btn_fill =
    "p-2 px-4 rounded bg-gray-800  border border-gray-800  text-white text-base ";
  const btn_outline =
    "p-2 px-4 rounded  border border-gray-800 text-gray-700 text-base";
  const btn_fill_small =
    "p-1 px-2 rounded-sm  border border-gray-800  bg-gray-800 text-white text-sm ";
  const btn_outline_small =
    "p-1 px-2 rounded-sm  border border-gray-800 text-gray-700 text-sm";

  switch (btnType) {
    case "fill": {
      return (
        <button {...props} className={`${className}  ${btn_fill}`}>
          {children}
        </button>
      );
    }
    case "outline": {
      return (
        <button {...props} className={`${className} ${btn_outline}`}>
          {children}
        </button>
      );
    }
    case "fill-small": {
      return (
        <button {...props} className={`${className} ${btn_fill_small}`}>
          {children}
        </button>
      );
    }
    case "outline-small": {
      return (
        <button {...props} className={`${className} ${btn_outline_small}`}>
          {children}
        </button>
      );
    }
    default: {
      return (
        <button {...props} className={`${className}`}>
          {children}
        </button>
      );
    }
  }
}

export default Button;
