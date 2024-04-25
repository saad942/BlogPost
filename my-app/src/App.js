import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './footer/footer';
import Nav from './nav/nav';
import Controle from './Controle/controle';
import Login from './login-regestry/login';
import Regestry from './login-regestry/regesty';
import Home from './home/home';
import Profil from './profil/profil';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load Botpress Web Chat Scripts
    const loadBotpressScripts = () => {
      const script1 = document.createElement('script');
      script1.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://mediafiles.botpress.cloud/7fd9885a-7ebe-4895-966d-04b29094fd67/webchat/config.js';
      script2.defer = true;
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    };

    const cleanup = loadBotpressScripts();

    return () => {
      cleanup();
    };
  }, []);
  return (
    <div className="App">
      <Router>
        <Nav />
        
        <Routes>
          <Route path="/Controle" element={<Controle />} />
          <Route path="/" element={<Login />} />
          <Route path="/regestry" element={<Regestry />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profil />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;





// import React, { useState } from "react";
// import './aaa.css';

// function App() {
//   const [color, setColor] = useState(true);
//   const [name, setName] = useState('')
//   const [namesList, setNamesList] = useState([]);
//   const [colore,setColore]=useState()


//   const handleClick = () => {
//     setColor(false);
//     test();
//   }

//   const test = () => {

//     document.body.style.backgroundColor = 'white';
//   }
//   const add = (e) => {
//     e.preventDefault();
//     setNamesList([...namesList, name])

//   }
//   const delet = (index) => {
//     const updatedNamesList = [...namesList];
//     updatedNamesList.splice(index, 1);
//     setNamesList(updatedNamesList);
//   };
  



//   return (
//     <div className="aaa">
//       {color ? (
//         <div>


//           <button onClick={handleClick}>tvt</button>
//         </div>
//       ) : (
//         <div>
//              <input type="text" onChange={(e) => setName(e.target.value)} />
//           <button onClick={add}>Add</button>
//           <h1>{name}</h1>
//           <ul>
//             {namesList.map((name, index) => (
//               <li key={index}>{name} <button onClick={()=>delet(index)}>delete</button></li> 
//             ))}
//           </ul>

//           <div id="brd" style={{ backgroundColor: colore, width: "100px", height: "100px" }}></div>

//           <select value={colore} onChange={(e)=>setColore(e.target.value)}>
//           <option value="">Select Color</option>
//         <option value="red">Red</option>
//         <option value="blue">Blue</option>
//         <option value="black">Black</option>
//           </select>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



