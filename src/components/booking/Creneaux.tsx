import React, { useState, useEffect } from 'react';

import Loader from '@/components/Loader';
import TitleStep from '@/components/TitleStep';
import { addHours, isAfter, isSameDay, parse, startOfToday } from 'date-fns';
import { addDuration, formatHour } from '@/helper/creneauFunctions';
import { SlotsProps } from '@/types/CalendarTypes';
import { cn } from '@/lib/utils';

interface CreneauxProps {
  selectedDaySlots: SlotsProps;
  duration: number | undefined;
  color?: string;
  setHourSelected: (value: string) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setSelectedSlotIndex: (value: number) => void;
  selectedSlotIndex?: number;
  daySelected: string;
}

export default function Creneaux(props: CreneauxProps) {
  const { selectedDaySlots, duration, color, setHourSelected, setCurrentStep, currentStep,
    selectedSlotIndex, setSelectedSlotIndex, daySelected
  } = props;
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(false);
  }, [selectedDaySlots]);

  if (loading) {
    return <div><Loader /></div>;
  }
  let availableSlotsCount = 0;

  // console.log(selectedDaySlots)
  return (
    <div>
      <TitleStep
        title='Choisissez une heure'
        titleClasses="text-gray-800"
      />
      {/* Afficher les créneaux ici */}
      {selectedDaySlots && (
        <div className='text-gray-800'>
          <ul
            style={{
              color: color,

            }}
            className={`grid md:grid-cols-4 grid-cols-3 gap-1 text-center`}>
            {Object.entries(selectedDaySlots).map(([startDateTime, slot], index) => {
              const isTodayOrLater = isSameDay(parse(daySelected, 'yyyy-MM-dd', new Date()), startOfToday());


              // Si le créneau est pour aujourd'hui, exclure les créneaux pour les 4 prochaines heures
              if (isTodayOrLater) {
                const fourHoursLater = addHours(new Date(), 6);
                const slotStartTime = parse(startDateTime, 'HH:mm', new Date());

                if (isAfter(slotStartTime, fourHoursLater)) {
                  // ... le reste du code
                  availableSlotsCount++; // Incrémenter le compteur
                  return (
                    getList(index, startDateTime)
                  );
                }
              } else {
                // ... le reste du code pour les jours qui ne sont pas aujourd'hui
                availableSlotsCount++; // Incrémenter le compteur
                return (
                  getList(index, startDateTime)
                );
              }

              return null// Ne rien afficher si ce n'est pas aujourd'hui ou avant 4 heures
            })}
          </ul>
          {availableSlotsCount === 0 && (
            <p className='italic text-sm text-center text-background bg-primary/70 py-4'>Désolé, il n'y a plus de créneaux disponibles pour cette journée.</p>
          )}
        </div>
      )}
    </div>
  );
  function getList(index: number, startDateTime: string) {
    return (
      <li
        style={{
          //   border: `1px solid ${color}`,
          //   backgroundColor: index === hoveredIndex ? color : (index === selectedSlotIndex ? color : 'transparent'),
          //   color: index === hoveredIndex ? 'white' : (index === selectedSlotIndex ? 'white' : ''),
          transition: 'all ease 0.4s',
        }}
        onMouseOver={() => setHoveredIndex(index)}
        onMouseOut={() => setHoveredIndex(null)}
        key={startDateTime}
        className={` cursor-pointer`}
      >
        {duration && (
          <button
            type='button'
            className={cn('py-1 w-full h-full text-background border transition-all duration-100 ease-in', index === selectedSlotIndex ? 'bg-primary border-background' : 'bg-primary/50 border-primary', index === hoveredIndex ? 'bg-primary border-background' : '')}
            onClick={() => {
              setSelectedSlotIndex(index);
              setHourSelected(`${formatHour(startDateTime)}-${formatHour(addDuration(startDateTime, duration))}`);
              setCurrentStep(currentStep + 1);
            }}
          >
            {formatHour(startDateTime)}-{formatHour(addDuration(startDateTime, duration))}
          </button>
        )}

      </li>
    )
  }
}


