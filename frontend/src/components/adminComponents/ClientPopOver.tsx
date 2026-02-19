import {
    Popover,
    PopoverContent,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";
import { type Client } from "@/store/adminClientManagementStore";
import { useState } from "react";

interface ClientPopOver{
    open:boolean;
    setOpen:(open:boolean)=>void;
    selectedClient:Client | null;
}

const ClientPopOver=({open,setOpen,selectedClient}:ClientPopOver)=>{
    const [statusSelectValue,setStatusSelectValue]=useState<string>('');
    return(
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverContent>
                <div>Edit Status:</div>
                <Select value={statusSelectValue} onValueChange={(value)=>{
                    setStatusSelectValue(value);
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </PopoverContent>
        </Popover>
    );
}
export default ClientPopOver;