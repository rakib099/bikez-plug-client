import React from 'react';
import './Blogs.css';

const Blogs = () => {
    return (
        <div className='bg-[#E8F4FF] p-5 pb-12 questions-container'>
            <h3 className='text-2xl font-semibold text-center mb-4'>Blogs</h3>
            <div className="questions">
                <div className="question bg-gray-100 shadow-lg">
                    <h3 className='text-xl font-medium'>1. What are the different ways to manage a state in a React application?</h3>
                    <p><span>Ans:</span> Both the databases are viable options still there are certain key differences between the two that users must keep in mind when making a decision.
                    </p>
                    <p><span>SQL:</span></p>
                    <ol>
                        <li>SQL databases are relational</li>
                        <li>SQL databases use structured query language and have a predefined schema</li>
                        <li>SQL databases are vertically scalable</li>
                    </ol>
                    <p><span>NoSQL:</span></p>
                    <ol>
                        <li>NoSQL databases are non-relational</li>
                        <li>NoSQL databases have dynamic schemas for unstructured data.</li>
                        <li>NoSQL databases are horizontally scalable</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Blogs;