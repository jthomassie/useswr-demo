// pages/index.js

import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) =>
  await axios.get(url).then((res) => res.data.todos);

export default function Features() {
  //
  const address = "http://localhost:3000/api/todos";
  const { data, error } = useSWR(address, fetcher, {
    revalidateOnFocus: false,
  });

  // find feature
  const findFeature = (id) => {
    console.log("FIND", id);
  };

  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading...</h1>;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Todos</h1>
            {data && (
              <ul>
                {data.map((d, i) => (
                  <li key={i}>
                    <Link href="/todo/[id]" as={`/todo/${d._id}`}>
                      <a
                        onClick={() => findFeature(d._id)}
                      >{`${d.properties.SUBTYPE}: ${d._id}`}</a>
                    </Link>
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
