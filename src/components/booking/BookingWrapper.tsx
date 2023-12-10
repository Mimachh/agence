"use client"
import React, { useEffect, useState } from 'react'
import { format, startOfToday } from "date-fns"

import Calendar from './Calendar'
import { ServiceProps } from '@/types/ServiceTypes';
import { SlotsProps } from '@/types/CalendarTypes';
import { UserProps } from '@/types/UserTypes';
import useSWR from 'swr'


const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BookingWrapper() {
  const serviceId = "3";
  const today = startOfToday();
  const formattedToday = format(today, "yyyy-MM-dd");

  const { data: serviceData, error: serviceError, isLoading: isServiceLoading } = useSWR(`/api/amelia/services?service=${serviceId}`, fetcher);

  const { data: slotData, error: slotError, isLoading: isSlotLoading } =  useSWR(`/api/amelia/slots?serviceId=${serviceId}&startDateTime=${formattedToday}`, fetcher);
  


  const [service, setService] = useState<ServiceProps>({});
  const [slots, setSlots] = useState<SlotsProps[]>([]);
  const [employee, setEmployee] = useState<UserProps>();
  const [currentStep, setCurrentStep] = useState(1);
  const [daySelected, setDaySelected] = useState<string>('');

  useEffect(() => {

    if (serviceData) {
      setService(serviceData.service);
    }
    
    if (slotData) {
      setSlots(slotData.slots)
    }

  }, [serviceData, slotData]);



  if(isServiceLoading || isSlotLoading) {
    return <div>Chargement...</div>
  }

  if(serviceError || slotError) {
    return <div>Erreur</div>
  }
  
  return (
    <>
      {/* <Calendar
        service={service}
        slots={slots}
        employee={employee}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        setDaySelected={setDaySelected}
      /> */}
    </>
  )
}
