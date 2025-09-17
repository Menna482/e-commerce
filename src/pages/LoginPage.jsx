
import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginApi } from "../services/AuthService";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schema/LoginSchema";
import { authContext } from "../contexts/AuthContext";


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()
    const { setIsLoggedIn } = useContext(authContext)

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            email: "mohamed+2@gmail.com",
            password: "Mohamed@123"
        },
        resolver: zodResolver(loginSchema)
    })

    async function handleLogin(formData) {
        setErrMsg("")
        setIsLoading(true)
        const data = await loginApi(formData)
        setIsLoading(false)

        if (data.message == "success") {
            localStorage.setItem("token", data.token)
            setIsLoggedIn(true);
            navigate("/")
        } else {
            setErrMsg(data)
        }
    }
    return (
        <>
            <div className="max-w-xl py-10 px-4 shadow-lg my-10 rounded-lg mx-auto">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-center">Login Form</h1>
                        <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register("email")} />
                        <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register("password")} />
                        <Button isLoading={isLoading} type="submit" color="primary" variant="bordered">
                            Login
                        </Button>
                        {errMsg && <p className="p-2 bg-red-200 text-red-700 text-sm text-center capitalize rounded">{errMsg}</p>}
                        <p>U don't have an account? <Link to={"/register"} className="text-primary-500">create account now</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}
