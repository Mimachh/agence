"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import React, { Dispatch, SetStateAction, useState } from 'react'




interface EcommerceProps {
    control: any;
    setVitrine: Dispatch<SetStateAction<{ active: boolean; isBooking: boolean; nbServices: number; nbEmployees: number; }>>;
    vitrine: { active: boolean; isBooking: boolean; nbServices: number; nbEmployees: number; };
}
export default function Vitrine(props: EcommerceProps) {
    const { control, setVitrine, vitrine } = props;

    const [sliderValue, setSliderValue] = useState<number>(0);

    return (
        <>
            <div className='rounded-lg border border-indigo-400 p-4'>
                <FormField
                    control={control}
                    name="vitrine"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5 text-left">
                                <FormLabel className="text-base">
                                    Page vitrine
                                </FormLabel>
                                <FormDescription>
                                    Création et intégration d'une page vitrine de votre activité.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    className='data-[state=checked]:bg-indigo-400'
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked)
                                        setVitrine((prev) => ({ ...prev, active: !prev.active }))
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {vitrine.active && (
                    <>
                        <Separator className='my-5' />

                        <FormField
                            control={control}
                            name="isResa"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-y-0 justify-between gap-4">
                                    <div className="text-left">
                                        <FormLabel className="text-[14px] font-normal">
                                            Ajouter un module de  <span className='font-semibold'><strong>réservation en ligne</strong></span>
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            className='data-[state=checked]:bg-indigo-400'
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked)
                                                setVitrine((prev) => ({ ...prev, isBooking: !prev.isBooking }))
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </>
                )}
            </div>

        </>
    );
}
