import { useRouter } from "next/router";

export default function Kakao(){
    const router = useRouter();
    const AUTHORIZE_CODE = router.query.code;

    console.log(AUTHORIZE_CODE);

    return(
        <div>
            카카오 로그인 중입니다. 잠시만 기다려주세요!
        </div>
    )
}