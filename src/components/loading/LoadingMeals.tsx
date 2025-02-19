import {Loader2} from "lucide-react";

function LoadingMeals() {
  return (
    <article className='w-full h-full flex flex-col justify-center items-center px-4 py-18 md:p-20 gap-4'>
        <Loader2 size={60} className='animate-spin text-blue-600' />

        <article className="flex flex-col gap-2 text-center justify-center items-center">
            <h2 className="text-3xl font-semibold">Loading...</h2>
            <p className="text-lg text-slate-600">Fetching meals...this'll only take a second</p>
        </article>
    </article>
  )
}

export default LoadingMeals
