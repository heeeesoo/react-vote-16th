import { miniSerializeError } from "@reduxjs/toolkit";

interface VotePartBoxProps {
    id: number;
    name: string;
    department: string;
    score: number;
    getVoteData: (vote: any) => void;
}

export default function VotePartBox({id,name,department,score,getVoteData}:VotePartBoxProps){

    const handleClick = () => {
        getVoteData(id);
    }
    return(
        <div>
            <button onClick={handleClick}>
                {id}<br/>
                이름 : {name} <br/>
                파트 : {department} <br/>
                점수 : {score} <br/>
            </button>
        </div>
    )
}