import React from 'react';
import SortArrow from '../SortArrow/SortArrow';

function Table(props) {
  console.log(props.sortType);
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={props.onSort.bind(null, 'id')}>
            ID{' '}
            {props.sortField === 'id' ? (
              <SortArrow sortType={props.sortType} />
            ) : null}
          </th>
          <th onClick={props.onSort.bind(null, 'firstName')}>
            First Name{' '}
            {props.sortField === 'firstName' ? (
              <SortArrow sortType={props.sortType} />
            ) : null}
          </th>
          <th onClick={props.onSort.bind(null, 'lastName')}>
            Last Name{' '}
            {props.sortField === 'lastName' ? (
              <SortArrow sortType={props.sortType} />
            ) : null}
          </th>
          <th onClick={props.onSort.bind(null, 'email')}>
            E-mail{' '}
            {props.sortField === 'email' ? (
              <SortArrow sortType={props.sortType} />
            ) : null}
          </th>
          <th onClick={props.onSort.bind(null, 'phone')}>
            Phone{' '}
            {props.sortField === 'phone' ? (
              <SortArrow sortType={props.sortType} />
            ) : null}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => (
          <tr
            key={item.id + item.phone}
            onClick={props.onRowSelect.bind(null, item)}
          >
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
