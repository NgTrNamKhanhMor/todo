import { TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';

type Props<T> = {
    formik: FormikProps<T>;
    name: keyof T;
    label: string;
} & TextFieldProps;

function TextInput<T>({ formik, name, label, ...rest }: Props<T>) {
    return (
        <TextField
            label={label}
            name={name as string}
            variant="outlined"
            size="medium"
            fullWidth
            value={formik.values[name] as string}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name] as string)}
            helperText={formik.touched[name] && (formik.errors[name] as string)}
            {...rest} 
        />
    );
}

export default TextInput;
