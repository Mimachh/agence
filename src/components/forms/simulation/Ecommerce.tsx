"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface EcommerceProps {
    control: any;
    setECommerce: Dispatch<SetStateAction<{ active: boolean; isSeo: boolean; nbProducts: number; }>>;
    eCommerce: { active: boolean; isSeo: boolean; nbProducts: number; };
    setPrice: Dispatch<SetStateAction<number>>;
}
export default function Ecommerce(props: EcommerceProps) {
    const { control, setECommerce, eCommerce, setPrice } = props;

    const [sliderValue, setSliderValue] = useState<number>(0);

    return (
        <>
            <div className='rounded-lg border border-primary p-4'>
                <FormField
                    control={control}
                    name="ecommerce"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5 text-left">
                                <FormLabel className="text-base">
                                    E-commerce
                                </FormLabel>
                                <FormDescription>
                                    Création et intégration d'un site e-commerce personnalisé.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked)
                                        setECommerce((prev) => ({ ...prev, active: !prev.active }))
                                        // setPrice((prev) => prev + (checked ? 650 : -650));
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {eCommerce.active && (
                    <>
                        <Separator className='my-5' />
                        <div className='mt-3'>
                            <FormField
                                control={control}
                                name="nbProduits"
                                render={({ field }) => (
                                    <FormItem className='space-y-'>
                                        <div className="text-left">
                                            <FormLabel className="text-[14px] font-normal">
                                                Nombre estimé de produits à intégrer : <span className='font-semibold text-[18px]'>{sliderValue}</span>
                                            </FormLabel>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                defaultValue={[sliderValue]}
                                                className='cursor-pointer'
                                                onValueChange={(value) => {
                                                    // Mettez à jour l'état avec la nouvelle valeur
                                                    field.onChange(value[0]);
                                                    setSliderValue(value[0]);
                                                    setECommerce((prev) => ({ ...prev, nbProducts: value[0] }))
                                                    // const unitPrice = 650 * 0.07;
                                                    // setPrice((prev) => (value[0] * unitPrice) + prev);
                                                    // console.log()
                                                }}
                                                max={500}
                                                step={1}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator className='my-5' />

                        <FormField
                            control={control}
                            name="ecommerceSeo"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-y-0 justify-between gap-4">
                                    <div className="text-left">
                                        <FormLabel className="text-[14px] font-normal">
                                            Optimisation <span className='font-semibold'>SEO</span>
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked)
                                                setECommerce((prev) => ({ ...prev, isSeo: !prev.isSeo }))
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
