interface ResultPartBoxProps {
    name: string;
    department?: string;
    score: number;
}

export default function ResultPartBox({name,department,score}:ResultPartBoxProps){
    return(
        <>
            <div className="container">
                <button className="item">
                    <div className="name">
                        {name} <br/>
                    </div>
                    <br/>
                    실시간 득표수 {score}
                </button>
            </div>
            <style jsx>{`
            .container{
                margin: 5px;
            }
            .item{
                border-radius: 20px;
                border: none;
                background-color: #EEEEEE;
                width: 450px;
                height: 100px;
                font-family: LINESeedKR-Bd;
            }

            .name {
                font-size: 25px;
            }
        `}</style>
        </>
    )
}