// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// fine---------------------------------------------------------------------------
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Broadcast from './Components/Broadcast';
// // import Broadcast from './Components/Broadcast';
// import Playback from './Components/Playback';

// function App() {
//   return (
//     <div className="App">
//       <div className="container bg-dark text-white gx-4 px-4 py-4 mt-3 rounded">
//         <img
//           src="https://go.dolby.io/hubfs/raw_assets/public/Dolby_April2021/images/dolby-io-logo.svg"
//           alt="Dolby Logo"
//         />
//         <h1>Getting Started with Streaming Web SDK</h1>
//       </div>
//       <Broadcast />
//       <Playback />
//     </div>
//   );
// }

// export default App;






// routes -------------------------------------------------------
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Broadcast from './Components/Broadcast';
import Playback from './Components/Playback';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Broadcast />} />
        <Route path="/playback" element={<Playback />} />
      </Routes>
    </Router>
  );
};

export default App;

