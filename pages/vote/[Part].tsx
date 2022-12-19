import { useRouter } from "next/router";
import { useState } from "react";
import VotePartBox from "../../src/components/common/VotePartBox";

export default function Part(){
    const router = useRouter();
    const {Part} = router.query;

    const [vote, setVote] = useState(0);

    // fe, be, demo 리스트 -> fetch로 바꾸기
    const dataList = [
        {
            "id" : 0,
            "name" : "후보1",
            "department_id" : 0,
            "department" : "프론트엔드",
            "score" : 1 
        },
        {
            "id" : 1,
            "name" : "후보2",
            "department_id" : 1,
            "department" : "백엔드",
            "score" : 2
        },
        {
            "id" : 2,
            "name" : "후보3",
            "department_id" : 0,
            "department" : "프론트엔드",
            "score" : 3
        }
    ]

    const handleClick = () => {
        const data = dataList.filter((value)=> value.id === vote)
        console.log(data[0])

        // 투표 버튼 api 쓰기
    }

    const getVoteData = (vote : number) => {
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
                            id={idx}
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