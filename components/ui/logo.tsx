import Image from "next/image"

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image 
        src="/assets/Botle-of-water-man.svg"
        alt="Logo"
        width={2000}
        height={2000}
        className="h-24 w-24 overflow-hidden object-cover shrink-0"
        priority
        quality={100}   
      />
      <div className="space-y-1 flex flex-col">
        <h1 className="md:text-3xl text-2xl hidden sm:block font-bold text-[#5DCCFC]">
          Water Reminder
        </h1>
        <p className="md:text-lg text-sm hidden sm:block text-gray-500 dark:text-gray-400">
          Acompanhe sua ingestão de água.
        </p>
      </div>
    </div>
  )
}