import { login, selectUser } from "../../../src/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

interface TeamBoxProps {
    id : number;
    name : string;
    score : number;
    getVoteData: (vote: any) => void;
}

export default function TeamBox({id,name,score,getVoteData}:TeamBoxProps){

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleClick = () => {
        getVoteData({
            id:id,
            part:"team"
        });
    }

    return (
        <>
        <div className="container">
            <button className= {user.team === id ? "itemX" : "item"} onClick={handleClick}>
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

        .itemX {
            border-radius: 20px;
            border: none;
            background-color: #434242;
            width: 450px;
            height: 100px;
            pointer-events: none;
            font-family: LINESeedKR-Bd;
        }

        .name {
            font-size: 25px;
        }
        `}</style>
        </>
    )
}