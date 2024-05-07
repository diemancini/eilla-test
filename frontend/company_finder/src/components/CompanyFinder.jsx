import { useState, useRef } from "react";

import { useHttp, getUrl } from "../hooks/http";

import LoadingIndicator from "./UI/LoadingIndicator";
import ErrorBlock from "./UI/ErrorBlock";

const requestConfig = { query: "" };

export default function CompanyFinder() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  requestConfig.query = searchTerm;
  const url = getUrl(searchTerm);
  const { data, isLoading, error, clearData } = useHttp(url, requestConfig, []);
  console.log("----------- Component --------------");
  console.log(data);
  function handleSubmit(event) {
    event.preventDefault();
    clearData();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find a company.</p>;

  if (isLoading && data.length === 0) {
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

  if (data && data.length > 0) {
    content = (
      <ul className='company-list'>
        {data.map((company) => (
          <li key={company.row}>{company.company_name}</li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='all-company-section'>
      <header>
        <h2>Find company!</h2>
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
      {content}
      {/* {data ? (
        <ul className='company-list'>
          {data.map((company) => (
            <li key={company.row}>{company.company_name}</li>
          ))}
        </ul>
      ) : isLoading ? (
        <LoadingIndicator />
      ) : (
        error && (
          <ErrorBlock
            title='An error occurred'
            message={error.info?.message || "Failed to fetch Companies."}
          />
        )
      )} */}
    </section>
  );
}
