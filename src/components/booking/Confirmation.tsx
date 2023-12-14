import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button';
import axios from 'axios';
import Loader from '../Loader';
import { format } from 'date-fns';
import { durationFormatter } from '@/helper/formattedDates';
import { CheckCircle } from 'lucide-react';
import TitleStep from '../TitleStep';
import { BookingProps } from '@/types/BookingTypes';
interface ConfirmationProps {
  setOpen: (value: boolean) => void;
  bookingValidated?: BookingProps;
  color?: string;
}

export default function Confirmation(props: ConfirmationProps) {
  const { setOpen, bookingValidated, color } = props;
  const [loading, setLoading] = useState(false)
  const [extrasBookedDetails, setExtrasBookedDetails] = useState([]); // State pour stocker les détails des extras réservés

  const extrasBooked = bookingValidated?.booking.extras;

  return (
    <div className='text-gray-800'>
      {loading ? (
        <Loader />
      ) : bookingValidated  ? (
        <>
          <div className='flex items-center justify-start gap-4 pt-3 pb-5'>
          <CheckCircle 
          style={{
            color: color
          }}
          className='w-5 h-5'/>
            <TitleStep
            divClasses="p-0"
              title={`Confirmation de réservation pour ${bookingValidated.booking.customer.firstName} ${bookingValidated.booking.customer.lastName}`}
            />
          </div>

          <p>Merci <strong>{bookingValidated.booking.customer.firstName}</strong> de votre réservation ! <br /></p>
          <p>Notre rendez-vous du <span className='font-bold'>{format(new Date(bookingValidated.appointment.bookingStart), 'dd/MM/yyyy à hh:mm')}</span> est bien enregistré.
          </p>
          <p className='font-extrabold mt-6 mb-2'>Informations complémentaires : </p>
          <ul className='space-y-2'>
            <li>Vous recevrer un e-mail de confirmation ainsi qu'un rappel 24h avant le rendez-vous à l'adresse : {bookingValidated.booking.customer.email}</li>
          </ul>
          {/* {extrasBookedDetails.map((extra, index) => (
            <div key={index}>
              <p>Extra ID: {extra.extraId}</p>
              <p>Name: {extra.name}</p>
              <p>Quantity: {extra.quantity}</p>
              <p>Price: {extra.price}</p>
            </div>
          ))} */}
          <div className='w-full flex justify-center'>
            <Button
              type='button'
              className='mt-8 w-full bg-primary/70 hover:bg-background hover:text-secondary transition-all'
              onClick={() => setOpen(false)}
              variant='default'>Continuer</Button>
          </div>

        </>
      ) : (
        <p>Une erreur est survenue</p>
      )}

    </div>
  )
}
