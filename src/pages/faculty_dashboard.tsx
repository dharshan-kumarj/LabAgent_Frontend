import React from 'react';
import './faculty_dashboard.css'; // Optional: For custom styling

const LabAssignments = () => {
    const labs = [
        { name: "Data Science & Ecosystem", details: "23cs2004", batch: "Batch-2", active: true },
        { name: "Data Structure & Algorithm", details: "23cs2004", batch: "Batch-2", active: true },
        { name: "Python for Programming", details: "23cs2004", batch: "Batch-2", active: true },
        { name: "Machine Learning", details: "23cs2004", batch: "Batch-2", active: true },
    ];

    return (
        <body>
        <div className="lab-assignments">
            <div className="lab-list">
                <h1>No of Labs assigned for you</h1>
                <ul>
                    {labs.map((lab, index) => (
                        <li key={index} className={lab.active ? 'active-lab' : 'inactive-lab'}>
                            <span>{lab.name}</span>
                            {lab.active ? 
                                <span className="details">{lab.details} - {lab.batch}</span>
                                : 
                                <span className="details grayed-out">Details unavailable</span>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </body>
    );
};

export default LabAssignments;

