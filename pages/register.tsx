import { useState, useEffect } from "react";
import useInput from "../src/hooks/useInput";
import Link from "next/link";

export default function Register(){
    const username = useInput('');
    const password = useInput('');
    const useremail = useInput('');
    const [usertype, setUserType] = useState(''); //useInput으로 바꾸기

    const [pwdCheck, setPwdCheck] = useState('')
    const [pwdError, setPwdError] = useState(false);

    const handlePwd = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = {...e.target}
        setPwdError(password.value !== value);
        setPwdCheck(value);
    }

    const selectList = ["Frontend","Backend"];

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`
        username:${username.value}, 
        password:${password.value}, 
        useremail:${useremail.value}, 
        usertype:${usertype}`);

        if(!pwdError){
            console.log('제출');
        }else{
            console.log('비밀번호 일치X');
        }

        // 회원가입 post 부분
    }

    const handleRadioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserType(e.target.value);
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                CEOS 운영진 선출 투표 <br/>
                <input type="text" {...username} placeholder="이름"/><br/>
                <input type="password" {...password} placeholder="비밀번호"/><br/>
                <input type="password" value={pwdCheck} onChange={handlePwd} placeholder="비밀번호 확인"/><br/>
                {pwdError && <div>일치하지 않습니다.</div>}
                <input type="text" {...useremail} placeholder="이메일"/><br/>
                {
                    selectList.map((value)=>(
                        <div key={value}>
                            <input
                                type="radio"
                                onChange={handleRadioChange}
                                value={value}
                                checked={usertype === value}
                            />
                            {value}
                        </div>
                    ))
                }
                <button type="submit">회원가입</button>
            </form>
            <Link
            href="/login">
                로그인
            </Link>
        </div>
    )
}