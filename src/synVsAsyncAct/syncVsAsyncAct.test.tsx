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

describe("sync vs async act", () => {
  it("❌ fails with sync act", async () => {
    let resolve: (value: unknown) => void;
    const mockProm = () =>
      new Promise((res) => {
        resolve = res;
      });

    render(<DataDisplay req={mockProm} />);

    act(() => {
      resolve("Some data from the API");
    });

    expect(screen.getByText("Data: Some data from the API")).toBeTruthy();
  });

  it("✅ succeeds with async act", async () => {
    let resolve: (value: unknown) => void;
    const mockProm = () =>
      new Promise((res) => {
        resolve = res;
      });

    render(<DataDisplay req={mockProm} />);

    await act(async () => {
      resolve("Some data from the API");
    });

    expect(screen.getByText("Data: Some data from the API")).toBeTruthy();
  });
});
