import React from "react";
import { getPageRange } from "../utils/getPageRange.js";
import PropTypes from "prop-types";

export const Pagination = ({ currentPage, pages, onPageChange }) => {
    if (pages === 1) return null;
    const pageAmount = getPageRange(pages);

    return (
        <nav className="m-5">
            <ul className="pagination justify-content-center">
                {pageAmount.map((page) => (
                    <li
                        key={`page-${page}`}
                        className={`page-item ${page === currentPage ? "active" : ""}`}
                    >
                        <button
                            className="page-link custom-page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    pages: PropTypes.number,
    onPageChange: PropTypes.func
};
