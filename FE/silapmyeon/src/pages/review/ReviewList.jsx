import { Link } from "react-router-dom";
import { axiosAuth } from "../../api/settingAxios";
import { useEffect, useState } from "react";
import styles from "./ReviewListStyle.module.css";

function ReviewList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getReviews = async (page) => {
    const resp = await axiosAuth.get(`/review?page=${page}&keyword=${keyword}`);
    console.log(resp);
    setReviews(resp.data.content);
    setTotalPages(resp.data.totalPages);
  };

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(currentPage);
  }, [currentPage]);

  const calculateQuarter = (date) => {
    const month = Number(date.substring(5, 7));
    if (month <= 3) {
      return "1분기";
    } else if (month <= 6) {
      return "2분기";
    } else if (month <= 9) {
      return "3분기";
    } else {
      return "4분기";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageNums = [];
  const maxPagesToShow = 5;

  const startIndex = Math.floor(currentPage / maxPagesToShow) * 5;
  const endIndex = Math.min(totalPages, startIndex + 5);

  pageNums.push(
    <a
      className={styles.pn}
      onClick={() => handlePageChange(startIndex - 1 < 0 ? 0 : startIndex - 1)}
    >
      이전
    </a>
  );
  for (let index = startIndex; index < endIndex; index++) {
    console.log("currentPage:", currentPage);
    console.log("index + 1:", index + 1);

    pageNums.push(
      <a
        key={index}
        onClick={() => handlePageChange(index)}
        className={`${styles.pageNum} ${
          currentPage == index ? styles.selectedPage : ""
        }`}
      >
        {index + 1}
      </a>
    );
  }
  pageNums.push(
    <a
      className={styles.pn}
      onClick={() =>
        handlePageChange(
          endIndex + 1 >= totalPages ? totalPages - 1 : endIndex + 1
        )
      }
    >
      다음
    </a>
  );

  const [keyword, setKeyword] = useState("");
  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    console.log(keyword);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      getReviews();
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className={styles.title}>면접 후기</div>
      <div className={styles.searchBoxText}>🔎</div>
      <input
        value={keyword}
        className={styles.searchBox}
        placeholder="기업명 검색"
        onChange={handleKeywordChange}
        onKeyUp={handleKeyPress}
      />
      <Link to={"/review/create"}>
        <button className={styles.plusButton}>+</button>
      </Link>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>번호</th>
            <th>기업명</th>
            <th>연도</th>
            <th>분기</th>
            <th>경력</th>
            <th>단계</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, idx) => {
            return (
              <tr className={styles.tb}>
                <td>{currentPage * 10 + idx + 1}</td>
                <Link
                  to={`${review.reviewId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <td style={{ lineHeight: "52px" }}>{review.companyName}</td>
                </Link>
                <td>{review.interviewDate.substring(0, 4)}</td>
                <td>{calculateQuarter(review.interviewDate)}</td>
                <td>{review.employmentType}</td>
                <td>{review.reviewOrder}</td>
              </tr>
            );
          })}
        </tbody>
        {pageNums.length === 0 ? null : (
          <div className={styles.pageNums}>{pageNums}</div>
        )}
      </table>
    </div>
  );
}

export default ReviewList;
