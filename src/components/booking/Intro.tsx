import { durationFormatter } from '@/helper/formattedDates';
import { ServiceProps } from '@/types/ServiceTypes'
import { UserProps } from '@/types/UserTypes';
import Image from 'next/image'
import React from 'react'

interface IntroProps {
    service: ServiceProps;
    employee: UserProps | undefined;
}
export default function Intro(props: IntroProps) {

    const { service, employee } = props;

  return (
    <div className="mt-1 text-start sm:mt-2 bg-primary/70 rounded-md py-2 px-2">
    <div className=' h-fit flex items-center gap-2'>
      {service.pictureFullPath && (
        <Image
          className='w-16 h-full object-cover aspect-auto rounded-md'
          src={service.pictureThumbPath as string}
          width={64}
          height={64}
          alt={service.name as string}
        />
      )}
      <div>
        <h1 className="text-base md:text-lg font-semibold leading-6 text-gray-900">
          Réservation : <span 
          className='underline'
          >{service.name}</span>
        </h1>
        <p className="text-[12px] md:text-[14px] text-gray-500 max-w-xs md:max-w-none">
          {service.description}
        </p>
      </div>
    </div>
    <div className="py-2">
    <p className='text-[15px] text-gray-500'
    >
      <span className="underline">Durée :</span> <span
        className='text-background'
      >{durationFormatter(service.duration)}min</span> - <span className="underline">Interlocuteur:</span> <span className='text-background capitalize'>{employee?.firstName}</span></p>
  </div>
  </div>
  )
}
