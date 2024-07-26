import Spinner from "@/app/_components/Spinner"

function loading() {
  return (
    <div className="min-h-[calc(100vh_-_80px)] flex justify-center items-center"><Spinner/></div>
  )
}

export default loading