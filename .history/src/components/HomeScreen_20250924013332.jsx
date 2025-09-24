import "./Home.css";
import {useUser } from "./useUser.js";
import { useNavigate } from "react-router-dom";


export default function HomeContent() { 
    const {language} = useUser();
    const navigate = useNavigate();
    const fancyJobTerms = [
        "Casual Jobs",
        "Janta", // swahili slang for work
        "Boulot",// french slang for work
        "Chamba", // hindi slang for work
        "Ise", // igbo slang for work
        
    ]

}