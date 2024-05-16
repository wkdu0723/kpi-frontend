import { UserData } from "@/components/users";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserData />
    </main>
  );
}
