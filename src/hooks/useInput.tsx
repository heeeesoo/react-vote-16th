import { useState, useEffect } from "react";

export default function useInput(defaultValue : any){
    const [value,setValue] = useState(defaultValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = {...e.target}
        setValue(value);
    }

    return {value, onChange}
}