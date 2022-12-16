interface VotePartBoxProps {
    name: string;
    department: string;
    score: number;
}

export default function VotePartBox({name,department,score}:VotePartBoxProps){
    return(
        <div>
            이름 : {name} <br/>
            팀 : {department} <br/>
            점수 : {score} <br/>
            <hr/>
        </div>
    )
}