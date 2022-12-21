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
                {name} <br/>
                {score} <br/>
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
        }
        .item:hover {
            background: silver;
        }
        `}</style>
        </>
    )
}