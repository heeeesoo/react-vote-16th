import Link from "next/link";
import React, { useState, useEffect } from "react";
import useInput from "../src/hooks/useInput";
import axios from "axios";

// redux test 부분
import { login, selectUser } from "../src/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// redux test 부분

export default function Login() {
  const session = useSession();

  const userEmail = useInput("");
  const password = useInput("");

  // redux test 부분
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // redux test 부분

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`
    userEmail : ${userEmail.value}
    password: ${password.value}
    `);

    const data = {
      userid: userEmail.value,
      password: password.value,
    };

    // redux test
    const sampleReduxData = {
      useremail: userEmail.value,
      password: password.value,
    };
    dispatch(login(sampleReduxData));

    //login post

    // const response =  await (await fetch('/api/test/login',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify(data)
    // })).json();

    const response = await axios.post("/api/test/login", data);

    const accessToken = response.data.token;

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    console.log(accessToken);

    // accessToken을 localStorage, cookie 등에 저장하지 않는다 (XSS 취약점 보완)
  };

  return (
    <div>
      CEOS 운영진 선출 투표 <br />
      <form onSubmit={handleSubmit}>
        <input type="text" {...userEmail} placeholder="이메일" />
        <br />
        <input type="password" {...password} placeholder="비밀번호" />
        <br />
        <button type="submit">로그인</button>
      </form>
      <br />
      {session.status === "unauthenticated" ? (
        <button onClick={() => signIn("kakao")}>카카오 로그인</button>
      ) : (
        <button onClick={() => signOut()}>카카오 로그아웃</button>
      )}
      <br />
      <Link href="/register">회원가입</Link>
    </div>
  );
}
