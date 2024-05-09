//import Button from "../UI/Button";
import SimilarButton from "./SimilarButton";

export default function Table({ data, isModal = false }) {
  let columnsNames = [];

  function renameColumns(columnName) {
    if (
      columnName !== "row" &&
      columnName !== "tagline" &&
      columnName !== "keywords"
    ) {
      const column = columnName.replace(/_/g, " ");
      let columnRenamed = column.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );

      return columnRenamed;
    }
  }

  function getColumn(columnName) {
    return columnName && columnName !== undefined;
  }

  if (data.length > 0) {
    let columnsList = Object.keys(data[0]);

    if (!isModal) columnsList.push("Similar");

    const columnsRenamed = columnsList.map(renameColumns);
    columnsNames = columnsRenamed.filter(getColumn);
  }

  return (
    <section className='wrapper'>
      <main className='row title'>
        <ul>
          {columnsNames.map((column) => {
            return <li key={column}>{column}</li>;
          })}
        </ul>
      </main>
      {data &&
        data.map((company) => {
          return (
            <article className='row'>
              <ul>
                {/* <li key={company.row}>{company.row}</li> */}
                <li key={company.row + 0}>{company.linkedin_url}</li>
                <li key={company.row + 1}>{company.company_name}</li>
                <li key={company.row + 2}>{company.industry}</li>
                <li key={company.row + 3}>{company.website}</li>
                {/* <li key={company.row + 5}>{company.tagline}</li> */}
                <li key={company.row + 4} id={company.row + 4}>
                  <div className='container'>
                    {company.about && (
                      <p>{company.about.slice(0, 100) + "..."}</p>
                    )}
                    {/* <p>{company.about}</p> */}
                  </div>
                </li>
                <li key={company.row + 5}>{company.year_founded}</li>
                <li key={company.row + 6}>{company.locality}</li>
                <li key={company.row + 7}>{company.country}</li>
                <li key={company.row + 8}>
                  {company.current_employee_estimate}
                </li>
                {!isModal && (
                  <li key={company.row + 10}>
                    {<SimilarButton companyInfo={company} />}
                  </li>
                )}
                {/* <li key={company.row + 9}>{company.keywords}</li> */}
              </ul>
            </article>
          );
        })}
    </section>
  );
}
