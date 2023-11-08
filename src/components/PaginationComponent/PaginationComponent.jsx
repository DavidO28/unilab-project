import ReactPaginate from 'react-paginate';
import './PaginationComponent.css';

function PaginationComponent({ pageNumber, pageCount, handlePageClick }) {
    return (
        <div>
            <div className='paginationStyles'>
                <ReactPaginate
                    className='reactPaginate'
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
            <div>Page {pageNumber + 1} of {pageCount}</div>
        </div>
    );
}

export default PaginationComponent;
