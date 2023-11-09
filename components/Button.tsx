import { FC } from "react";

export const Button: FC<any> = ({ children }) => {
  return (
    <button className="px-10 py-6 rounded-2xl bg-white text-black">
      {children}
    </button>
  );
};
