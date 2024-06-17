import styles from "./aboutUs.module.scss";
import OwnerProfile from "@/components/ownerProfile/ownerProfile";

export default function AboutUs() {
  return (
    <section className={styles.container} id="about-us">
      <h1 className={styles.title}>Nosotros</h1>
      <div className={styles.us}>
        <OwnerProfile
          src="/owners/gian.jpg"
          name={"Gianluca Chiaverano"}
          job={"Co-Founder & COO"}
        />
        <OwnerProfile
          src="/owners/nico.jpg"
          name={"Nicolas Ruíz Natale"}
          job={"Co-Founder & CEO"}
        />
        <OwnerProfile
          src="/owners/gabi.jpg"
          name={"Gabriel Giana"}
          job={"Co-Founder & CTO"}
        />
      </div>
    </section>
  );
}
