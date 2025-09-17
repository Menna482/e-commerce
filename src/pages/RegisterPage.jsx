
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schema/RegisterSchema";
import { registerApi } from "../services/AuthService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            email: "mohamed@gmail.com",
            password: "Mohamed@123",
            rePassword: "Mohamed@123",
            dateOfBirth: new Date(),
            gender: "male"
        },
        resolver: zodResolver(registerSchema),
        mode: "onBlur"
    })

    async function handleRegister(formData) {
        setErrMsg("")
        setSuccessMsg("")
        setIsLoading(true)
        const data = await registerApi(formData)
        console.log(data);
        setIsLoading(false)

        if (data.error) {
            setErrMsg(data)
        } else if (data.message) {
            reset()
            setSuccessMsg(data.message)
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        }
    }

    return (
        <>
            <div className="max-w-xl py-10 px-4 shadow-lg my-10 rounded-lg mx-auto">
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="flex flex-col gap-6">
                        <h1 className="text-center">Register Form</h1>
                        <Input isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} variant="bordered" label="Name" type="text" {...register("name")} />
                        <Input isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} variant="bordered" label="Email" type="email" {...register("email")} />
                        <Input isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} variant="bordered" label="Password" type="password" {...register("password")} />
                        <Input isInvalid={Boolean(errors.rePassword?.message)} errorMessage={errors.rePassword?.message} variant="bordered" label="Confirm Password" type="password" {...register("rePassword")} />
                        <Input isInvalid={Boolean(errors.dateOfBirth?.message)} errorMessage={errors.dateOfBirth?.message} variant="bordered" label="Date Of Birth" type="date" {...register("dateOfBirth")} />
                        <Select isInvalid={Boolean(errors.gender?.message)} errorMessage={errors.gender?.message} variant="bordered" label="Gender" {...register("gender")}>
                            <SelectItem key={"male"}>Male</SelectItem>
                            <SelectItem key={"female"}>Female</SelectItem>
                        </Select>
                        <Button isLoading={isLoading} type="submit" color="primary" variant="bordered">
                            Register
                        </Button>
                        {errMsg && <p className="p-2 bg-red-200 text-red-700 text-sm text-center capitalize rounded">{errMsg}</p>}
                        {successMsg && <p className="p-2 bg-green-200 text-green-700 text-sm text-center capitalize rounded">{successMsg}</p>}
                        <p>Already have an account? <Link to={"/login"} className="text-primary-500">login now</Link></p>

                    </div>
                </form>
            </div>
        </>
    )
}
