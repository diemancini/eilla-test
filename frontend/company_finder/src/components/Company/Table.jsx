export default function Table({ data }) {
  let columnsNames = [];
  if (data.length > 0) {
    const columnsList = Object.keys(data[0]);
    console.log(columnsList);
    columnsNames = columnsList.map((columnName) => {
      const column = columnName.replace("_", " ");
      return column.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    });
  }

  return (
    <section className='wrapper'>
      <main class='row title'>
        <ul>
          {columnsNames.map((column) => {
            return <li key={column}>{column}</li>;
          })}
        </ul>
      </main>

      {data.map((company) => {
        return (
          <article className='row'>
            <ul>
              <li key={company.row}>{company.row}</li>
              <li key={company.row + 1}>{company.linkedin_url}</li>
              <li key={company.row + 2}>{company.company_name}</li>
              <li key={company.row + 3}>{company.industry}</li>
              <li key={company.row + 4}>{company.website}</li>
              <li key={company.row + 5}>{company.tagline}</li>
              <li key={company.row + 6}>
                {company.about.slice(0, 100) + "..."}
              </li>
              <li key={company.row + 7}>{company.year_founded}</li>
              <li key={company.row + 8}>{company.locality}</li>
              <li key={company.row + 9}>{company.country}</li>
              <li key={company.row + 10}>
                {company.current_employee_estimate}
              </li>
              <li key={company.row + 11}>{company.keywords}</li>
            </ul>
          </article>
        );
      })}
    </section>
  );
}
