import { BsShieldFillCheck } from 'react-icons/bs'
import { GiBrain } from 'react-icons/gi'
import { AiFillBank } from 'react-icons/ai'

const ServiceCard = ({ color, title, icon, subtitle }) => {
    return(
        <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                {icon}
            </div>
            <div className='ml-5 flex flex-col flex-1'>
                <h1 className='mt-2 text-white text-lg'>{title}</h1>
                <p className='mt-2 text-white text-sm md:w-9/12'>{subtitle}</p>
            </div>
        </div>
    )
}

export default function Footer() {
    return(
        <div className='bg-[#293233] flex flex-col md:flex-row w-full justify-center items-center pt-4 h-200'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-col justify-start items-start'>
                    <h1 className='text-white text-4xl sm:text-12xl py-2'>
                        What Time Vault
                        <br/>
                        Has To Offer
                    </h1>
                </div>
            </div>
            <div className='flex flex-col justify-start'>
                <ServiceCard 
                    color="bg-[#1159F4]" 
                    title="On Chain Security" 
                    icon={<BsShieldFillCheck fontSize={21} className='text-[#FF7324]'/>}
                    subtitle="Security by decentralization. The Ethereum blockchain guarantees that your ether will be safely locked away for as long as you want."
                />
                <ServiceCard 
                    color="bg-[#7424FF]" 
                    title="Peace of Mind" 
                    icon={<GiBrain fontSize={21} className='text-[#FF7324]'/>}
                    subtitle="Accidents happen. If your keys become compromised lock them away until it's safe to retrieve them."
                />
                <ServiceCard 
                    color="bg-zinc-900" 
                    title="Flexible Withdraws" 
                    icon={<AiFillBank fontSize={21} className='text-[#FF7324]'/>}
                    subtitle="Adjust the lock time for how ever long you need, there are no time or amount limits."
                />
            </div>
        </div>
    )
}