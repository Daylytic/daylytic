import { HeroHeader } from "./hero-header";
import { HeroActions } from "./hero-actions";
import { HeroScrollDown } from "~/components/home/hero/hero-scroll-down";
import { styles } from ".";

export const Hero = () => (
  <section id="hero" className={styles.hero}>
    <HeroHeader />
    <HeroActions />
    <HeroScrollDown />
  </section>
);
