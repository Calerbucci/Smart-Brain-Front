import React from 'react'
import { useStateValue } from '../../StateProvider';
import './Rank.css';



function Rank() {

    const [{user}] = useStateValue();
    return (
        <div className='white f3'>
                {`${user?.name}, your current rank is...`}
                
            <div className='white f1'>
                {`${user?.entries}`}
            </div>
        </div>    
    )
}

export default Rank
