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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    // const data = fetchRegister();
    // console.log(data)
  };

  async function fetchRegister(){
    const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:username.value,
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
    <div>
      CEOS 운영진 선출 투표 <br />
      <form onSubmit={handleSubmit}>
        {!isSocialSignIn ? (
          <>
            <div>
              이메일:
              <input type="text" {...useremail} placeholder="ceos@gmail.com" />
            </div>
            <div>
              비밀번호:
              <input
                type="password"
                onChange={handlePwd}
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <div>
              비밀번호 확인 :
              <input
                type="password"
                onChange={handleRepwd}
                placeholder="비밀번호를 한번 더 입력해주세요"
              />
              {pwdError && <span>일치하지 않습니다.</span>}
            </div>
          </>
        ) : (
          <div>
            이메일:
            <input type="text" {...useremail} readOnly />
          </div>
        )}
        <div>
          <span>이름 : </span>
          <input type="text" {...username} placeholder="이름" />
        </div>
        <div>
          {selectList.map((value,idx) => (
            <div key={value}>
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
        <div>
          {teamList.map((value,idx) => (
            <div key={value}>
              <input
                type="radio"
                onChange={handleTeamChange}
                value={idx}
                checked={team === idx}
              />
              {value}
            </div>
          ))}
        </div>
        <button type="submit">회원가입</button>
      </form>
      <Link href="/login">로그인</Link>
    </div>
  );
}
