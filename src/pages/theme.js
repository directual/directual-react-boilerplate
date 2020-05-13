import React from 'react'
import { ChangeTheme } from '../components/directualdesign/theme/theme'

export function ThemePage() {
    return (
        <ChangeTheme
            themes={['classic', 'tiffany', 'dark-mint', 'warm-night']}
        />
    )
}