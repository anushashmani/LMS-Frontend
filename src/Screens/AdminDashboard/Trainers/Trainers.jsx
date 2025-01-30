import React from 'react'
import { Tlayout } from './Components/Tlayout'
import Layout from '@/Components/Sidebar/Layout'

export const Trainers = () => {
  return (
    <>
      <div className='container mx-auto'>
        <Layout />
        <br />
        <Tlayout />
      </div>
    </>
  )
}

