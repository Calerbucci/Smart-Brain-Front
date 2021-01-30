import React, {useState} from 'react'
import './ImageLinkForm.css';
import { useStateValue } from '../../StateProvider';



function ImageLinkForm() {
    const [{user}, dispatch] = useStateValue();
    const [changeInput, setChangeInput] = useState("");

    const calculateFaceLocation = (data) => {
       const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);

       return{
           leftCol: clarifaiFace.left_col * width,
           topRow: clarifaiFace.top_row * height,
           rightCol: width - (clarifaiFace.right_col * width),
           bottomRow : height - (clarifaiFace.bottom_row * height),
       }
    }

    const displayFaceBox = (box) => {
        dispatch({
            type: 'UPDATE_BOX',
            payload: box,
        });
    }

    const passLink = (e) => {
        e.preventDefault();

        dispatch({
            type: 'UPDATE_INPUT',
             url: changeInput,
           });

           fetch("https://protected-bayou-34915.herokuapp.com/imageUrl", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: changeInput,
            }),   
        })
        .then(response => response.json())
        .then((response) => {
             if(response) {
                fetch("https://protected-bayou-34915.herokuapp.com/image", {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: user?.id,
                        }),   
                    })
                    .then(response => response.json())
                    .then(user => {
                        dispatch({
                            type: 'SET_USER',
                            user: user,
                        })
                    }).catch(console.log());

                    displayFaceBox(calculateFaceLocation(response))
                }
                
        })
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <p 
              className='f3'>
              {'This magic brain will detect faces in your picture, Give it a try!'}
            </p>

            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        className='f4 pa2 w-70 center'
                        value={changeInput} 
                        type='text' 
                        onChange={(event)=>setChangeInput(event.target.value)}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        type='submit'
                        onClick={passLink}>Detect
                     </button>
                </div>
            </div>
        </div>


    )
}

export default ImageLinkForm;
