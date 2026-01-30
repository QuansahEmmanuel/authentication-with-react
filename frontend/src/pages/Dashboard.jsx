import React from 'react'
import { useState } from 'react';
import api from '../lib/axiosInstance';

const Dashboard = () => {

    const [user, setUser] = useState(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get("/dashboard");

            setUser(response.data.user);
        };
        fetchUser();
    }, []);



    return (
        <div className='flex min-h-screen flex-col items-center  px-6 py-12 lg:px-8'>
            <h1 className='text-2xl font-bold text-gray-900'>Welcome to your {user?.fullName}</h1>
            <span>Your email is: {user?.email}</span>
            <span>Your phone number is: {user?.phone}</span>
        </div>
    )
}

export default Dashboard