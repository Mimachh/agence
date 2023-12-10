import { headers } from "@/helper/ameliaHeaders";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest, res) {
    const ameliaUrl = process.env.AMELIA_URL;
    
    let params: any = {}; for (const [key, val] of request.nextUrl.searchParams.entries()) { params[key] = val; }

    const serviceParams = params.service;
 

    // const { pageIndex } = query;
    if (!ameliaUrl) {
      return NextResponse.json({ error: "AMELIA_URL is not defined" }, { status: 500 });
    }
  
    try {
        const ameliaResponse = await axios.get(`${ameliaUrl}/services/${serviceParams}`, {
          headers: headers,
        });
    
        const data = ameliaResponse.data.data;
    
        return NextResponse.json( data , { status: 200 });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    
        return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
      }
  }

export async function POST(request) {
    // Do whatever you want
    return NextResponse.json({ message: "Hello World" }, { status: 200 });
}