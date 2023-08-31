import React, { useEffect, useState } from "react"
import { saveToken } from "utils/axios/getToken"
import { requestApi } from "utils/axios/request"
import storage from "utils/localStorage"
import useSession from "hooks/use-session"
import { useNavigate } from "react-router-dom"
import { useSearchParam } from "react-use"

const GithubLogin = () => {
    const {useLogin} = useSession()
    const navigate = useNavigate()
    const code = useSearchParam("code")

    useEffect(() => {
        if (code) {
            loginByGithub(code).catch(err => {
                console.log("login github error：",err)
                navigate('/login')
            })
        }
    }, [code])

    const loginByGithub = async (code) => {
        const res = await requestApi.post(`/login/github`, {code})
        saveToken(res.data.token)
        useLogin()
        setTimeout(() => {
            const oldPage = storage.get('current-page')
            if (oldPage) {
                storage.remove('current-page')
                navigate(oldPage)
            } else {
                navigate('/')
            }
        }, 200)
    }
    return (<></>)
}

export default GithubLogin