interface DepartmentBoxProps {
    id: number;
    name: string;
    department: string;
    score: number;
    getVoteData: (vote: any) => void;
}

export default function DepartmentBox({id,name,department,score,getVoteData}:DepartmentBoxProps){

    const handleClick = () => {
        getVoteData({
            id:id,
            part:"department"
        });
    }
    return(
        <div>
            <button onClick={handleClick}>
                이름 : {name} <br/>
                파트 : {department} <br/>
                점수 : {score} <br/>
            </button>
        </div>
    )
}