import React from "react";
import { Box, Stack } from "@mui/material";
import CustomButton from "../../../../Helpers/ExtraProperties/CustomButtons";
import { ValidationProvider } from "../../../../Contexts/ValidationContext";
export default function PropertySearchActions({ onSearch, onReset, filters }) {
    const hasAnyFilter = Object.values(filters).some(v => v && v.trim() !== "");
    return (
        <Box className="mt-0 bg-white">
            <ValidationProvider
                rules={{
                    search: () => hasAnyFilter,
                    reset: () => hasAnyFilter,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    className="py-3"
                >
                    <CustomButton type="search" onClick={onSearch}>
                        Search
                    </CustomButton>
                    <CustomButton type="reset" onClick={onReset}>
                        Reset
                    </CustomButton>
                </Stack>
            </ValidationProvider>
        </Box>
    );
}
