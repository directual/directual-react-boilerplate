import React from 'react'
import { Hint } from '../components/directualdesign/hint/hint'
import { Article } from '../components/directualdesign/article/article'
import { PageHeader } from '../components/directualdesign/primitive/primitiveComponents'

export function WhatIsIt() {
    return (
        <Article>
            <PageHeader icon="info">What is it?</PageHeader>
            <p>This is an example React-project which uses Directual as a backend. Feel free to investigate the source code and use it in your projects.</p>
            <Hint title="Useful tip">
                <p>Hint text</p>
            </Hint>
            <Hint error title="Error message">
                <p>Message text</p>
            </Hint>
            <Hint ok title="OK message">
                <p>Good for you</p>
            </Hint>
            <p></p>
        </Article>
    )
}