import Link from "next/link";

export default function Home() {
  const names = ['FE', 'BE', 'DEMO'];

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
    </div>
    
  )
}
