import { Box} from '@mui/material'
type ColoredBoxProps = {
  color: string,
}
export default function ColoredBox({color}: ColoredBoxProps) {
  return (
    <>
        <Box
            sx={{
                width: 16,
                height: 16,
                backgroundColor: color,
                marginRight: 2,
                borderRadius: '4px',
            }}
            />
    </>
  )
}
