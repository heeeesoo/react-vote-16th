import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// redux test 부분
import { login, logout, selectUser } from "../../../src/features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
// redux test 부분

interface LayoutProps {
    children?: JSX.Element|JSX.Element[];
}

export default function Layout({children} : LayoutProps){
    const router = useRouter();

    // redux test 부분
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    // redux test 부분

    let department = '';

    if(user.department===0){
        department='[FE]'
    }else if(user.department===1){
        department='[BE]'
    }

    const handleClick = async () => {
        const URL = 'https://ceos-16-vote.ml/account/logout/'
        const data = await fetch(URL)
        if(data.status === 200){
            console.log(data.status)
            dispatch(logout());
            router.push('/')
        }
    }

    return (
        <>
            <div className="header">
                <Link
                href="/">
                    CEOS 16기 투표
                </Link>
                {user.name} {department}
                {
                    user.isLogged ?
                    <button onClick={handleClick}>
                        로그아웃
                    </button>
                    :
                        router.pathname === "/" && 
                    <Link
                    href="/login">
                        로그인
                    </Link>
                }
            </div>
            <div className="container">
                {children}
            </div>
            <style jsx>{`
                .header {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    background : #B2B2B2;
                    height: 45px;
                }

                button {
                    font-family: LINESeedKR-Bd;
                    border:none;
                    background : none;
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}