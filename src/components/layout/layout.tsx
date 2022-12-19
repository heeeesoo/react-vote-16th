import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// redux test 부분
import { login, selectUser } from "../../../src/features/user/userSlice";
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

    return (
        <>
            <Link
            href="/">
                CEOS 16기 투표
            </Link>
            |
            {
                router.pathname === "/" && 
                <Link
                href="/login">
                    로그인
                </Link>
            }
            |
            이메일 : {user.useremail}
            <div className="container">
                {children}
            </div>
        </>
    )
}