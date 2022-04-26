// pages/feature/[id].js

import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) =>
  await axios.get(url).then((res) => res.data.feature);

export default function Feature() {
  // swr
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.id
      ? `http://localhost:3000/api/feature/${router.query.id}`
      : null,
    fetcher
  );

  if (error) <h1>Loading failed...</h1>;
  if (!data) <h1>Loading...</h1>;

  return (
    <>
      <div className="container mt-6">
        <div className="row">
          <div className="col">
            <h1>Feature</h1>
            {data && (
              <ul className="list-unstyled">
                {data.map((d, i) => (
                  <li key={i}>
                    <p className="tight-p">
                      <span className="strong">_id: </span>
                      {`${d._id}`}
                    </p>
                    <p className="tight-p">
                      <span className="strong">SUBTYPE: </span>
                      {`${d.properties.SUBTYPE}`}
                    </p>
                    <p className="tight-p">
                      <span className="strong">CATEGORY: </span>
                      {`${d.properties.CATEGORY}`}
                    </p>
                    <p className="tight-p">
                      <span className="strong">LANDS_NAME: </span>
                      {`${d.properties.LANDS_NAME}`}
                    </p>
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
