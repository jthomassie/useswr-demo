// pages/todo/[id].js

import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) =>
  await axios.get(url).then((res) => res.data.todo);

export default function Todo() {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.id
      ? `http://localhost:3000/api/todo/${router.query.id}`
      : null,
    fetcher
  );

  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading...</h1>;
  console.log("DATA", data);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Todo</h1>
            {data && (
              <ul>
                {data.map((d, i) => (
                  <li key={i}>
                    <p>{`${d.properties.SUBTYPE}: ${d._id}`}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
