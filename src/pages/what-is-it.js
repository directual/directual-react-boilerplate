import React from 'react'
import { Hint } from '../components/directualdesign/hint/hint'
import { Article } from '../components/directualdesign/article/article'
import { PageHeader } from '../components/directualdesign/primitive/primitiveComponents'

export function WhatIsIt() {
    return (
        <Article>
            <PageHeader icon="info">What is it?</PageHeader>
            <p>Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects. Whether or not you’re used to calling these operations “side effects” (or just “effects”), you’ve likely performed them in your components before.</p>
            <img src="https://www.economist.com/img/b/1280/720/85/sites/default/files/images/print-edition/20200509_BKP007_0.jpg" />
            <p>Sometimes, we want to run some additional code after <code>React has updated the DOM</code>. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. We say that because we can run them and immediately forget about them. Let’s compare how classes and Hooks let us express such side effects.</p>
            <h2>Effects Without Cleanup</h2>
            <p>This is because in many cases we want to perform the same side effect regardless of whether the component just mounted, or if it has been updated. Conceptually, we want it to happen after every render — but React class components don’t have a method like this. We could extract a separate method but we would still have to call it in two places.</p>
            <Hint title="Useful tip">
                <p>There are two common kinds of side effects in React components: those that don’t require cleanup, and those that do. Let’s look at this distinction in more detail.</p>
            </Hint>
            <Hint error title="Useful tip">
                <p>There are two common kinds of side effects in React components: those that don’t require cleanup, and those that do. Let’s look at this distinction in more detail.</p>
            </Hint>
            <Hint ok title="Useful tip">
                <p>There are two common kinds of side effects in React components: those that don’t require cleanup, and those that do. Let’s look at this distinction in more detail.</p>
            </Hint>
            <p>Sometimes, we want to run some additional code after <code>React has updated the DOM</code>. Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup. We say that because we can run them and immediately forget about them. Let’s compare how classes and Hooks let us express such side effects.</p>
            <h3>Example Using Classes</h3>
            <p>We declare the count state variable, and then we tell React we need to use
                an effect. We pass a function to the <code>useEffect</code> Hook. This function we pass is our effect. Inside our effect, we set the document title using the document.title browser API. We can read the latest count inside the effect because it’s in the scope of our function. When React renders our component, it will remember the effect we used, and then run our effect after updating the DOM. This happens for every render, including the first one.</p>
            <ul>
                <li>Let’s see how we could write this component with Hooks.</li>
                <li>ou might be thinking that we’d need a <a href="#">separate effect</a> to perform the cleanup. But code for adding and removing a subscription is so tightly related that useEffect is designed to keep</li>
                <li>Why did we return a function from our effect</li>
            </ul>
        </Article>
    )
}