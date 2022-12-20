import { useState } from "react";
import useInput from "../src/hooks/useInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const selectList = ["Frontend", "Backend"];
const teamList = [
  "Teample",
  "diaMEtes",
  "Forget Me Not",
  "Pre:folio",
  "recipeasy",
];

export default function Register() {
  const router = useRouter();
  const isSocialSignIn: boolean = router.query.social == "true";
  const { data: session } = useSession();

  const username = useInput(isSocialSignIn ? session?.user.name : "");
  const useremail = useInput(isSocialSignIn ? session?.user.email : "");

  const [part, setPart] = useState<number>(-1) //useInput으로 바꾸기
  const [team, setTeam] = useState<number>(-1); //useInput으로 바꾸기
  const [password, setPassword] = useState(
    isSocialSignIn ? session?.user.userId : ""
  );
  const [repassword, setRepassword] = useState(
    isSocialSignIn ? session?.user.userId : ""
  );
  const [pwdError, setPwdError] = useState(false);

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwdError(repassword !== value);
    setPassword(value);
  };
  const handleRepwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwdError(password !== value);
    setRepassword(value);
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPart(Number(e.target.value))
  };
  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`
        username:${username.value}
        password:${password}
        useremail:${useremail.value}
        userPart:${part}
        team:${team}`);

    const isEnableReg =
      username.value !== "" &&
      password !== "" &&
      !pwdError &&
      part !== -1 &&
      team !== -1;

    if (isEnableReg) {
      console.log("제출");
    } else {
      alert("조건을 확인해주세요");
    }

    // 회원가입 post 부분
    const data = await fetchRegister();
    console.log(data)
    console.log(data.status)
    if(data){
      router.push('/')
    }else{
      // error 부분 알람 뜨게
      alert('error')
    }
  };

  const fetchRegister = async() =>{
    const settings = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:useremail.value,
        password: password,
        name: username.value,
        department: part,
        team: team
      })
    };

    try {
      const fetchResponse = await fetch('http://ec2-3-37-33-162.ap-northeast-2.compute.amazonaws.com/account/register/', settings);
      const data = await fetchResponse.json();
      return data;
    } catch (e) {
        return e;
    }  
  }


  return (
    <>
    <div className="container">
      <div className="item">
      CEOS 운영진 선출 투표 <br /><br/>
      <form onSubmit={handleSubmit}>
        {!isSocialSignIn ? (
          <>
            <div>
              이메일<br/>
              <input type="text" {...useremail} placeholder="ceos@gmail.com" />
            </div><br/>
            <div>
              비밀번호<br/>
              <input
                type="password"
                onChange={handlePwd}
                placeholder="비밀번호를 입력해 주세요"
              />
            </div><br/>
            <div>
              비밀번호 확인<br/>
              <input
                type="password"
                onChange={handleRepwd}
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
              <br/>
              {pwdError && <span>일치하지 않습니다.</span>}
            </div><br/>
          </>
        ) : (
          <div>
            이메일<br/>
            <input type="text" {...useremail} readOnly />
          </div>
        )}
        <div>
          <span>이름<br/> </span>
          <input type="text" {...username} placeholder="이름" />
        </div><br/><hr/>
        <div>
          {selectList.map((value,idx) => (
            <div key={value} className="radio">
              <input
                type="radio"
                onChange={handleSelectChange}
                value={idx}
                checked={part === idx}
              />
              {value}
            </div>
          ))}
        </div>
        <hr/>
        <div>
          {teamList.map((value,idx) => (
            <div className="radio" key={value}>
              <input
                type="radio"
                onChange={handleTeamChange}
                value={idx}
                checked={team === idx}
              />
              {value}
            </div>
          ))}
        </div><hr/>
        <button type="submit">회원가입</button>
      </form>
      <br/>
      <Link href="/login">로그인</Link>
      </div>
    </div>
    <style jsx>{`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 50px;
    }
    .item {
      text-align: center;
    }
    .radio {
      diplay: flex;
      width:300px;
      text-align: left;
      line-height: 10px;
    }

    button {
      border-radius: 20px;
      border: none;
      width: 300px;
      height: 50px;
      font-family: LINESeedKR-Bd;
      background: #EEEEEE;
    }
    input {
      margin: 5px;
      border: none;
      background: #EEEEEE;
      width: 300px;
      height: 50px;
      font-family: LINESeedKR-Bd;
    }
    input[type='radio']{
      width: 20px;
      height: 20px;
    }
    `}</style>
    </>
  );
}
