import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTodosFilter } from '~/hooks/useTodosFilter';
import { TodoFilter } from '~/types/filter';
import { selectInput } from '~/types/selectInput';

type SelectInputProps = {
    type: keyof TodoFilter,
    label: string,
    data: selectInput,
};

export default function SelectFilter({ type, label, data }: SelectInputProps) {
    const { completed, sort, setFilters } = useTodosFilter();
    const value = type === 'completed' ? completed : sort;
    const handleInputChange = (event: SelectChangeEvent) => {

        const newValue = event.target.value as TodoFilter[keyof TodoFilter];
        if (newValue === "none") {
            setFilters({ [type]: null });
        } else {
            setFilters({ [type]: newValue });
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value || ""}
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