//React
import React from "react"

//Next

// MUI Imports
import { IconButton } from "@mui/material"

//components
import IconifyIcon from "../../../../components/Icon";

//hooks
import { useSettings } from "src/hooks/useSettings";

//Types
import { Mode } from "src/types/layouts";

type TProps = {}


const ModeToggle = (props: TProps) => {

    const { settings, saveSettings } = useSettings()

    const handleModeChange = (mode: Mode) => {
        saveSettings({...settings, mode })
    }

    const handleToggleMode = () => {
        if (settings.mode === "dark") {
            handleModeChange("light")
        } else {
            handleModeChange("dark")
        }
    }
    return (
        <IconButton color="inherit" onClick={handleToggleMode}>
            <IconifyIcon icon={settings.mode === "light"
                ? "material-symbols:dark-mode"
                : "material-symbols-light:light-mode"
            } />
        </IconButton>
    )
}

export default ModeToggle
