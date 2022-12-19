import { useRouter } from "next/router";
import { useEffect } from "react";

interface TokenResponse {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: string;
}

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

    async function getUserFromKakao(access_token :any) {
        const userInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        const response = await fetch(userInfoUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
        }).then((res) => res.json());

        console.log(response);

        return response;
      }

    useEffect(()=>{
        if (authCode) {
            console.log('here:',authCode)
            const tokenResponse : any= getTokenFromKakao(authCode);

            const userInfo =  getUserFromKakao(tokenResponse.access_token);

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