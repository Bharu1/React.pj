import React from 'react';
import  ModeToggle  from '../context/ModeToggle';

const Header = () => {
    return (
        <div className='flex justify-between items-center shadow-xl w-full p-5 md:p-5 md:w-full bg-white dark:bg-gray-800 dark:text-white'>

            <div className='font-bold md:text-xl '>
                <p className=''>Where in the world?</p>
            </div>


                <div className='cursor-pointer mx-8'>
                    <ModeToggle />
                </div>

        </div>
    )
}

export default Header;