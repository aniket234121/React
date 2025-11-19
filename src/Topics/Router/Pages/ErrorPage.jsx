import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <MyComp />
      <pre>{error.statusText || error.message}</pre>
    </div>
  );
}

export function MyComp() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/")}>Go Home</button>;
}
