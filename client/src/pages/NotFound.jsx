import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-8xl font-black text-orange-500">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-3">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl"
      >
        Go To Home
      </Link>

    </div>
  );
}

export default NotFound;