import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

// const fetcher = async (url) =>
//   await axios.get(url).then((res) => res.data.todos);
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Todo() {
  // const address = "http://localhost:3000/api/todos";
  // import { useRouter } from "next/router";
  const router = useRouter();
  // const { id } = router.query;
  // console.log({ id });

  // const { data, error } = useSWR(address, fetcher, {
  //   revalidateOnFocus: false,
  // });
  const { data, error } = useSwr(
    router.query.id ? `/api/todo/${router.query.id}` : null,
    fetcher
  );

  console.log(router.query.id);

  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading...</h1>;

  return (
    <div>
      <main className={styles.main}>
        <div className="container">
          <h1>Todo</h1>
          <p>{d._id}</p>
        </div>
      </main>
    </div>
  );
}
