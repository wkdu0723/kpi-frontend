import { SideMenu } from "@/components/side-menu/side-menu";
import styles from "./page.module.scss";
import { Header } from "@/components/header/header";
import { Dashboard } from "./(route)/dashboard/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <section id="MainContainer" className={styles.mainContainer}>
        <SideMenu />
        <section id="MainContentSection" className={styles.mainContentSection}>
          <Dashboard />
        </section>
      </section>
    </main>
  );
}
