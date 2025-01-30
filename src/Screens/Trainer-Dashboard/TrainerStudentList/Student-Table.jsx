import React, { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Button } from "@/Components/ui/button"
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

export function StudentTable({ students, onViewDetails }) {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  const sortedStudents = useMemo(() => {
    if (!sortColumn) return students

    return [...students].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [students, sortColumn, sortDirection])

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
              Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead onClick={() => handleSort('rollNumber')} className="cursor-pointer">
              Roll No <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead className="hidden md:table-cell">Course</TableHead>
            <TableHead className="hidden md:table-cell">Batch</TableHead>
            <TableHead className="hidden md:table-cell">Section</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => (
            <TableRow key={student._id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.rollNumber}</TableCell>
              <TableCell className="hidden md:table-cell">{student.course.title}</TableCell>
              <TableCell className="hidden md:table-cell">{student.batch.title}</TableCell>
              <TableCell className="hidden md:table-cell">{student.section.title}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewDetails(student)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
