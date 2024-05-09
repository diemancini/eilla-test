//import Button from "../UI/Button";
import SimilarButton from "./SimilarButton";
import { useState } from "react";

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
    //console.log(columnsNames);
  }

  const [hover, setHover] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const onHover = (e) => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };

  const handleMouseOver = (e) => {
    setIsHovered(e.target.id);
    console.log(e.target.id);
    // switch (e.target.id) {
    //   case "1":
    //     setIsHovered(1);
    //     break;
    //   case "2":
    //     setIsHovered(2);
    //     break;
    //   default:
    //     break;
    // }
  };

  return (
    <section className='wrapper'>
      <main className='row title'>
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
              {/* <li key={company.row}>{company.row}</li> */}
              <li key={company.row + 0}>{company.linkedin_url}</li>
              <li key={company.row + 1}>{company.company_name}</li>
              <li key={company.row + 2}>{company.industry}</li>
              <li key={company.row + 3}>{company.website}</li>
              {/* <li key={company.row + 5}>{company.tagline}</li> */}
              <li key={company.row + 4} id={company.row + 4}>
                {/* {company.about.slice(0, 100) + "..."} */}
                {/* {isHovered === (company.row + 4).toString() && (
                  <div className='text-about'>{company.about}</div>
                )} */}
                {/* <div
                  id={company.row + 4}
                  onMouseEnter={handleMouseOver}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {company.about.slice(0, 100) + "..."}
                  {isHovered === (company.row + 4).toString() && (
                    <div className='container'>
                      <p>{company.about}</p>
                    </div>
                  )}
                </div> */}
                <div className='container'>
                  <p>{company.about.slice(0, 100) + "..."}</p>
                  {/* <p>{company.about}</p> */}
                </div>
              </li>
              <li key={company.row + 5}>{company.year_founded}</li>
              <li key={company.row + 6}>{company.locality}</li>
              <li key={company.row + 7}>{company.country}</li>
              <li key={company.row + 8}>{company.current_employee_estimate}</li>
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
