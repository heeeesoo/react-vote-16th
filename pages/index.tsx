import Link from "next/link";

export default function Home() {
  const names = ['FE', 'BE', 'DEMO'];

  return (
    <div>
      {
        names.map((name,idx)=>{
          return (
            <div className="container" key={name}>
              <div className="item">
                <Link
                  href={{
                    pathname: `/vote/${name}`
                  }}
                >
                  {name} 투표하기
                </Link>
              </div>
              <div className="item">
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
            width: 150px;
            background: #B2B2B2;
            line-height: 150px;
            text-align: center;
          }
      `}</style>
    </div>
    
  )
}
