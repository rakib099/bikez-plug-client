import React from 'react';
import './Blogs.css';

const Blogs = () => {
    return (
        <div className='bg-[#E8F4FF] p-5 pb-12 questions-container'>
            <h3 className='text-2xl font-semibold text-center mb-4'>Blogs</h3>
            <div className="questions">
                <div className="question bg-gray-100 shadow-lg">
                    <h3 className='text-xl font-medium'>1. What are the different ways to manage a state in a React application?</h3>
                    <p><span>Ans:</span> There are several ways to manage state​s in React, including the use of:
                    </p>
                    <ul className='list-disc ml-5 mb-2'>
                        <li>Hooks</li>
                        <li>React Context API</li>
                        <li>Apollo Link State</li>
                    </ul>
                    <p><span>Hooks:</span> Hooks are functions that let you “hook into” React state and lifecycle features from function components.</p>
                    <p><span>React Context API:</span> The Context API helps share data between components which you can't easily share with props.</p>
                    <p><span>Apollo Link State:</span> Apollo Link State allows you manage both local and remote data in a single place. You don't need a GraphQL API in order to use GraphQL.</p>
                </div>
                <div className="question bg-gray-100 shadow-lg">
                    <h3 className='text-xl font-medium'>2. How does prototypical inheritance work?</h3>
                    <p className='mb-2'><span>Ans:</span> The <span>Prototypal Inheritance</span> is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the <span>Prototype</span> of an object, we use <span>Object.getPrototypeOf</span> and <span>Object.setPrototypeOf</span>.</p>
                    <p><span>How is works:</span></p>
                    <p>When it comes to <span>inheritance</span>, JavaScript only has one construct: <span>objects</span>. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with <span>null</span> as its prototype. JavaScript objects are <span>dynamic "bags"</span> of properties (referred to as own properties).</p>
                </div>
                <div className="question bg-gray-100 shadow-lg">
                    <h3 className='text-xl font-medium'>3. What is a unit test? Why should we write unit tests?</h3>
                    <p className='mb-2'><span>Ans:</span> A <span>unit test</span> is a way of testing a unit - the smallest piece of code that can be logically isolated in a system. In most programming languages, that is a function, a subroutine, a method or property. The isolated part of the definition is important.
                    </p>
                    <p className='mb-2'>A <span>unit</span> can be almost anything you want it to be -- a line of code, a method, or a class. Generally though, smaller is better. Smaller tests give you a much more granular view of how your code is performing.</p>
                    <p className='mb-2'><span>Why:</span> With unit testing, developers can have more control over their individual code block quality before integrating different components and then sent for regression testing. Also, it is easier to identify and rectify mistakes or defects at the code level. This helps enterprises save costs significantly when compared to discovering defects later in the development cycle.</p>
                    <p><span>Conclusion:</span> Unit testing will be a critical component of modern application quality assurance initiatives. Facilitating a seamless execution of unit testing is what many enterprises will find hard to achieve.</p>
                </div>
                <div className="question bg-gray-100 shadow-lg">
                    <h3 className='text-xl font-medium'>4. React vs. Angular vs. Vue?</h3>
                    <p className='mb-2'><span>Ans:</span> All the three are popular JS Frameworks as we call. But <span>React</span> considers itself a <span>JS library</span> for building UIs. But then again, for us <span>developers</span> that doesn't make that much of a difference.</p>
                    <p><span>React:</span></p>
                    <ul className='list-disc ml-5 mb-2'>
                        <li>Fast loading of new data.</li>
                        <li>One file contains both markup and logic (JSX).</li>
                        <li>It's simple to get started and doesn't take much practice.</li>
                    </ul>
                    <p><span>Angular:</span></p>
                    <ul className='list-disc ml-5 mb-2'>
                        <li>Allows MVC architecture and Good maintainability.</li>
                        <li>Web applications built with Angular perform very well.</li>
                        <li>Angular is relatively stiff and inflexible.</li>
                    </ul>
                    <p><span>Vue:</span></p>
                    <ul className="list-disc ml-5">
                        <li>Gives A list of tools and libraries.</li>
                        <li>Flexibility and simplicity in the utilization.</li>
                        <li>Limited community comparing to Angular and React.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Blogs;