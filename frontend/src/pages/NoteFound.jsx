import { Link } from 'react-router'

const NoteFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold'>404 - Not Found</h1>
            <p className='text-lg text-gray-600'>The page you are looking for does not exist.</p>
            <Link to="/login" className='text-lg text-gray-600 hover:text-gray-800 hover:underline cursor-pointer mt-2'>Go back to login</Link>
        </div>
    )
}

export default NoteFound