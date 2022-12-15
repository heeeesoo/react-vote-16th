import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import Layout from '../src/components/layout/layout';

//Kakao 함수를 전역에서 사용할 수 있도록 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {

  // 페이지가 로드되면 실행
  function kakaoInit(){
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    console.log(window.Kakao.isInitialized());
  }
  return (
    <Layout>
      <Component {...pageProps} />
      <Script
        src='https://developers.kakao.com/sdk/js/kakao.js'
        onLoad={kakaoInit}
      ></Script>
    </Layout>
  )
}