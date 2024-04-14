import Pagination from "react-bootstrap/Pagination";

const GlobalPagination = () => {
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <li key={number} className={`me-2 text-success ${active === number && 'text-decoration-underline'}`}>
                {number}
            </li>
        );
    }

    return (
        <Pagination className="d-flex justify-content-center flex-wrap my-3">
            {items}
        </Pagination>
    );
}

export default GlobalPagination;