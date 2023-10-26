import { useState, useEffect } from "react";
import { act, render, screen } from "@testing-library/react";

function DataDisplay({ req }: { req: () => Promise<any> }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    req()
      .then((response) => setData(response))
      .catch((error) => console.error(error));
  }, []);

  return <div>{data ? <p>Data: {data}</p> : <p>Loading...</p>}</div>;
}

it("fetches data", async () => {
  let resolveFetchPromise: (value: unknown) => void;
  const fetchDataMock = () =>
    new Promise((res) => {
      resolveFetchPromise = res;
    });

  render(<DataDisplay req={fetchDataMock} />);

  expect(screen.getByText("Loading...")).toBeTruthy();
  
  act(() => {
    resolveFetchPromise("Some data from the API");
  });

  expect(screen.getByText("Data: Some data from the API")).toBeTruthy();
});
