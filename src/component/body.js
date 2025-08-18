// import { useEffect, useState } from "react";



// function Body(){
//     const [profile,setProfile]=useState([]);
//     const [numberofProfile,setNumberofProfile]=useState("")


//     async function genrateprofile(count){
//       let ran= Math.floor(1+Math.random()*10000);
//         try {
//       const response= await fetch(`https://api.github.com/users?since=${ran}&per_page=20`)
//       const data =await response.json();
//       setProfile(data); 
//         } catch (error) {
//         console.error("Failed to fetch profiles:", error);
//         }
//     }

//     useEffect(()=>{genrateprofile(10)},[])

//     return(
//         <>
//         <div className="but">
//             <input type="text" className="input" placeholder="Search here" value={numberofProfile}onChange={(e)=>{setNumberofProfile(e.target.value)}} ></input>
//             <button className="button" onClick={()=>genrateprofile(Number(numberofProfile))} >Search Profile</button>

//             <div className="profiles">
//                 {profile.map((value)=>{
//                     return( 
//                     <div key={value.id} className="card">
//                         <img src={value.avatar_url}></img>
//                         <h2>{value.login}</h2>
//                         <a href={value.html_url} target="_blank">Profile</a>
//                     </div>
//                     )
//                 })}
//             </div>

//         </div>
//         </>
//     )
// }

// export default Body;




import { useEffect, useState ,useCallback} from "react";



function Body(){
    const [profile,setProfile]=useState([]);
    const [numberofProfile,setNumberofProfile]=useState("")

    const genrateprofile = useCallback(async (input) => {
        try {
        if (!isNaN(input) && input !== "") {
            const ran = Math.floor(1 + Math.random() * 10000);
            const response = await fetch(
            `https://api.github.com/users?since=${ran}&per_page=${input}`
            );
            const data = await response.json();
            setProfile(data);
        } else if (typeof input === "string" && input.trim() !== "") {
            const response = await fetch(
            `https://api.github.com/users/${input.trim()}`
            );
            if (!response.ok) {
            throw new Error("User not found");
            }
            const data = await response.json();
            setProfile([data]);
        }
        } catch (error) {
        console.error("Failed to fetch profiles:", error);
        setProfile([]);
        }
    }, []);

    useEffect(() => {
        genrateprofile(10);
    }, [genrateprofile]);

    return(
        <>
        <div className="but">
            <input type="text" className="input" placeholder="Search here" value={numberofProfile}onChange={(e)=>{setNumberofProfile(e.target.value)}} ></input>
            <button className="button" onClick={()=>genrateprofile(numberofProfile)} >Search Profile</button>

            <div className="profiles">
                {profile.map((value)=>{
                    return( 
                    <div key={value.id} className="card">
                        <img src={value.avatar_url}></img>
                        <h2>{value.login}</h2>
                        <a href={value.html_url} target="_blank">Profile</a>
                    </div>
                    )
                })}
            </div>

        </div>
        </>
    )
}

export default Body;


//try
//usecallback//search by name