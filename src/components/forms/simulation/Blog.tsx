"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import React, { Dispatch, SetStateAction, useState } from 'react'

interface BlogProps {
    control: any;
    setBlog: Dispatch<SetStateAction<{ active: boolean; isSeo: boolean; }>>;
    blog: { active: boolean; isSeo: boolean; };
}
export default function Blog(props: BlogProps) {
    const { control, setBlog, blog } = props;

    const [sliderValue, setSliderValue] = useState<number>(0);

    return (
        <>
            <div className='rounded-lg border border-destructive p-4'>
                <FormField
                    control={control}
                    name="blog"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5 text-left">
                                <FormLabel className="text-base">
                                    Blog
                                </FormLabel>
                                <FormDescription>
                                    Création d'un site type Blog.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    className='data-[state=checked]:bg-destructive'
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked)
                                        setBlog((prev) => ({ ...prev, active: !prev.active }))
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {blog.active && (
                    <>
                        <Separator className='my-5' />
                        <FormField
                            control={control}
                            name="blogSeo"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-y-0 justify-between gap-4">
                                    <div className="text-left">
                                        <FormLabel className="text-[14px] font-normal">
                                            Optimisation <span className='font-semibold'>SEO</span>
                                        </FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                              className='data-[state=checked]:bg-destructive '
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked)
                                                setBlog((prev) => ({ ...prev, isSeo: !prev.isSeo }))
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
