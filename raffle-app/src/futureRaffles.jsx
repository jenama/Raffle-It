// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Raffles({ raffles, selected, setSelected , setRaffles}) {
//   /**
//    * input with an onchange
//    * filter through raffles
//    * match substring/name of raffles case insensitive
//    */

//   const [filterRaffleName, setFilterRaffleName] = useState("");
//   const [filteredRaffles, setFilteredRaffles] = useState([]);
//   const [filterMatch, setFilterMatch] = useState()

//    useEffect(() => {
//     async function getAllRaffles() {
//       try {
//         const url = `http://localhost:4100/raffles`;
//         const { data } = await axios.get(url);
//         setRaffles(data.payload);
//         setFilteredRaffles(data.payload)
//       } catch (error) {
//         console.log("error", error);
//       }
//     }
//     getAllRaffles();
//   }, []);

//   function filterRaffleByName(e) {
//     e.preventDefault()
//     setFilterRaffleName(e.target.value.toLowerCase());
//     console.log("filter input name", filterRaffleName);
    
//     let filteredRaffleNameResult = raffles.filter((raffle) => {
//       if (raffle.name.toLowerCase().includes(filterRaffleName)) {
//          return true
//       } else {
//           return false;
//       }
//     });
//     setFilteredRaffles(filteredRaffleNameResult);
//   }

//   return (
//     <div className="raffles-list">
//       <h2>
//         <em>All Raffles:</em>
//       </h2>
//       <form>
//         <input
//           onChange={filterRaffleByName}
//           value={filterRaffleName}
//           placeholder="enter name"
//         />
//       </form>
//       <div className="raffles-array">
//       { !filteredRaffles ?  
//           raffles.map((raffle, i) => {
//               return (
//                 <Link to={`/raffle/${raffle.id}`}>
//                   <div className="raffle" key={i}>
//                     <h3>{raffle.name}</h3>
//                     <p>Created on:{raffle.created_at}</p>
//                     <p>Winner id:{raffle.winner_id}</p>
//                     <p>Raffled on:{raffle.raffled_at}</p>
//                   </div>
//                 </Link>
//               )
//             }) : 
//               filteredRaffles.map((raffle, i) => {
//               return (
//                 <Link to={`/raffle/${raffle.id}`}>
//                   <div className="raffle" key={i}>
//                     <h3>{raffle.name}</h3>
//                     <p>Created on:{raffle.created_at}</p>
//                     <p>Winner id:{raffle.winner_id}</p>
//                     <p>Raffled on:{raffle.raffled_at}</p>
//                   </div>
//                 </Link>
//               );
//             }) 
//       }

        
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Raffles({ raffles, selected, setSelected }) {


//   return (
//     <div className="raffles-list">
//       <h2>
//         <em>All Raffles:</em>
//       </h2>
//       <div className="raffles-array">
        
//           {raffles.map((raffle, i) => {
//               return (
//                 <Link to={`/raffle/${raffle.id}`}>
//                   <div className="raffle" key={i}>
//                     <h3>{raffle.name}</h3>
//                     <p>Created on:{raffle.created_at}</p>
//                     <p>Winner id:{raffle.winner_id}</p>
//                     <p>Raffled on:{raffle.raffled_at}</p>
//                   </div>
//                 </Link>
//               );
//             })}
//       </div>
//     </div>
//   );
// }