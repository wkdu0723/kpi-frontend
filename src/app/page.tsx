import { SideMenu } from "@/components/side-menu";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <SideMenu />
    </main>
  );
}
