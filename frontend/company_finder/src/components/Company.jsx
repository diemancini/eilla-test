import CompanyFinder from "./CompanyFinder";

export default function Company() {
  //let content = <div className='div-center'>{/* <LoadingIndicator /> */}</div>;

  return (
    <section className='content-section' id='company-section'>
      <header className='center'>
        <h2>Companies</h2>
      </header>
      <CompanyFinder />
    </section>
  );
}
