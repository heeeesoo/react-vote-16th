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

    const handleClick = () => {
        dispatch(logout());
    }

    return (
        <>
            <div className="header">
                <Link
                href="/">
                    CEOS 16기 투표
                </Link>
                {user.name}
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
            `}</style>
        </>
    )
}