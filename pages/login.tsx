import Link from "next/link";
import React, { useState, useEffect } from "react";
import useInput from "../src/hooks/useInput";

export default function Login() {

  const userid = useInput('');
  const password = useInput('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`
    userid : ${userid.value}
    password: ${password.value}
    `)
    //login post 
  }

  return (
    <div>
      CEOS 운영진 선출 투표 <br/>
      <form onSubmit={handleSubmit}>
        <input type="text" {...userid} placeholder="아이디"/><br/>
        <input type="password" {...password} placeholder="비밀번호"/><br/>
        <button type="submit">로그인</button>
      </form>
      <Link
      href="/register">
          회원가입
      </Link>
    </div>
  )
}
