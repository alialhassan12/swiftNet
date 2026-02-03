import { Button, Dialog, Flex, Spinner, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";

type LoginForm={
    email:string,
    password:string,
}
type ErrorForm={
    email:string,
    password:string,
}
export default function Navbar(){
    const {adminLogin,loggingIn,authUser}=useAuthStore();
    const [openPortalDialog,setOpenPortalDialog]=useState<boolean>(false);
    const navigate = useNavigate();
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
    const handleSubmitLogin= async (formData:LoginForm)=>{
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
        const success = await adminLogin(formData);
        if(success) navigate("/adminDashboard");
    }
    
    const handlePortalClick=()=>{
        if(authUser){
            navigate('/adminDashboard');
        }else{
            setOpenPortalDialog(true);
        }
    }

    return(
        <div className="sticky top-0 z-50 flex justify-between items-center h-20 px-10 bg-slate-950">
            <div className="flex justify-center items-center">
                <img src="/src/assets/logo.png" className="w-20 h-20" />
                <h1 className="text-2xl font-bold text-white tracking-wider">SwiftNet</h1>
            </div>
            <div className="flex justify-center items-center gap-4">
                <ul className="flex gap-8 text-white/90 font-medium items-center">
                    <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                    <li><a href="#plans" className="hover:text-blue-400 transition-colors">Plans</a></li>
                    <li><a href="#coverage-map" className="hover:text-blue-400 transition-colors">Coverage</a></li>
                    <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
                    <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                    <li className=""><Button onClick={handlePortalClick} variant="soft" className="cursor-pointer">Portal</Button></li>
                    <Dialog.Root open={openPortalDialog}>
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
                                    <Button variant="soft" color="gray" onClick={()=>setOpenPortalDialog(false)}>
                                        Cancel
                                    </Button>

                                <Button disabled={loggingIn} onClick={()=>handleSubmitLogin(formData)}>
                                    {loggingIn?<Spinner/>:"Login"}
                                </Button>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </ul>
            </div>
        </div>
    );
}
