import Link from "next/link";
import styles from "./home.module.scss";
import ProjectCard from "@/components/projectCard/projectCard";

export default async function Home() {
  return (
    <main className={styles.main}>
      <section>
        <h3 className={styles.section_title}>Ofertas activas</h3>
        <p>
          Estos campos están esperando nuevas inversiones. Podrás ver más sobre
          ellos en la sección de detalles.
        </p>
        <div className={styles.projects}>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <div className={styles.more_info}>
          <Link href={"/projects"}>Ver todos los proyectos {">>"}</Link>
        </div>
      </section>
      <section>
        <h3 className={styles.section_title}>Ofertas pasadas</h3>
        <p>
          Inversiones finalizadas que sirven como ejemplo para las nuevas
          inversiones.
        </p>
      </section>
      <section>
        <h3 className={styles.section_title}>Recursos</h3>
        <p>Las principales noticias del agro uruguayo y de ATFI están acá.</p>
      </section>
    </main>
  );
}