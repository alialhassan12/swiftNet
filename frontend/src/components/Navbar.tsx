import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
interface LoginForm{
    email:string,
    password:string,
}
interface ErrorForm{
    email:string,
    password:string,
}
export default function Navbar(){
    const [formData,setFormdata]=useState<LoginForm>({
        email:"",
        password:""
    });
    const [errors,setErrors]=useState<ErrorForm>({
        email:"",
        password:""
    });
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormdata({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmitLogin=(formData:LoginForm)=>{
        if(formData.email==="" || formData.password===""){
            setErrors({email:"email cant be empty",password:"password cant be empty"});
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formData.email)){
            setErrors({email:"Invalid email",password:""});
            return;
        }
        if(formData.password.length <8){
            setErrors({email:"",password:"password must be more than 8 characters"});
            return;
        }
        setErrors({email:"",password:""});
        console.log(formData);
    }

    return(
        <div className="sticky top-0 z-50 flex justify-between items-center h-20 px-10 bg-slate-950">
            <div className="flex justify-center items-center">
                <img src="/src/assets/logo.png" className="w-20 h-20" />
                <h1 className="text-2xl font-bold text-white tracking-wider">SwiftNet</h1>
            </div>
            <div className="flex justify-center items-center gap-4">
                <ul className="flex gap-8 text-white/90 font-medium">
                    <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                    <li><a href="#plans" className="hover:text-blue-400 transition-colors">Plans</a></li>
                    <li><a href="#coverage-map" className="hover:text-blue-400 transition-colors">Coverage</a></li>
                    <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                    <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <li className=""><Button variant="soft">Portal</Button></li>
                        </Dialog.Trigger>
                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Log In</Dialog.Title>
                            <Dialog.Description size="2" mb="4">
                                Welcome back!
                            </Dialog.Description>

                            <Flex direction="column" gap="3">
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Email
                                    </Text>
                                    <TextField.Root
                                        color={errors.email===""?"blue":"red"}
                                        style={{
                                            border:errors.email===""?"":"1px solid red",
                                        }}
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <span className="text-red-600 text-xs">{errors.email}</span>
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Password
                                    </Text>
                                    <TextField.Root
                                        color={errors.password===""?"blue":"red"}
                                        style={{
                                            border:errors.password===""?"":"1px solid red",
                                        }}
                                        name="password"
                                        type="password"
                                        placeholder="Enter your Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <span className="text-red-600 text-xs">{errors.password}</span>
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Button onClick={()=>handleSubmitLogin(formData)}>Login</Button>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </ul>
            </div>
        </div>
    );
}