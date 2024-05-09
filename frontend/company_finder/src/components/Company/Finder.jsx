import { useState, useRef } from "react";

import { useHttp, getUrl } from "../../hooks/http";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import Table from "./Table";

const requestConfig = { query: "" };

export default function Finder() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  requestConfig.query = { company_name: searchTerm };
  const url = getUrl(requestConfig.query);
  const { data, isLoading, error, clearData } = useHttp(url, requestConfig, []);

  function handleSubmit(event) {
    event.preventDefault();
    clearData();
    setSearchTerm(searchElement.current.value);
  }

  return (
    <section className='center'>
      <header>
        <h2>Find company:</h2>
        <form onSubmit={handleSubmit} id='search-form'>
          <input
            type='search'
            placeholder='Search company'
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {data && <h1>Found {data.length} companies</h1>}
      {data && data.length > 0 && !isLoading ? (
        <Table data={data} />
      ) : isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorBlock
          title='An error occurred'
          message={error.info?.message || "Failed to fetch Companies."}
        />
      ) : (
        <p>Please enter a search term and to find a company.</p>
      )}
    </section>
  );
}
