import { useRouter } from "next/router";
import ResultPartBox from "../../src/components/common/ResultPartBox";
import { GetServerSideProps } from 'next'

export default function Part({
    dataDepartment,
    dataTeam
} : any){
    const router = useRouter();
    const {Part} = router.query;
    let department_id = -1;
    if(Part === 'FE'){
        department_id=0
    }else if(Part === 'BE'){
        department_id=1
    }

    // fe, be, demo 리스트 -> fetch로 바꾸기
    const dataDepartmentList = dataDepartment.filter((value:any)=>{
        return value.department_id === department_id
    })

   return(
        <>
            <div className="container">
                {Part} 투표 현황<br/><br/>
                {
                    Part === 'DEMO' ?
                    dataTeam.map((data:any,idx:number)=>{
                        return(
                            <ResultPartBox
                                key={idx}
                                name={data.name}
                                department={data.department}
                                score={data.score} 
                            />
                        )
                    })
                    :
                    dataDepartmentList.map((data:any,idx:number)=>{
                        return(
                            <ResultPartBox
                                key={idx}
                                name={data.name}
                                department={data.department}
                                score={data.score} 
                            />
                        )
                    })
                }
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
            }
            .item:hover {
                background: silver;
            }
        `}</style>
    </>
   ) 
}

// get 부분
export const getServerSideProps : GetServerSideProps = async() => {
    const URL_department = 'https://ceos-16-vote.ml/users/department/1';
    const URL_team = 'https://ceos-16-vote.ml/users/team/1';
    const dataDepartment = await (await fetch(URL_department)).json();
    const dataTeam = await (await fetch(URL_team)).json();

    return{
        props:{
            dataDepartment,
            dataTeam
        }
    }
}