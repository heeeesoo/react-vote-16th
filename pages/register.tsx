import { useState } from "react";
import useInput from "../src/hooks/useInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();
  const isSocialSignIn: boolean = router.query.social == "true";
  const { data: session } = useSession();

  const username = useInput(isSocialSignIn ? session?.user.name : "");
  const password = useInput(isSocialSignIn ? session?.user.userId : "");
  const useremail = useInput(isSocialSignIn ? session?.user.email : "");

  const [userDepartment, setDepartmentType] = useState(""); //useInput으로 바꾸기
  const [teamtype, setTeamType] = useState(""); //useInput으로 바꾸기
  const [pwdCheck, setPwdCheck] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const handlePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = { ...e.target };
    setPwdError(password.value !== value);
    setPwdCheck(value);
  };

  const selectList = ["Frontend", "Backend"];
  const teamList = [
    "Teample",
    "Forget Me Not",
    "Pre:folio",
    "diaMEtes",
    "recipeasy",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`
        username:${username.value}
        password:${password.value}
        useremail:${useremail.value}
        userDepartment:${userDepartment}
        teamtype:${teamtype}`);

    if (!pwdError) {
      console.log("제출");
    } else {
      console.log("비밀번호 일치X");
    }

    // 회원가입 post 부분
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentType(e.target.value);
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamType(e.target.value);
  };

  return (
    <div>
      CEOS 운영진 선출 투표 <br />
      <form onSubmit={handleSubmit}>
        {!isSocialSignIn ? (
          <>
            <div>
              이메일:{" "}
              <input type="text" {...useremail} placeholder="ceos@gmail.com" />
            </div>
            <div>
              비밀번호:
              <input
                type="password"
                {...password}
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <div>
              비밀번호 확인 :
              <input
                type="password"
                value={pwdCheck}
                onChange={handlePwd}
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
          {selectList.map((value) => (
            <div key={value}>
              <input
                type="radio"
                onChange={handleSelectChange}
                value={value}
                checked={userDepartment === value}
              />
              {value}
            </div>
          ))}
        </div>
        <div>
          {teamList.map((value) => (
            <div key={value}>
              <input
                type="radio"
                onChange={handleTeamChange}
                value={value}
                checked={teamtype === value}
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
