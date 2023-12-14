"use client"
import React, { useEffect, useState } from 'react'
import { format, startOfToday } from "date-fns"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"

import Calendar from './Calendar'
import { ServiceProps } from '@/types/ServiceTypes';
import { SlotsProps } from '@/types/CalendarTypes';
import { UserProps } from '@/types/UserTypes';
import useSWR from 'swr'
import { Separator } from '../ui/separator';
import Creneaux from './Creneaux';
import Informations from './Informations';
import Tabulation from "./Tabulation"
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { CalendarDays } from 'lucide-react';
import Intro from './Intro';
import { formatDateTimeForStore } from '@/helper/formattedDates';
import axios from 'axios';
import { headers } from '@/helper/ameliaHeaders';
import Confirmation from './Confirmation';
import { useModal } from '@/context/ModalContext';
import { BookingProps } from '@/types/BookingTypes';


const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BookingWrapper() {

  const { open, setOpen } = useModal();

  const serviceId = "1";
  const employeeID = "1"
  const today = startOfToday();
  const formattedToday = format(today, "yyyy-MM-dd");

  const { data: serviceData, error: serviceError, isLoading: isServiceLoading } = useSWR(`/api/amelia/services?service=${serviceId}`, fetcher);
  const { data: slotData, error: slotError, isLoading: isSlotLoading } = useSWR(`/api/amelia/slots?serviceId=${serviceId}&startDateTime=${formattedToday}`, fetcher);
  const { data: employeeData, error: employeeError, isLoading: isEmployeeLoading } = useSWR(`/api/amelia/employee?employee=${employeeID}`, fetcher);


  const [service, setService] = useState<ServiceProps>({});
  const [slots, setSlots] = useState<SlotsProps[]>([]);
  const [employee, setEmployee] = useState<UserProps>();
  const [currentStep, setCurrentStep] = useState(1);
  const [daySelected, setDaySelected] = useState<string>('');
  const [selectedDaySlots, setSelectedDaySlots] = useState<SlotsProps>({});
  const [slotSelectedOccupied, setSlotSelectedOccupied] = useState<SlotsProps>({});
  const [occupiedSlots, setOccupiedSlots] = useState<SlotsProps[]>([]);
  const [hourSelected, setHourSelected] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | undefined>();
  const [bookingValidated, setBookingValidated] = useState<BookingProps>()

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (serviceData) {
      setService(serviceData.service);
    }

    if (slotData) {
      setSlots(slotData.slots)
    }

    if (employeeData) {
      setEmployee(employeeData.user)
    }

  }, [serviceData, slotData, employeeData]);

  // console.log({ daySelected })
  // console.log({employee},{slots},{service})
  useEffect(() => {
    // Fonction pour obtenir les créneaux horaires associés à la date sélectionnée
    const getSlotsForSelectedDay = () => {
      if (daySelected && slots.hasOwnProperty(daySelected)) {
        const slotsSelected = slots[daySelected];
        setSlotSelectedOccupied(occupiedSlots[daySelected]);
        setSelectedDaySlots(slotsSelected);
        return { slotsSelected, slotSelectedOccupied };
      }
      setSelectedDaySlots({});
      return { slotsSelected: null, slotSelectedOccupied: null };
    };
    getSlotsForSelectedDay()
  }, [daySelected, slots]);

  const formSchema = z.object({
    nom: z.string().min(2).max(50),
    prenom: z.string().min(2).max(50),
    email: z.string().min(5).email(),
    telephone: z.string().min(10).max(10).nullable(),
    notes: z.string().max(60).nullable(),
    terms: z.boolean().default(false).refine(data => data, { message: 'Veuillez accepter les termes et conditions' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      notes: "",
      terms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const formattedDateTime = formatDateTimeForStore(`${daySelected} ${hourSelected}`);

    //   const requestData = {
    //     formattedDateTime,
    //     values,
    //     duration: service.duration,
    //     employeeID: employeeID,
    //     serviceId: serviceId,
    // };
    // console.log({requestData})

    // Envoi vers l'api  /amelia/postBooking?formattedDateTime=${formattedDateTime}&values=${values}&duration=${service.duration}&employee=${employeeID}$serviceId=${serviceId}

    // const response = await axios.post(`api/amelia/postBooking?formattedDateTime=${formattedDateTime}&values=${values}&duration=${service.duration}&employeeID=${employeeID}$serviceId=${serviceId}`);
    // const response = await axios.post(`http://localhost:3000/api/amelia/postbooking`, {
    //   data : requestData
    // }).then(response => {
    //   console.log("RESPONSEEEE",response);
    // });


    try {
      const postBookingUrl = `bookings`;
      const ameliaURL = process.env.NEXT_PUBLIC_AMELIA_URL;
      const postBooking = await axios.post(`${ameliaURL}/${postBookingUrl}`, {
        "type": "appointment",
        "bookings": [
          {
            // "extras": [],
            "customFields": {
              "1": {
                "label": "Informations compl\u00e9mentaires",
                "type": "text-area",
                "value": values.notes
              }
            },
            "deposit": true,
            "locale": "fr_FR",
            "utcOffset": null,
            "persons": 1,
            "customerId": null,
            "customer": {
              "id": null,
              "firstName": values.prenom,
              "lastName": values.nom,
              "email": values.email,
              "phone": "",
              "countryPhoneIso": "",
              "externalId": null
            },
            "duration": service.duration
          }
        ],
        "payment": {
          "gateway": "onSite",
          "currency": "EUR",
          "data": {}
        },
        "recaptcha": null,
        "locale": "fr_FR",
        "timeZone": "Europe/Paris",
        "bookingStart": formattedDateTime,
        "notifyParticipants": 1,
        "locationId": 1,
        "providerId": employeeID,
        "serviceId": serviceId,
        "utcOffset": null,
        "recurring": [],
        "package": [],
        "couponCode": null,
        "runInstantPostBookingActions": false
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Amelia': process.env.NEXT_PUBLIC_AMELIA_API,
            'Accept': "*/*",
          },
        }
      );
      console.log({ postBooking });

      setBookingValidated(postBooking.data.data)
      const postBookingID = postBooking.data.data.appointment.id;
      const postBookingPaiementID = postBooking.data.data.paymentId;
      const postBookingCustomerID = postBooking.data.data.booking.customerId;
      try {
        const postBookingNotifcation = await axios.post(`${ameliaURL}/bookings/success/${postBookingID}`, {
          "type": "appointment",
          "appointmentStatusChanged": false,
          "recurring": [],
          "packageId": null,
          "customerId": postBookingCustomerID,
          "paymentId": postBookingPaiementID,
          "packageCustomerId": null
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'Amelia': process.env.NEXT_PUBLIC_AMELIA_API,
              'Accept': "*/*",
            },
          });
        console.log(postBookingNotifcation)
      } catch (error) {
        console.log(error)
      }
      setCurrentStep(currentStep + 1)
      setLoading(false)
      form.reset()
      // setLoading(false)
    } catch (error) {
      console.log(error);
    }

  }


  if (isServiceLoading || isSlotLoading) {
    return <div>Chargement...</div>
  }

  if (serviceError || slotError) {
    return <div>Erreur</div>
  }


  return (
    <div className='w-full text-left'>
      <Intro
        service={service}
        employee={employee}
      />
      <Separator className="my-2" />
      
      <Tabulation
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        setSelectedSlotIndex={setSelectedSlotIndex}
        color={service.color}
        daySelected={daySelected}
        hourSelected={hourSelected}
      />
      <Separator className="my-2" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          {currentStep === 1 && (
            <Calendar
              service={service}
              slots={slots}
              employee={employee}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              setDaySelected={setDaySelected}
            />
          )}

          {currentStep === 2 && (
            <Creneaux
              selectedDaySlots={selectedDaySlots}
              duration={service.duration}
              color={service.color}
              setHourSelected={setHourSelected}
              setCurrentStep={setCurrentStep}
              daySelected={daySelected}
              currentStep={currentStep}
              selectedSlotIndex={selectedSlotIndex}
              setSelectedSlotIndex={setSelectedSlotIndex}
            />
          )}



          {currentStep === 3 && (
            <>
              <Informations
                control={form.control}
              />
              <Button
                disabled={loading}
                size='lg'
                className='bg-primary/80 text-background hover:bg-primary w-full flex items-center gap-2 disabled:bg-muted-foreground/40 disabled:cursor-not-allowed'
                type="submit">
                <CalendarDays className='w-5 h-5' />
                Je réserve
              </Button>
            </>

          )}
          {currentStep === 4 && (
            //CONFIRMATION
            <Confirmation
              setOpen={setOpen}
              color={service.color}
              bookingValidated={bookingValidated}
            />
          )}
        </form>
      </Form>
    </div>
  )
}
