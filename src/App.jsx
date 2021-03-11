import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import DetailRowReview from './DetailRowReview/DetailRowReview';
import ModeSelector from './ModeSelector/ModeSelector';
import TableSearch from './TableSearch/TableSearch';
import _ from 'lodash';

function App() {
  const pageSize = 50;
  const [isModeSelected, setIsModeSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(null);
  const [sortType, setSortType] = useState('asc');
  const [pageCount, setPageCount] = useState(null);
  const [sortField, setSortField] = useState('id');
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    setData(_.orderBy(data, sortField, sortType));
    setFilteredData(data);
    setPageCount(Math.ceil(data.length / pageSize));
    setIsLoading(false);
  }
  const displayData = _.chunk(filteredData, pageSize)[currentPage];

  function getFilteredData(data, search) {
    if (!search) {
      return data;
    }
    return data.filter((item) => {
      return (
        item['firstName'].toLowerCase().includes(search.toLowerCase()) ||
        item['lastName'].toLowerCase().includes(search.toLowerCase()) ||
        item['email'].toLowerCase().includes(search.toLowerCase()) ||
        item['phone'].toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  const onSort = (sortField) => {
    const sort = sortType === 'asc' ? 'desc' : 'asc';
    setSortType(sort);
    setSortField(sortField);
    const cloneData = filteredData;
    setFilteredData(_.orderBy(cloneData, sortField, sort));
  };
  const onRowSelect = (row) => {
    setSelectedRow(row);
  };
  const modeSelectHandler = (url) => {
    console.log(url);
    setIsLoading(true);
    setIsModeSelected(true);
    fetchData(url);
  };
  const pageChangeHandler = ({ selected }) => {
    setCurrentPage(selected);
    console.log(selected);
  };
  const searchHandler = (search) => {
    setCurrentPage(0);
    setSearch(search);
    const cloneData = getFilteredData(data, search);
    setPageCount(Math.ceil(cloneData.length / pageSize));
    setFilteredData(cloneData);
  };

  if (!isModeSelected) {
    return (
      <div>
        <ModeSelector onSelect={modeSelectHandler} />
      </div>
    );
  } else
    return (
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <TableSearch onSearch={searchHandler} />
            <Table
              data={displayData}
              onSort={onSort}
              onRowSelect={onRowSelect}
              sortType={sortType}
              sortField={sortField}
            ></Table>{' '}
            {data.length > pageSize ? (
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={pageChangeHandler}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                forcePage={currentPage}
              />
            ) : null}
          </>
        )}
        {selectedRow ? <DetailRowReview person={selectedRow} /> : null}
      </div>
    );
}

export default App;
