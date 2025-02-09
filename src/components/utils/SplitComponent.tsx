import React, {ChangeEvent} from "react";
import {TextField} from "@mui/material";

interface SplitComponentProps {
    title: string;
    minimum: number;
    maximum: number;
    changeValue: (arg0: number) => void;
}

export default function SplitComponent(props: SplitComponentProps) {
    const [value, setValue] = React.useState<number>();
    return <TextField
        sx={{marginBottom: 2}}
        label={props.title}
        type="number"
        value={value}
        onChange={(e :ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const newValue = Math.min(Math.max(Number(e.target.value.toString()), props.minimum), props.maximum);
            props.changeValue(newValue);
            setValue(newValue);
        }}
        slotProps={{
            inputLabel: {
                shrink: true,
            },
        }}
    />

}