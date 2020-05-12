import React from 'react'
import { ChangeTheme, PageHeader } from '../UI-components/directual-design'

export function ThemePage() {
    return (
        <ChangeTheme
            themes={['classic', 'tiffany', 'dark-mint', 'warm-night']}
        />
    )
}