// "use client";

// import { CldImage } from "next-cloudinary";

// export default function Page({ images }: { images: ImageProps[] }) {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {images.map((image) => (
//         <CldImage
//           key={image.public_id}
//           src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${image.public_id}.${image.format}`}
//           width="500"
//           height="500"
//           alt="Image"
//         />
//       ))}
//     </div>
//   );
// }
