import { SquareX } from "lucide-react";
import { ReactNode, useState } from "react";

type TModalProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  isOpen: boolean | (() => void);
  toggle: (() => void);
};

export const useModal = (): [boolean, () => void] => {
  const [isOpenModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!isOpenModal);

  return [isOpenModal, toggleModal];
};

export const Modal = ({ title, children, className, isOpen, toggle }: TModalProps) => {
  return isOpen && (
    <div className="absolute inset-0 bg-black/75 grid place-items-center">
      <div className={`bg-white w-100 p-5 rounded-sm ${className}`}>
        <div className="border-b-2 border-gray-900 pb-2 flex justify-between">
          <h1 className="text-lg text-gray-900 font-medium">{title}</h1>
          <button className="cursor-pointer" onClick={() => toggle()}>
            <SquareX size={25} className="text-red-400" />
          </button>
        </div>
        <div className="p-5 font-sans font-normal">
          {children}
        </div>
      </div>
    </div>
  );
};
