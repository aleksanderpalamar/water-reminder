import Image from "next/image"

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image 
        src="/assets/Botle-of-water-man.svg"
        alt="Logo"
        width={2000}
        height={2000}
        className="h-24 w-24 overflow-hidden object-cover"
        priority
        quality={100}   
      />
      <div className="space-y-1 flex flex-col">
        <h1 className="text-3xl font-bold text-[#5DCCFC]">Water Reminder</h1>
        <p className="text-sm text-gray-500">Acompanhe sua ingestão de água.</p>
      </div>
    </div>
  )
}