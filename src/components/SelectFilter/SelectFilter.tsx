import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { selectInput } from '~/types/selectInput';

type SelectInputProps = {
    type: string,
    label: string,
    data: selectInput,
};

export default function SelectInput({ type, label, data }: SelectInputProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState("none");
    const handleInputChange = (event: SelectChangeEvent) => {
        const newValue = event.target.value as string;
        setInput(newValue);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set(type, newValue);
        setSearchParams(newParams);
    };
    useEffect(() => {
        const currentCompletionStatus = searchParams.get(type) || "none";
        setInput(currentCompletionStatus);
    }, [searchParams]);
    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={input}
                onChange={handleInputChange}
                label={label}
            >
                <MenuItem value="none">None</MenuItem>
                {data.map((item, index) => (
                    <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}