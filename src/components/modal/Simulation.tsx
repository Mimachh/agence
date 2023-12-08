"use client"
import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Ecommerce from '../forms/simulation/Ecommerce'
import { Input } from '../ui/input'
import Blog from '../forms/simulation/Blog'
import Vitrine from '../forms/simulation/Vitrine'
import { SendHorizontal } from 'lucide-react'
import { Separator } from '../ui/separator'
import axios from 'axios'
import { useNotification } from '@/context/NotificationContext'
import { useModal } from '@/context/ModalContext'
const formSchema = z.object({
  ecommerce: z.boolean().default(false),
  nbProduits: z.number().nullable().default(0),
  ecommerceSeo: z.boolean().default(false),

  blog: z.boolean().default(false),
  blogSeo: z.boolean().default(false),

  vitrine: z.boolean().default(false),
  isResa: z.boolean().default(false),


  email: z.string().email(),
})
export default function Simulation() {
  const [loading, setLoading] = useState(false)
  const { showNotification } = useNotification();
  const {setOpen} = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ecommerce: false,
      nbProduits: 0,
      ecommerceSeo: false,

      blog: false,
      blogSeo: false,

      vitrine: false,
      isResa: false,

      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values)

    setLoading(true);

    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/demande-de-devis/v1/submit`;
    try {
      axios.post(apiUrl, {
        email: values.email,
        ecommerce: values.ecommerce,
        nbProduits: values.nbProduits,
        ecommerceSeo: values.ecommerceSeo,
        blog: values.blog,
        blogSeo: values.blogSeo,
        vitrine: values.vitrine,
        isResa: values.isResa,
        prix: price
      })
        .then(response => {
          // console.log('Réponse de l\'API:', response.data.message);
          showNotification('Nous avons bien reçu votre demande, nous vous recontacterons dès que possible !', 'success', 'Enregistrement réussi !');
          form.reset()
        })
        .catch(error => {
          // console.error('Erreur lors de la requête POST:', error.response.data.message);
          showNotification(error.response.data.message, 'error', 'Erreur');
        })
        .finally(() => {
          setLoading(false);
          setOpen(false)
        });

    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
      setLoading(false);
    }
  }

  // active / isSeo / NbProducts
  const [eCommerce, setECommerce] = useState({
    active: false,
    isSeo: false,
    nbProducts: 0,
  });

  const [blog, setBlog] = useState({
    active: false,
    isSeo: false,
  });

  const [vitrine, setVitrine] = useState({
    active: false,
    isBooking: false,
    nbServices: 0,
    nbEmployees: 1
  });
  const [price, setPrice] = useState(0)




  // vitrine price = 450
  // ajout résa = 350 + 25% par employé et par service
  // ajout SEO = + 30%

  // ecommerce price = 650
  // + 7 % par produits à intégrer
  // ajout seo = + 30%  (du ecommerce price)  / + 4 % par produits à intégrer

  // blog = 490
  // + 18% par articles à intégrer
  // ajout seo = + 30% du prix du blog / +15% par articles

  useEffect(() => {
    // Calculer le prix en fonction des options sélectionnées
    let totalPrice = 0;

    // Vitrine
    if (vitrine.active) {
      totalPrice += 450; // Prix de base pour Vitrine

      // Ajout réservation
      if (vitrine.isBooking) {
        totalPrice += 350;
      }
    }

    // Ecommerce
    if (eCommerce.active) {
      totalPrice += 650; // Prix de base pour Ecommerce

      // Ajout 7% par produit à intégrer
      totalPrice += (0.07 * 650) * eCommerce.nbProducts;
      // Ajout SEO
      if (eCommerce.isSeo) {
        totalPrice += (650 * 0.3);
        // Ajout 4% par produit à intégrer
        totalPrice += (0.04 * 650) * eCommerce.nbProducts;
      }
    }

    // Blog
    if (blog.active) {
      totalPrice += 490; // Prix de base pour Blog

      // Ajout SEO
      if (blog.isSeo) {
        totalPrice += (490 * 0.3);
      }
    }

    setPrice(Number(totalPrice.toFixed(2)));
  }, [vitrine, eCommerce, blog]);

  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-medium">Choisissez vos options <br /><small>(choix multiple possible)</small></h3>
            <div className="space-y-4">
              <Ecommerce
                control={form.control}
                setECommerce={setECommerce}
                eCommerce={eCommerce}
                setPrice={setPrice}
              />

              {/* Vitrine */}
              <Vitrine
                control={form.control}
                setVitrine={setVitrine}
                vitrine={vitrine}

              />
              {/* Blog */}
              <Blog
                control={form.control}
                setBlog={setBlog}
                blog={blog}

              />
            </div>
          </div>
          <Separator />
          <div className=" space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='w-full text-left'>
                  <FormLabel className='font-semibold text-md'>Vous souhaitez être recontacté? Laissez votre mail.</FormLabel>
                  <FormControl>
                    <div className='flex items-end gap-2 w-full relative'>
                      <Input type="email" placeholder="Email" {...field}
                        className='h-[50px] bg-transparent rounded-[25px] text-sm ring-offset-none ring-offset-none focus-visible:ring-none'
                      />
                      <Button type="submit"
                      className='rounded-[25px] absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1' variant="background">
                        {loading ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            Être recontacté
                            <SendHorizontal className='w-4 h-4' />
                          </>
                        )}
                      </Button>
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>



          <div className='text-right'>
            <div>
              <span className='font-bold text-2xl'>{price}€ *</span>

            </div>
            <div className='w-full'>
              <small className='italic'>* devis estimatif</small>
            </div>
          </div>

        </form>
      </Form>
    </div>
  );
}
