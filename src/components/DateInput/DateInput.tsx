import { TextField, TextFieldProps } from '@mui/material';
import { FormikProps } from 'formik';
import { formatDateForInput } from '~helpers/date';

type DateInputProps<T> = {
    formik: FormikProps<T>;
    name: keyof T;
    label: string;
} & TextFieldProps;

function DateInput<T>({ formik, name, label, ...rest }: DateInputProps<T>) {
    const value = formik.values[name] as string;
    const formattedValue = value ? formatDateForInput(value) : '';
    return (
        <TextField
            label={label}
            name={name as string}
            type="date"
            variant="outlined"
            size="medium"
            fullWidth
            value={formattedValue}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name] as string)}
            helperText={formik.touched[name] && (formik.errors[name] as string)}
            InputLabelProps={{ shrink: true }}
            {...rest}
        />
    );
}

export default DateInput;
