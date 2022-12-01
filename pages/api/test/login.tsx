import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from 'next'

const secret : any = process.env.SECRET;

export default async function (req:NextApiRequest, res:NextApiResponse){
    const {userid,password} = req.body;

    const token = sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            userid: userid,
        },
        secret
    );

    const serialised = serialize("OursiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
    });

    res.status(200).json({ token: serialised });
}