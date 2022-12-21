interface TeamBoxProps {
    id : number;
    name : string;
    score : number;
    getVoteData: (vote: any) => void;
}

export default function TeamBox({id,name,score,getVoteData}:TeamBoxProps){

    const handleClick = () => {
        getVoteData({
            id:id,
            part:"team"
        });
    }

    return (
        <>
        <div className="container">
            <button className="item" onClick={handleClick}>
                <div className="name">
                    {name} <br/>
                </div>
                <br/>
                실시간 득표수 {score} <br/>
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
            cursor: pointer;
            font-family: LINESeedKR-Bd;
        }
        .item:hover {
            background: silver;
        }

        .name {
            font-size: 25px;
        }
        `}</style>
        </>
    )
}