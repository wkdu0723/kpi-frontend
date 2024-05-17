import { SideMenu } from "@/components/side-menu/side-menu";
import styles from "./page.module.scss";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <section id="MainContainer" className={styles.mainContainer}>
        <SideMenu />
        <section id="MainContentSection" className={styles.mainContentSection}></section>
      </section>
    </main>
  );
}
