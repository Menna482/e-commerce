
import * as zod from "zod"
export const registerSchema = zod.object({
    name: zod.string()
        .nonempty("Name is required")
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be at most 20 characters long"),
    email: zod.string()
        .nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"),
    password: zod.string()
        .nonempty("Password is required")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "password must be Minimum eight characters, at least one letter, one number and one special character"),
    rePassword: zod.string()
        .nonempty("Confirm password is required"),
    dateOfBirth: zod.coerce.date()
        .refine((date) => {
            const birthYear = date.getFullYear() //2025
            const now = new Date().getFullYear() //2020
            const age = now - birthYear;
            return age >= 13;
        }, { message: "Your age must be 13 or older" }),
    gender: zod.string()
        .nonempty("Gender is required")
        .regex(/^(male|female)$/, "Enter valid gender")

}).refine((data) => data.password === data.rePassword, { message: "Confirm password must match password", path: ['rePassword'] })