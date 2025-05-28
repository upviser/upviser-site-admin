import Link from "next/link";

export default function Page () {
    return (
        <>
          <div className='p-4 lg:p-6 w-full flex flex-col gap-6 min-h-full overflow-y-auto bg-bg dark:bg-neutral-900'>
            <div className='flex justify-between w-full max-w-[1280px] mx-auto'>
              <h1 className='text-lg font-medium my-auto'>Email Marketing</h1>
            </div>
            <div className="flex gap-4">
              <Link href={"/email-marketing/campanas"}>Campañas</Link>
              <Link href={"/email-marketing/automatizaciones"}>Automatizaciones</Link>
            </div>
          </div>
        </>
    )
}