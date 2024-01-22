"use client";
import { useState } from "react";
import MyCityDiv from "./MyCityDiv";
import "./style.module.css";
import { FocusBar } from "./FocusBar";

export const Modal = () => {
  const [openModal, setOpenModal] = useState(false);
  setTimeout(() => setOpenModal(true), 2000);
  return (
    <>
      {openModal && (
        <section className="flexCenter animate-showBlur fixed left-0 top-0 z-50 size-full ">
          <FocusBar />
          <div className="flexCenter size-full flex-col  gap-5 text-white">
            <MyCityDiv />
          </div>
        </section>
      )}
    </>
  );
};
