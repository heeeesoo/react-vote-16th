import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Kakao(){
    const router = useRouter();
    const { code: authCode, error: kakaoServerError } = router.query;

    const REST_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

    // const getKakaoToken = async () => {
    //     const response = await fetch(
    //         'https://kauth.kakao.com/oauth/token', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`
    //         }
    //     )

    //     console.log(response)
    // }

    // useEffect(()=>{
    //     console.log('2nd',AUTHORIZE_CODE)
    //     if(AUTHORIZE_CODE){
    //         getKakaoToken();
    //     }
    // },[AUTHORIZE_CODE])

    async function getTokenFromKakao(authCode: string | string[]) {
        const tokenUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${authCode}`;
        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json());

        console.log(response)
        return response;
    }

    useEffect(()=>{
        if (authCode) {
            console.log('here:',authCode)
            getTokenFromKakao(authCode)
            // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
          } else if (kakaoServerError) { 
            // router.push('/notifications/authentication-failed');
            console.log(kakaoServerError)
          }
    },[authCode, router])

    return(
        <div>
            카카오 로그인 중입니다. 잠시만 기다려주세요!
        </div>
    )
}