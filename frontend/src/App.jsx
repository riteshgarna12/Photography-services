import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AdminLogin from "./pages/AdminLogin";


import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import ProtectedRoute from './components/ProtectedRoute'
import BookService from './pages/BookService'
import MyBookings from './pages/MyBookings'

import AdminDashboard from './pages/AdminDashboard';

// NEW dynamic service pages
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      <main className="flex-1 container mx-auto p-4">

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


          {/* SERVICES ROUTES */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />

          {/* BOOK SERVICE */}
          <Route path="/book-service" element={<BookService />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/my-bookings" 
            element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
           }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


        </Routes>

      </main>
    </div>
  )
}
