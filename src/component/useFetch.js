    
    import { useEffect,useState,useCallback } from "react";
    

  export default function useFetch(){
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
        }, []);

        return{

            genrateprofile,
            numberofProfile,
            setNumberofProfile,
            profile
        }
        
    }