import Image from "next/image";
import Hero from "@/public/images/img-hero.jpg";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
export default function Home() {
  return (
    <section>
      <div className="flex h-[38rem] gap-4">
        <div className="flex-1 flex items-center justify-start p-6">
          <div>
            <h1 className="text-4xl line-clamp-2 ">
              Hey there this is <br /> <span>Vishwang Suthar</span>
            </h1>
            <p></p>
          </div>
        </div>
        <div className="flex-1">
          {/* <Image
            className="h-full w-full rounded-lg"
            alt="profile_img"
            src={Hero}
          /> */}
          <TiltedCard
            imageSrc={Hero}
            altText="Cover"
            // captionText="Kendrick Lamar - GNX"
            // containerHeight="300px"
            // containerWidth="300px"
            // imageHeight="300px"
            // imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.2}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            // overlayContent={
            //   <p className="tilted-card-demo-text">Kendrick Lamar - GNX</p>
            // }
          />
        </div>
      </div>
    </section>
  );
}
