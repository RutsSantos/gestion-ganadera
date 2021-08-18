import React from 'react';
import PropTypes from 'prop-types';

// components

import TableDropdown from 'components/Dropdowns/SalesDropdown.js';

export default function CardTable({ color, data = {}, dropdown }) {
  let table = 'loading...';

  if (!data.isLoading) {
    const firstRow = data.rows[0];

    table = (
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            {Object.keys(firstRow).map(title => (
              <th
                key={title}
                className={
                  'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                  (color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
                }
              >
                {title}
              </th>
            ))}

            <th
              className={
                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                (color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700')
              }
            ></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr>
              {Object.entries(row).map(([key, value]) => (
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {key === 'fecha' ? new Date(value).toUTCString() : value}
                </td>
              ))}
              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <TableDropdown options={dropdown} row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }
              >
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">{table}</div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
