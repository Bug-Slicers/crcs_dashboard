import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-primary font-poppins">
      <h1 className="text-5xl font-bold mb-8">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg mt-4">{error.statusText || error.message}</p>
    </div>
  );
}
