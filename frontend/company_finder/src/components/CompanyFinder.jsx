import { useState, useRef } from "react";

import { useHttp, getUrl } from "../hooks/http";

import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorBlock from "./UI/ErrorBlock";

export default function CompanyFinder() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["events", { search: searchTerm }],
  //   queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
  //   enabled: searchTerm !== undefined,
  // });
  const requestConfig = {};
  const {
    //data: loadedMeals,
    data,
    isLoading,
    error,
  } = useHttp(getUrl(), requestConfig, searchTerm);

  function handleSubmit(event) {
    event.preventDefault();
    // When setSearchTerm is used, the component will be
    // updated and we can set search in queryKey dynamically.
    setSearchTerm(searchElement.current.value);
    // ({
    //   //data: loadedMeals,
    //   data,
    //   isLoading,
    //   error,
    // } = useHttp(getUrl(), requestConfig, searchElement.current.value));
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || "Failed to fetch Companies."}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>{{ event }}</li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='all-events-section'>
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id='search-form'>
          <input
            type='search'
            placeholder='Search events'
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
