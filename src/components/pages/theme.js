import React from 'react'
import { ChangeTheme, PageHeader } from '../UI-components/directual-design'

export function ThemePage() {
    return (
        <div>
            <PageHeader icon="styles">Theme</PageHeader>
            <ChangeTheme />
        </div>
    )
}