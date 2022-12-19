import { useRouter } from "next/router";
import { useState } from "react";
import DepartmentBox from "../../src/components/common/DepartmentBox";
import TeamBox from "../../src/components/common/TeamBox";

export default function Part(){
    const router = useRouter();
    const {Part} = router.query;

    const [vote, setVote] = useState({
        id: 0,
        part: "department"
    });

    // fe, be 리스트 -> fetch로 바꾸기
    const dataList_department = [
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

    // demo 리스트 -> fetch로 바꾸기
    const dataList_team = [
        {
            "id" : 0,
            "name" : "diaMEtes",
            "score" : 1 
        },
        {
            "id" : 1,
            "name" : "포겟미낫",
            "score" : 2
        },
        {
            "id" : 2,
            "name" : "밥묵자",
            "score" : 3
        }
    ]

    const handleClick = () => {
        // 투표 버튼 api 쓰기

        const {id, part}= vote;
        if(part === "department"){
            const data = dataList_department.filter((value)=> value.id === id)
            console.log(data[0])
        }else{
            const data = dataList_team.filter((value)=> value.id === id)
            console.log(data[0])
        }

    }

    const getVoteData = (vote : {id: number; part: string;}) => {
        setVote(vote)
    }

    return(
        <div>
            {Part} 투표하기
            {
                Part === 'DEMO' ?
                dataList_team.map((data,idx)=>{
                    return(
                        <TeamBox
                            key={idx}
                            id={idx}
                            name={data.name}
                            score={data.score}
                            getVoteData={getVoteData}
                        />
                    )
                })
                :
                dataList_department.map((data,idx)=>{
                    return(
                        <DepartmentBox
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