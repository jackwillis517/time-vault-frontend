import Balloon from "./Balloon"
import React from "react"
export default function Topper() {
    return (
      <div className="bg-[#332027] flex justify-center">
        <div className="text-white grid grid-cols-2 pt-12 max-w-2xl">
            <div className="px-14 py-32">
                <h1 className="text-5xl font-semibold">Keep Your Crypto Safe</h1>
                <h3 className="text-xl mt-5">Time Vault allows you to lock up your ether for a specified amount of time in case of emergency.</h3>
            </div>
            <div className="active:scale-75 translate-x-4 skew-y-3">
                <Balloon/>
            </div>
        </div>
      </div>
      
    )
}