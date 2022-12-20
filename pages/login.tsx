import Link from "next/link";
import React, { useState, useEffect } from "react";
import useInput from "../src/hooks/useInput";

// redux test 부분
import { login, selectUser } from "../src/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
// redux test 부분

export default function Login() {
  const router = useRouter();
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

    //login post
    const data = await fetchLogin();

    if(data.non_field_errors){
      alert('error')
    }else if(data){

      const sampleReduxData = {
        useremail: userEmail.value,
        password: password.value,
      };
      dispatch(login(sampleReduxData));
      
      router.push('/')
    }


  };

  const fetchLogin = async() => {
    const settings = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: password.value
      })
    }

    try {
      const URL = 'http://ec2-3-37-33-162.ap-northeast-2.compute.amazonaws.com/account/login/';
      const response = await fetch(URL,settings);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

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
      <Link
        href={{
          pathname: "/register",
          query: {
            social: session.status === "authenticated" ? "true" : "false",
          },
        }}
      >
        회원가입
      </Link>
    </div>
  );
}
