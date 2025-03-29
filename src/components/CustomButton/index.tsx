import { ReactNode } from "react";
import "./index.css";

interface Props {
  children?: ReactNode;
  mt?: string;
  onClick?: any;
  // any props that come into the component
}

export const CustomButton = ({ children, mt, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      style={{ marginTop: mt }}
      className="cutom-button"
    >
      {children}
    </button>
  );
};
