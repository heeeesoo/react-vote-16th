import { miniSerializeError } from "@reduxjs/toolkit";

interface VotePartBoxProps {
    num: number;
    name: string;
    department: string;
    score: number;
    getVoteData: (vote: any) => void;
}

export default function VotePartBox({num,name,department,score,getVoteData}:VotePartBoxProps){

    const handleClick = () => {
        getVoteData({
            "name" : num,
            "department": department,
            "team" : null
        });
    }
    return(
        <div>
            <button onClick={handleClick}>
                {num}<br/>
                이름 : {name} <br/>
                파트 : {department} <br/>
                점수 : {score} <br/>
            </button>
        </div>
    )
}