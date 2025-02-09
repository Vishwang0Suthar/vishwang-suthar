// "use client";
// import cloudinary from "@/utils/cloudinary";
// import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
// import { CldImage } from "next-cloudinary";
// import type { ImageProps } from "@";

// // By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
// export default function Page() {
//   return (
//     <CldImage
//       src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
//       // Use this sample image or upload your own via the Media Explorer
//       width="500" // Transform the image: auto-crop to square aspect_ratio
//       height="500"
//       alt="bhangi"
//       crop={{
//         type: "auto",
//         source: true,
//       }}
//     />
//   );
// }

// export async function getStaticProps() {
//   const results = await cloudinary.v2.search
//     .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
//     .sort_by("public_id", "desc")
//     .max_results(400)
//     .execute();
//   const reducedResults: ImageProps[] = [];

//   let i = 0;
//   for (let result of results.resources) {
//     reducedResults.push({
//       id: i,
//       height: result.height,
//       width: result.width,
//       public_id: result.public_id,
//       format: result.format,
//     });
//     i++;
//   }

//   const blurImagePromises = results.resources.map((image: ImageProps) => {
//     return getBase64ImageUrl(image);
//   });
//   const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

//   for (let i = 0; i < reducedResults.length; i++) {
//     reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
//   }

//   return {
//     props: {
//       images: reducedResults,
//     },
//   };
// }
