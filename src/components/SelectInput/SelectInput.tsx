import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { selectInput } from '~/types/selectInput';

type SelectInputProps<T> = {
    formik: FormikProps<T>;
    name: keyof T;
    label: string;
    data: selectInput;
};

function SelectInput<T>({ formik, name, label, data }: SelectInputProps<T>) {
    return (
        <FormControl
            fullWidth
            error={formik.touched[name] && Boolean(formik.errors[name] as string)}
        >
            <InputLabel id={`${name as string}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name as string}-label`}
                name={name as string}
                value={formik.values[name] as string}
                onChange={(event) => {
                    console.log(event)
                    event.preventDefault();  
                    formik.setFieldValue(name as string, event.target.value);  
                }}
                onBlur={formik.handleBlur}
                label={label}
            >
                {data.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            {formik.touched[name] && formik.errors[name] && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {formik.errors[name] as string}
                </Typography>
            )}
        </FormControl>
    );
}

export default SelectInput;
