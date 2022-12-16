import { useRouter } from "next/router";

export default function Part(){
    const router = useRouter();
    const {Part} = router.query;
   return(
        <div>
            {Part} 투표 현황
        </div>
   ) 
}