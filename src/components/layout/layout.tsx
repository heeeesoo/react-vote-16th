import Head from "next/head";

interface LayoutProps {
    children?: JSX.Element|JSX.Element[];
}

export default function Layout({children} : LayoutProps){
    return (
        <>
            CEOS 16기 투표
            <div className="container">
                {children}
            </div>
        </>
    )
}