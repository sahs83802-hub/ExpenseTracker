// src/components/layouts/AuthLayout.jsx
import React from "react";
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex bg-white">
      {/* LEFT SIDE */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col">
        {/* top brand */}
        <header className="mb-16">
          <h1 className="text-2xl font-semibold text-black">Expense Tracker</h1>
        </header>

        {/* auth form goes here */}
        <main className="flex-1 flex items-center">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>

      {/* RIGHT SIDE (hidden on small screens) */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 relative overflow-hidden">
        {/* floating purple block */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />

        {/* outline block */}
        <div className="w-48 h-56 rounded-[40px] border-2 border-fuchsia-600 absolute top-[30%] -right-20" />

        {/* big bottom purple block */}
        <div className="w-64 h-72 rounded-[40px] bg-purple-600 absolute -bottom-16 right-8" />

        {/* stats card with image */}
        <div className="absolute top-24 right-8 left-8">
          <div className="bg-white rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400">
                  Track Your Income &amp; Expenses
                </p>
                <p className="text-lg font-semibold">$12,000</p>
              </div>
              <button className="flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-600 text-white">
                <LuTrendingUpDown className="w-5 h-5" />
              </button>
            </div>

            <img
              src={CARD_2}
              alt="All Transactions chart"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
