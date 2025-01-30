// import React, { useState, useEffect } from 'react'
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table'
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/Components/ui/dropdown-menu'
// import { Input } from '@/Components/ui/input'
// import { Button } from '@/@/components/ui/button'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/Components/ui/table'
// import { ChevronDown, MoreHorizontal } from 'lucide-react'
// import { AppRoutes } from '@/Constant/Constant'

// const columns = [
//   {
//     accessorKey: 'name',
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="hover:text-primary font-semibold"
//         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//       >
//         Name
//         <ChevronDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue('name')}</div>,
//   },
//   {
//     accessorKey: 'email',
//     header: ({ column }) => (
//       <Button
//         variant="ghost"
//         className="hover:text-primary font-semibold"
//         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//       >
//         Email
//         <ChevronDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue('email')}</div>,
//   },
//   {
//     accessorKey: 'role',
//     header: 'Role',
//     cell: ({ row }) => (
//       <div className="capitalize text-gray-500">{row.getValue('role')}</div>
//     ),
//   },
//   {
//     accessorKey: 'studentStatus',
//     header: 'Student Status',
//     cell: ({ row }) => {
//       const status = row.getValue('studentStatus')
//       return (
//         <div className={`capitalize ${status === 'registered' ? 'text-green-600' : 'text-red-600'}`}>
//           {status || 'N/A'}
//         </div>
//       )
//     },
//   },
//   {
//     id: 'actions',
//     cell: ({ row }) => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel className="text-gray-700 font-semibold">Actions</DropdownMenuLabel>
//           <DropdownMenuItem
//             onClick={() => navigator.clipboard.writeText(row.original._id)}
//           >
//             Copy user ID
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>View user details</DropdownMenuItem>
//           <DropdownMenuItem>Edit user</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
// ]

// export const UserDataTable = () => {
//   const [data, setData] = useState([])
//   const [sorting, setSorting] = useState([])
//   const [columnFilters, setColumnFilters] = useState([])
//   const [columnVisibility, setColumnVisibility] = useState({})

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(AppRoutes.getAllUser)
//         const users = await response.json()
//         setData(users)
//       } catch (error) {
//         console.error('Error fetching users:', error)
//       }
//     }
//     fetchUsers()
//   }, [])

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   })

//   return (
//     <div className="space-y-6 bg-gray-50 p-6 rounded-md shadow-md">
//       <div className="flex items-center justify-between">
//         <Input
//           placeholder="Filter emails..."
//           value={(table.getColumn('email')?.getFilterValue() ?? '')}
//           onChange={(e) => table.getColumn('email')?.setFilterValue(e.target.value)}
//           className="max-w-sm border-gray-300 focus:border-primary"
//         />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto hover:bg-primary text-gray-700">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table.getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 )
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="rounded-md border border-gray-300 overflow-hidden">
//         <Table className="min-w-full">
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead
//                       key={header.id}
//                       className="bg-gray-100 font-bold text-gray-600"
//                     >
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   className={`hover:bg-gray-100 ${
//                     row.original.role === 'student'
//                       ? row.original.studentStatus === 'registered'
//                         ? 'bg-green-200'
//                         : 'bg-red-50'
//                       : 'even:bg-gray-50'
//                   }`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className="p-4">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-4 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//           className="hover:bg-primary disabled:opacity-50"
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//           className="hover:bg-primary disabled:opacity-50"
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }










import React, { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import { Input } from '@/Components/ui/input'
import { Button } from '@/@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { AppRoutes } from '@/Constant/Constant'

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:text-primary font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:text-primary font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="capitalize text-gray-500">{row.getValue('role')}</div>
    ),
  },
  {
    accessorKey: 'studentStatus',
    header: 'Student Status',
    cell: ({ row }) => {
      const status = row.getValue('studentStatus')
      return (
        <div className={`capitalize ${status === 'registered' ? 'text-green-600' : 'text-red-600'}`}>
          {status || 'N/A'}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-gray-700 font-semibold">Actions</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            onClick={() => navigator.clipboard.writeText(row.original._id)}
          >
            Copy user ID
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>View user details</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Edit user</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export const UserDataTable = () => {
  const [data, setData] = useState([])
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(AppRoutes.getAllUser)
        const users = await response.json()
        setData(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() ?? '')}
          onChange={(e) => table.getColumn('email')?.setFilterValue(e.target.value)}
          className="max-w-sm border-gray-300 focus:border-primary"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto hover:bg-primary text-gray-700">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="rounded-md border border-gray-300 overflow-auto"
        style={{ maxHeight: '500px' }}
      >
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-100 font-bold text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`hover:bg-gray-100 ${
                    row.original.role === 'student'
                      ? row.original.studentStatus === 'registered'
                        ? 'bg-green-200'
                        : 'bg-red-100'
                      : 'even:bg-gray-100'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-10 text-center text-gray-500">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
