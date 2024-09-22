"use client";
import { useFormStatus } from "react-dom";
export const FollowButtonHeader = ({ followed, isCurrentUser }) => {
  const { pending } = useFormStatus();
  console.log('aa')

  return (
    <button
    
      disabled={isCurrentUser || pending}
      className={`py-3 px-14 bg-blue disabled:bg-gray-700 disabled:cursor-not-allowed 
          cursor-pointer  mt-4 rounded-[28px] transition-all duration-300 border-[2px] 
           ${
             followed
               ? "bg-blue hover:bg-transparent hover:text-blue "
               : "bg-transparent hover:bg-blue text-blue hover:text-white"
           } font-semibold ${
        isCurrentUser ? "border-transparent !text-blue" : "border-blue"
      }`}>
      {followed ? "UnFollow" : "Follow"}
    </button>
  );
};
