import Link from "next/link";

// redux test 부분
import {up, down, selectCount} from '../src/features/counter/counterSlice'
import { useSelector, useDispatch } from "react-redux";
// redux test 부분

export default function Home() {
  const names = ['FE', 'BE', 'DEMO'];

  // redux test 부분
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  // redux test 부분

  return (
    <div>
      {
        names.map((name,idx)=>{
          return (
            <div key={name}>
              <Link
                href={{
                  pathname: `/vote/${name}`
                }}
              >
                {name} 투표하기
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                href={{
                  pathname: `/result/${name}`
                }}
              >
                {name} 결과보기
              </Link>
            </div>
          )
        })
      }

      <hr/>
      redux test 부분 <br/>
      {count}
      <button onClick={()=>{
        dispatch(up(2))
      }}> + </button>
      <button onClick={()=>{
        dispatch(down(2))
      }}> - </button>
    </div>
    
  )
}
