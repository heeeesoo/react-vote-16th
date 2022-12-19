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
        <div>
            <button onClick={handleClick}>
                {name} <br/>
                {score} <br/>
            </button>
        </div>
    )
}