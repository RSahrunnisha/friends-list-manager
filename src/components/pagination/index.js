import "./styles.scss";

const Pagination = (props) => {
  const { setCurrentPage, currentPage, listLength } = props;

  return (
    <div className="pagination">
      <>
        <button
          className="pagination_btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="pagination_btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      </>
      {[...Array(listLength)].map((_, index) => (
        <button
          className={`pagination_btn ${
            currentPage === index + 1 ? "active" : ""
          }`}
          key={"pbtn" + index}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <>
        <button
          className="pagination_btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === listLength}
        >
          {">"}
        </button>
        <button
          className="pagination_btn"
          onClick={() => setCurrentPage(listLength)}
          disabled={currentPage === listLength}
        >
          {">>"}
        </button>
      </>
    </div>
  );
};

export default Pagination;
