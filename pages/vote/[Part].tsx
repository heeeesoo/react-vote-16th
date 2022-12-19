import { useRouter } from "next/router";
import { useState } from "react";
import VotePartBox from "../../src/components/common/VotePartBox";

export default function Part(){
    const router = useRouter();
    const {Part} = router.query;

    const [vote, setVote] = useState({});

    // fe, be, demo 리스트 -> fetch로 바꾸기
    const dataList = [
        {
            "name" : "후보1",
            "department" : "팀",
            "score" : 1 
        },
        {
            "name" : "후보2",
            "department" : "팀",
            "score" : 2
        },
        {
            "name" : "후보3",
            "department" : "팀",
            "score" : 3
        }
    ]

    const handleClick = () => {
        console.log(vote)
    }

    const getVoteData = (vote : any) => {
        setVote(vote)
    }

    return(
        <div>
            {Part} 투표하기
            {
                dataList.map((data,idx)=>{
                    return(
                        <VotePartBox
                            key={idx}
                            num={idx+1}
                            name={data.name}
                            department={data.department}
                            score={data.score}
                            getVoteData = {getVoteData}
                        />
                    )
                })
            }
            <button onClick={handleClick}>투표하기</button>
        </div>
    )
}