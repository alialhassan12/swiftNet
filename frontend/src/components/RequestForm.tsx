import { Button, Dialog, Flex, Spinner, Text, TextField } from "@radix-ui/themes";
import { useRequestStore } from "../store/requestStore";
import React, { useState } from "react";

type requestFormProps={
    plan:string,
    onSuccess?:()=>void,
    setOpenSnackBar:()=>void
}
type requestForm={
    name:string,
    email:string,
    password:string,
    phone:string
    address:string,
    plan:string,
}

export default function RequestForm({plan,onSuccess,setOpenSnackBar}:requestFormProps){
    const [formData,setFormData]=useState<requestForm>({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        plan:plan,
    });
    const {createRequest,creatingRequest}=useRequestStore();

    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const success = await createRequest(formData);
        if(success){
            setFormData({name:"",email:"",password:"",phone:"",address:"",plan:plan});
            if(onSuccess) onSuccess();
            setOpenSnackBar();
        }
    }

    return(
        <Dialog.Content>
            <form onSubmit={handleSubmit}>
                <Dialog.Title>
                Subscribe to {plan}
            </Dialog.Title>
            <Dialog.Description>
                Fill the form to subscribe to {plan}
            </Dialog.Description>
            <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Name
                    </Text>
                    <TextField.Root
                        value={formData.name}
                        onChange={handleOnChange}
                        name="name"
                        type="text"
                        placeholder="Enter your name"   
                    />
                </label>
                <Text as="div" size={"3"} weight={"bold"}>
                    Email and Password need to access Portal after admin approval
                </Text>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Email
                    </Text>
                    <TextField.Root
                        value={formData.email}
                        onChange={handleOnChange}
                        name="email"
                        type="email"
                        placeholder="Enter your email"   
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Password
                    </Text>
                    <TextField.Root
                        value={formData.password}
                        onChange={handleOnChange}
                        name="password"
                        type="password"
                        placeholder="Enter your password"   
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Phone
                    </Text>
                    <TextField.Root
                        value={formData.phone}
                        onChange={handleOnChange}
                        name="phone"
                        type="number"
                        placeholder="Enter your Phone number"
                    />
                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Address
                    </Text>
                    <TextField.Root
                        value={formData.address}
                        onChange={handleOnChange}
                        name="address"
                        type="text"
                        placeholder="Enter your Address"
                    />
                </label>
            </Flex>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button type="submit" disabled={creatingRequest}>
                        {creatingRequest ? <Spinner/> : "Subscribe"}
                    </Button>
                </Flex>
            </form>
        </Dialog.Content>
    );
}