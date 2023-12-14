import { headers } from "@/helper/ameliaHeaders";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//     const ameliaUrl = process.env.AMELIA_URL;
//     let params: any = {}; for (const [key, val] of request.nextUrl.searchParams.entries()) { params[key] = val; }
//     const { formattedDateTime, values, duration, employeeID, serviceId } = params;

//     console.log({ formattedDateTime }, values.nom, { duration })

//     if (!ameliaUrl || !formattedDateTime || !values || !duration || !employeeID || !serviceId) {
//         return NextResponse.json({ error: "Error from server" }, { status: 500 });
//     }


//     // try {
//     //     const postBookingUrl = `bookings`
//     //     const postBooking = await axios.post(`${ameliaUrl}${postBookingUrl}`, {
//     //         "type": "appointment",
//     //         "bookings": [
//     //             {
//     //                 "extras": [],
//     //                 "customFields": {
//     //                     // "1": {
//     //                     //   "label": "test",
//     //                     //   "type": "text",
//     //                     //   "value": "custom field value"
//     //                     // }
//     //                 },
//     //                 "deposit": true,
//     //                 "locale": "fr_FR",
//     //                 "utcOffset": null,
//     //                 "persons": 1,
//     //                 "customerId": null,
//     //                 "customer": {
//     //                     "id": null,
//     //                     "firstName": values.prenom,
//     //                     "lastName": values.nom,
//     //                     "email": values.email,
//     //                     "phone": "",
//     //                     "countryPhoneIso": "",
//     //                     "externalId": null
//     //                 },
//     //                 "duration": duration
//     //             }
//     //         ],
//     //         "payment": {
//     //             "gateway": "onSite",
//     //             "currency": "USD",
//     //             "data": {}
//     //         },
//     //         "recaptcha": null,
//     //         "locale": "fr_FR",
//     //         "timeZone": "Europe/Paris",
//     //         "bookingStart": formattedDateTime,
//     //         "notifyParticipants": 1,
//     //         "locationId": 1,
//     //         "providerId": employeeID,
//     //         "serviceId": serviceId,
//     //         "utcOffset": null,
//     //         "recurring": [],
//     //         "package": [],
//     //         "couponCode": null,
//     //         "runInstantPostBookingActions": false
//     //     },
//     //         {
//     //             headers: headers,
//     //         }
//     //     );

//     //     // console.log(postBooking)
//     //     // setBookingValidated(postBooking.data.data)
//     //     const postBookingID = postBooking.data.data.appointment.id;
//     //     const postBookingPaiementID = postBooking.data.data.paymentId;
//     //     const postBookingCustomerID = postBooking.data.data.booking.customerId;
//     //     try {
//     //         const postBookingNotifcation = await axios.post(`${ameliaUrl}bookings/success/${postBookingID}`, {
//     //             "type": "appointment",
//     //             "appointmentStatusChanged": false,
//     //             "recurring": [],
//     //             "packageId": null,
//     //             "customerId": postBookingCustomerID,
//     //             "paymentId": postBookingPaiementID,
//     //             "packageCustomerId": null
//     //         },
//     //             {
//     //                 headers: headers,
//     //             });
//     //         // console.log(postBookingNotifcation)
//     //     } catch (error) {
//     //         console.log(error)
//     //     }

//     //     // setCurrentStep(currentStep + 1)
//     //     // setLoading(false)
//     //     return NextResponse.json({ message: formattedDateTime, bookingValidated: postBooking.data.data }, { status: 200 });
//     // } catch (error) {
//     //     console.log(error);
//     //     return NextResponse.json({ error: "Error during booking" }, { status: 500 });
//     // }
//     return NextResponse.json({ message: values.prenom}, { status: 200 });
// }

export async function POST(request: NextRequest) {
    const ameliaUrl = process.env.AMELIA_URL;
    const body = await request.json();
    
    const duration = body.data.duration;
    const formattedDateTime = body.data.formattedDateTime;
    const values = body.data.values;
    const employeeID = body.data.employeeID;
    const serviceId = body.data.serviceId;
    // if (request.method !== "POST") {
    //     return NextResponse.json({ error: "Méthode non autorisée" }, { status: 405 });
    // }

    // if (!ameliaUrl || !values || !duration || !employeeID || !serviceId) {
    //     return NextResponse.json({ error: "Error from server" }, { status: 500 });
    // }
    try {
      const postBookingUrl = `bookings`
      const postBooking = await axios.post(`https://www.agence-serveur.mimach.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/${postBookingUrl}`, {
        "type": "appointment",
        "bookings": [
          {
            // "extras": [],
            "customFields": {
              // "1": {
              //   "label": "test",
              //   "type": "text",
              //   "value": "custom field value"
              // }
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
            "duration": 2700
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
            // 'Amelia': process.env.AMELIA_API,
            "Amelia": "mRAnQBOK8GBawuFeJzmfr4Kx5lKVPIAIdAeRg+UxTn9L",
            'Accept': "*/*",
          },
        }
      );
        console.log({postBooking})
        return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }

}

