import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

interface LayoutProps {
    children?: JSX.Element|JSX.Element[];
}

export default function Layout({children} : LayoutProps){
    const router = useRouter();
    return (
        <>
            <Link
            href="/">
                CEOS 16기 투표
            </Link>
            {
                router.pathname === "/" && 
                <Link
                href="/login">
                    로그인
                </Link>
            }
            <div className="container">
                {children}
            </div>
        </>
    )
}