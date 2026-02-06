"use client";

import { useState } from "react";
import { triggerHelloWorld,triggerSummerizetext } from "./action";


export default function Home() {
  const [text, settext] = useState("")

  const handleSummerize=async(text:string)=>{
   await triggerSummerizetext(text);
   alert("event has been triggered")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <textarea
        className="w-full h-40 p-2 rounded border border-gray-300 resize-none"
        placeholder="Enter your long text here..."
      />
      <button  onClick={ () => { handleSummerize(text); settext("") } } className="rounded p-2 bg-white text-black w-full">
        Summarize
      </button>
    </div>
    </div>
  );
}
