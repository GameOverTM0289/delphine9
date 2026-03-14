import { CollectionLanding } from "@/components/landing/CollectionLanding";
import { FeatureDuo } from "@/components/landing/FeatureDuo";
import { HeroLanding } from "@/components/landing/HeroLanding";
import { OurStoryLanding } from "@/components/landing/OurStoryLanding";

export default function HomePage() {
  return (
    <>
      <HeroLanding />
      <FeatureDuo />
      <OurStoryLanding />
      <CollectionLanding />
    </>
  );
}
