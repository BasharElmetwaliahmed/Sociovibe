'use client'

import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

function Error({reset,error}) {
  return (
    <div className="flex items-center justify-center gap-2 h-layout flex-col text-white text-center">
      <ExclamationCircleIcon className="size-48 text-red-700"/>
      <h2 className="lg:text-5xl text-3xl font-bold">Some Thing Went Wrong!</h2>
      <p className="text-red-400 my-2 text-lg">{error.message}</p>
      <Link href='/' className="p-2 bg-blue hover:opacity-30 transition-all duration-300 px-4 py-2 my-4 rounded-md">Go To Home</Link>
      </div>
  )
}

export default Error