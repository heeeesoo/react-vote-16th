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
        <>
            <div className="container">
                <button className="item" onClick={handleClick}>
                    {name} <br/>
                    {/* 파트 : {department} <br/> */}
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
                    background-color: #B2B2B2;
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