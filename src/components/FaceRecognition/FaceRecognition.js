import React from 'react'
import { useStateValue } from '../../StateProvider';
import './FaceRecognition.css'

function FaceRecognition() {

    const [{imageUrl, box}] = useStateValue();
    return (
        <div className='center'>
            <div className='absolute mt2'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
                <div className='bounding_box' 
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
                </div>
            </div>  
        </div>
    )
}

export default FaceRecognition
