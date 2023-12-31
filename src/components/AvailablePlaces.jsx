import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePLaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  /* useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []); */

  // Using async await function to access api
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places :(");
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message ||
            "Could not fetch places, Please try again later :(",
        });
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePLaces}
      isLoading={isFetching}
      loadingText="Fetching Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
