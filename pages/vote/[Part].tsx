import { useRouter } from "next/router";
import { useState } from "react";
import { GetServerSideProps } from 'next'
import DepartmentBox from "../../src/components/common/DepartmentBox";
import TeamBox from "../../src/components/common/TeamBox";

export default function Part({
    dataDepartment,
    dataTeam
} : any){
    const router = useRouter();
    const {Part} = router.query;
    let department_id = -1;

    if(Part === 'FE'){
        department_id = 0
    }else{
        department_id = 1
    }

    const [vote, setVote] = useState({
        id: 0,
        part: "department"
    });

    console.log(dataDepartment)
    console.log('DATATEAM:',dataTeam);

    // fe, be 리스트 -> fetch로 바꾸기
    const dataList_department = dataDepartment.filter((value:any)=>{
        return value.department_id === department_id
    })

    const handleClick = async () => {
        // 투표 버튼 api 쓰기

        const {id, part}= vote;
        if(part === "department"){
            const data = dataDepartment.filter((value:any)=> value.id === id)
            console.log(data[0])
            const response = await fetchVote(data[0],part);
            console.log(response)
            if(response === 'success'){
                router.push(`/result/${Part}`)
            }
            
        }else{
            const data = dataTeam.filter((value:any)=> value.id === id)
            console.log(data[0])
            const response = await fetchVote(data[0],part);
            console.log(response)
            if(response === 'success'){
                router.push(`/result/${Part}`)
            }
        }

    }

    const getVoteData = (vote : {id: number; part: string;}) => {
        setVote(vote)
    }

    const fetchVote = async (data:any,part:string) => {
        console.log('!!!:',data)
        const name = part === 'department' ? data.id : null
        const department = part === 'department' ? data.department_id : null
        const team = part === 'department' ? null : data.id
        console.log('F:',name,department,team)
        console.log(typeof(name),typeof(department))
        const settings ={
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                department: department,
                team: team
            })
        }

        try {
            const URL = 'https://ceos-16-vote.ml/users/vote/';
            const data = await (await fetch(URL,{
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                department: department,
                team: team
            })
            })).json();
            return data;
        } catch (error) {
            return error;
        }
    }

    return(
        <div>
            <div className="container">
            {Part} 투표하기<br/><br/>
            {
                Part === 'DEMO' ?
                dataTeam.map((data:any,idx:number)=>{
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
                dataList_department.map((data:any,idx:number)=>{
                    return(
                        <DepartmentBox
                            key={idx}
                            id={data.id}
                            name={data.name}
                            department={data.department}
                            score={data.score}
                            getVoteData = {getVoteData}
                        />
                    )
                })
            }
            <button className="item" onClick={handleClick}>투표하기</button>
            </div>
            <style jsx>{`
                .container{
                    display: flex;
                    margin: 15px;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                .item{
                    margin: 20px;
                    border-radius: 20px;
                    border: none;
                    background-color: #B2B2B2;
                    width: 450px;
                    height: 50px;
                    cursor: pointer;
                    font-family: LINESeedKR-Bd;
                    font-size: 15px;
                }
                .item:hover {
                    background: silver;
                }
            `}</style>
        </div>
    )
}

// get 부분
export const getServerSideProps : GetServerSideProps = async() => {
    const URL_department = 'https://ceos-16-vote.ml/users/department/0';
    const URL_team = 'https://ceos-16-vote.ml/users/team/0';
    const dataDepartment = await (await fetch(URL_department)).json();
    const dataTeam = await (await fetch(URL_team)).json();

    return{
        props:{
            dataDepartment,
            dataTeam
        }
    }
}