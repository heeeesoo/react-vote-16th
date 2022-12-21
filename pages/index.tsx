import Link from "next/link";
import { selectUser } from "../src/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const names = ['FE', 'BE', 'DEMO'];

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div>
      {
        names.map((name,idx)=>{
          return (
            <div className="container" key={name}>
              <div className = {user.department>=0 && (user.department===idx || idx===2) ? 'item' : 'itemX'}>
                <Link
                  href={{
                    pathname: `/vote/${name}`
                  }}
                >
                  {name} 투표하기
                </Link>
              </div>
              <div className = {user.department>=0 && (user.department===idx || idx===2) ? 'item' : 'itemX'}>
                <Link
                  href={{
                    pathname: `/result/${name}`
                  }}
                >
                  {name} 결과보기
                </Link>
              </div>
            </div>
          )
        })
      }
      <style jsx>{`
          .container {
            margin: 15px;
            display: flex;
            justify-content: center;
            height: 150px;
          }
          .item {
            border-radius: 20px;
            margin: 5px;
            height: 150px;
            width: 250px;
            background: #EEEEEE;
            line-height: 150px;
            text-align: center;
          }
          .itemX {
            border-radius: 20px;
            margin: 5px;
            height: 150px;
            width: 250px;
            background: #434242;
            line-height: 150px;
            text-align: center;
            pointer-events: none;
          }
      `}</style>
    </div>
    
  )
}
