import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import registerImage from "../../../assets/images/register-image.png";

import { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../../hooks/auth/useRegisterUser";
import { IRegisterUserResponse } from "../../../types/interfaces/IRegisterUserResponse";
import { saveTokenOnLocalstorage } from "../../../utils/saveTokenOnLocalstorage";

const registerFormSchema = z.object({
    // profileImage: z
    //     .string()
    //     .optional(),
    name: z
        .string()
        .nonempty("O preenchimento do nome é obrigatório"),
    email: z
        .string()
        .nonempty("O preenchimento do e-mail é obrigatório")
        .email("E-mail inválido"),
    password: z
        .string()
        .nonempty("O preenchimento da senha é obrigatório"),
    passwordConfirmation: z
        .string()
        .nonempty("O preenchimento da confirmação de senha é obrigatório"),
})
    .refine(
        ({ password, passwordConfirmation }) => password == passwordConfirmation,
        {
            message: "As senhas não condizem",
            path: ["passwordConfirmation"]
        }
    )

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterPage() {

    const { handleSubmit, register, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema) })
    const { mutate: registerUser } = useRegisterUser();

    const navigate = useNavigate();

    const [showPasssword, setShowPassword] = useState<boolean>(false);
    const [showPassswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const handleRegisterUser = (registerData: RegisterFormData) => {
        registerUser(registerData, {
            onSuccess: (response: IRegisterUserResponse) => {
                saveTokenOnLocalstorage(response.token);
                navigate("/home");
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

                <div className="w-1/2 flex items-center justify-center">

                    <div className="w-2/3 space-y-16">

                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold">Seja bem-vindo</h2>
                            <h3 className="text-2xl ">Registro</h3>
                        </div>

                        <form action="#" onSubmit={handleSubmit(handleRegisterUser)} className="space-y-6">

                            {/* <img src="" alt="" />
                            <input type="file" accept="" onChange={handleSelectImage} /> */}

                            <FormControl isInvalid={!!errors.name}>
                                <FormLabel>Nome</FormLabel>
                                <Input type='text' placeholder="Digite o nome" {...register("name")} />
                                {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                            </FormControl>

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

                            <FormControl isInvalid={!!errors.passwordConfirmation}>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <InputGroup size='md'>
                                    <Input type={showPassswordConfirmation ? 'text' : 'password'} placeholder='Confirme a senha' {...register("passwordConfirmation")} />

                                    <InputRightElement onClick={() => setShowPasswordConfirmation((prevState) => !prevState)}>
                                        {showPassswordConfirmation ? <BiSolidShow /> : <BiSolidHide />}
                                    </InputRightElement>
                                </InputGroup>
                                {errors.passwordConfirmation && <FormErrorMessage>{errors.passwordConfirmation.message}</FormErrorMessage>}
                            </FormControl>

                            <Button className="w-full" type='submit' variant="outline">
                                Cadastrar
                            </Button>
                        </form>

                        <p>Já tem uma conta? <a href="">faça login</a></p>

                    </div>

                </div>

                <div className="w-1/2 rounded-e-lg bg-[#202322]">
                    <h1 className="mt-5 text-4xl text-center text-white">
                        Todo List <br /> React & Node.js
                    </h1>

                    <img src={registerImage} alt="" width="90%" />
                </div>

            </div>

        </section>
    )
}