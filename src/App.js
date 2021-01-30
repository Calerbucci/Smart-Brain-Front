import React from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation'; 
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo'; 
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Signin from './components/Signin/Signin'; 
import Register from './components/Register/Register'; 
import Rank from './components/Rank/Rank'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const particlesOptions = {
      particles: {
        number: {
          value:30,
          density: {
            enable: true,
            value_area: 800
          }
        }
     }
}


function App() {

  return (
    
      <div className="App">
        <Router>
        <Particles className='particles'  params={particlesOptions} />
         <Switch>
             <Route path='/signin'>
                  <Navigation/>
                  <Signin/>
             </Route>
             <Route path='/register'>
                  <Navigation/>
                  <Register/>
             </Route>
             <Route path='/navigation'>
                  <Navigation/>
                  <Logo/>
                  <Rank/>
                  <ImageLinkForm />
                  <FaceRecognition/> 
            </Route>
            <Route path='/'>
              <Navigation/>
              <Signin/>
            </Route>
         </Switch>  
        </Router>    
    </div>
    
    
  );
}

export default App;
