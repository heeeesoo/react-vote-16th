interface ResultPartBoxProps {
    name: string;
    department: string;
    score: number;
}

export default function ResultPartBox({name,department,score}:ResultPartBoxProps){
    return(
        <>
            <div className="item">
                {name} <br/>
                {department} <br/>
                실시간 득표수 {score} <br/>
            </div>
            <style jsx>{`
            .container{
                margin: 5px;
            }
            .item{
                margin: 5px;
                border-radius: 20px;
                background-color: #EEEEEE;
                width: 450px;
                height: 100px;
                line-height: 35px;
                text-align: center;
            }
        `}</style>
        </>
    )
}