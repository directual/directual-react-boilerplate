import React from 'react'
import { ChangeTheme, PageHeader } from '../directualdesign/directual-design'

export function ThemePage() {
    return (
        <ChangeTheme
            themes={['classic', 'tiffany', 'dark-mint', 'warm-night']}
        />
    )
}