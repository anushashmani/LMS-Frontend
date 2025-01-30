import React, { useState, useEffect } from 'react'
import Layout from '@/Components/Sidebar/Layout'
import { UserDataTable } from './components/UserDataTable'
import { AppRoutes } from '@/Constant/Constant'

export const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(AppRoutes.getAllUser)
        if (!res.ok) throw new Error('Failed to fetch users')
        const data = await res.json()
        console.log('User Data', data)
        setUsers(data)
      } catch (err) {
        setError('Error fetching users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <Layout />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <div className='shadow-lg'>
            <UserDataTable data={users} />
          </div>
        )}
      </div>
    </div>
  )
}

