import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { Search, ArrowUpDown } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionTableProps {
  data: Transaction[];
}

const columnHelper = createColumnHelper<Transaction>();

export const TransactionTable: React.FC<TransactionTableProps> = ({ data }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = [
    columnHelper.accessor('id', {
      header: 'Transaction ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('payerId', {
      header: 'Payer ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('payeeId', {
      header: 'Payee ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: info => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('timestamp', {
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleString(),
    }),
    columnHelper.accessor('channel', {
      header: 'Channel',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('predictedFraud', {
      header: 'Predicted Fraud',
      cell: info => (
        <span className={info.getValue() ? 'text-red-600' : 'text-green-600'}>
          {info.getValue() ? 'Yes' : 'No'}
        </span>
      ),
    }),
    columnHelper.accessor('reportedFraud', {
      header: 'Reported Fraud',
      cell: info => (
        <span className={info.getValue() ? 'text-red-600' : 'text-green-600'}>
          {info.getValue() ? 'Yes' : 'No'}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Search transactions..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    <div
                      className="flex items-center gap-2"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};