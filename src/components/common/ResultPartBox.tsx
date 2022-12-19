interface ResultPartBoxProps {
    name: string;
    department: string;
    score: number;
}

export default function ResultPartBox({name,department,score}:ResultPartBoxProps){
    return(
        <div>
            이름 : {name} <br/>
            팀 : {department} <br/>
            점수 : {score} <br/>
            <hr/>
        </div>
    )
}