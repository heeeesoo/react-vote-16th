import { useRouter } from "next/router";
import VotePartBox from "../../src/components/common/VotePartBox";

export default function Part(){
    const router = useRouter();
    const {Part} = router.query;

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

    return(
        <div>
            {Part} 투표하기
            {
                dataList.map((data,idx)=>{
                    return(
                        <VotePartBox
                            key={idx}
                            name={data.name}
                            department={data.department}
                            score={data.score}
                        />
                    )
                })
            }
            <button>투표하기</button>
        </div>
    )
}