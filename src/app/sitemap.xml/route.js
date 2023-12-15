// // app/sitemap.xml/route.js
 
// import { getSortedPostsData } from "../lib/posts";
 
// const URL = "https://mimach.fr";
 
// function generateSiteMap(posts) {
//   return `<?xml version="1.0" encoding="UTF-8"?>
//    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
//      <!--We manually set the two URLs we know already-->
//      <url>
//        <loc>${URL}</loc>
//      </url>
//      <url>
//        <loc>${URL}/process</loc>
//      </url>
//       <url>
//        <loc>${URL}/work</loc>
//      </url>
//      ${posts
//        .map(({ id }) => {
//          return `
//            <url>
//                <loc>${`${URL}/blog/${id}`}</loc>
//            </url>
//          `;
//        })
//        .join("")}
//    </urlset>
//  `;
// }
 
// export function GET() {
//   const posts = getSortedPostsData();
//   const body = generateSiteMap(posts);
 
//   return new Response(body, {
//     status: 200,
//     headers: {
//       "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
//       "content-type": "application/xml",
//     },
//   });
// }



// ├ ○ /process                             555 B           176 kB
// ├ λ /sitemap.xml                         0 B                0 B
// ├ ○ /work                                1.58 kB         188 kB
// ├ ○ /work/prothesiste-ongulaire          1.58 kB         188 kB
// └ ○ /work/salon-coiffure 