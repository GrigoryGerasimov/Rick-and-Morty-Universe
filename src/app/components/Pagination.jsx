import React from "react";
import { getPageRange } from "../utils/getPageRange.js";
import PropTypes from "prop-types";

export const Pagination = ({
    itemsCount,
    pageSize,
    currentPage,
    onPageChange
}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = getPageRange(pageCount);

    if (pageCount === 1) return null;

    return (
        <nav className="m-5">
            <ul className="pagination justify-content-center">
                {pages.map((page) => (
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
    itemsCount: PropTypes.number,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func
};
