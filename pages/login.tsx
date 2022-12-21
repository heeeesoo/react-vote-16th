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

    // console.log('HHH:',status)

    if(data.non_field_errors){
      alert('error')
    }else if(data){

      const sampleReduxData = {
        useremail: userEmail.value,
        password: password.value,
        department: data.department,
        team: data.team,
        name: data.name,
      };
      dispatch(login(sampleReduxData));

      router.push('/')
    }


  };

  const fetchLogin = async() => {
    const settings = {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail.value,
        password: password.value
      })
    }

    try {
      const URL = 'https://ceos-16-vote.ml/account/login/';
      // const response = await fetch(URL,settings);
      const response = await fetch(URL,{
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail.value,
          password: password.value
        })
      })
      const status = response.status;
      const data = await response.json();
      console.log('FFF:',status)
      return data;
    } catch (error) {
      return error;
    }
  }

  return (
    <>
    <div className="container">
      <div className="item">
      CEOS 운영진 선출 투표 <br />
      <form onSubmit={handleSubmit}>
        <input type="text" {...userEmail} placeholder="이메일" />
        <br />
        <input type="password" {...password} placeholder="비밀번호" />
        <br /><br/>
        <button type="submit">로그인</button>
      </form>
      <br />
      {session.status === "unauthenticated" ? (
        <button onClick={() => signIn("kakao")}>카카오 로그인</button>
      ) : (
        <button onClick={() => signOut()}>카카오 로그아웃</button>
      )}
      <br /><br/>
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
    `}</style>
    </>
  );
}
