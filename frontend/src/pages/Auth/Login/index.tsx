import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loginImage from "../../../assets/images/todo-list-logo.png";

import { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/auth/useLogin";
import { ILoginData } from "../../../types/interfaces/ILoginData";
import { ILoginResponse } from "../../../types/interfaces/ILoginResponse";
import { saveTokenOnLocalstorage } from "../../../utils/saveTokenOnLocalstorage";

const loginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .nonempty("O preenchimento do e-mail é obrigatório"),
    password: z
        .string()
        .nonempty("O preenchimento da senha é obrigatório")
})

type LoginData = z.infer<typeof loginSchema>;

export function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

    const [showPasssword, setShowPassword] = useState<boolean>(false);

    const { mutate: login } = useLogin();

    const navigate = useNavigate();

    const handleLogin = (loginData: ILoginData) => {
        login(loginData, {
            onSuccess: (response: ILoginResponse) => {
                saveTokenOnLocalstorage(response.userToken);
                navigate("/home");
            },

            onError: (error) => {
                console.log(error);
            }
        });
    }

    useEffect(() => {
        const accessTokenName: string = import.meta.env.VITE_ACCESS_TOKEN_NAME;
        const accessToken = localStorage.getItem(accessTokenName);
        
        if(accessToken){
            navigate("/home");
        }
    })

    return (
        <section className="min-h-screen min-w-full flex items-center justify-center">

            <div className="w-2/3 flex border border-[#F2F2F2] rounded-lg shadow-lg">

                <div className="w-1/2 rounded-s-lg bg-[#202322]">
                    <h1 className="mt-5 text-4xl text-center text-white">
                        Todo List <br /> React & Node.js
                    </h1>

                    <img src={loginImage} alt="" width="90%"/>
                </div>

                <div className="w-1/2 flex items-center justify-center">

                    <div className="w-2/3 space-y-16">

                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold">Seja bem-vindo</h2>
                            <h3 className="text-2xl ">Login</h3>
                        </div>

                        <form action="#" onSubmit={handleSubmit(handleLogin)} className="space-y-7">
                            <FormControl isInvalid={!!errors.email}>
                                <FormLabel>E-mail</FormLabel>
                                <Input type='email' placeholder="Digite o e-mail" {...register("email")} />
                                {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                            </FormControl>

                            <FormControl isInvalid={!!errors.password}>
                                <FormLabel>Senha</FormLabel>
                                <InputGroup size='md'>
                                    <Input type={showPasssword ? 'text' : 'password'} placeholder='Digite a senha' {...register("password")} />

                                    <InputRightElement onClick={() => setShowPassword((prevState) => !prevState)}>
                                        {showPasssword ? <BiSolidShow /> : <BiSolidHide />}
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                            </FormControl>

                            <Button className="w-full" type='submit' variant="outline">
                                Login
                            </Button>
                        </form>

                        <p>Não tem uma conta? <a href="">cadastre-se</a></p>

                    </div>

                </div>

            </div>

        </section>
    )
}