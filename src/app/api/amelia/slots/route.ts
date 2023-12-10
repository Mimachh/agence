import { headers } from "@/helper/ameliaHeaders";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    const ameliaUrl = process.env.AMELIA_URL;
    
    let params: any = {}; for (const [key, val] of request.nextUrl.searchParams.entries()) { params[key] = val; }

    const serviceId = params.serviceId;
    const formattedToday = params.startDateTime;


    if (!ameliaUrl) {
      return NextResponse.json({ error: "AMELIA_URL is not defined" }, { status: 500 });
    }
  
    try {
        const ameliaResponse = await axios.get(`${ameliaUrl}/slots&serviceId=${serviceId}&startDateTime=${formattedToday}&duration=3600&providerIds=1&persons=1&excludeAppointmentId=null&timeAfter`, {
          headers: headers,
        });
    
        const data = ameliaResponse.data.data;
    
        return NextResponse.json( data , { status: 200 });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    
        return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
      }
  }