import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {
        // Fetch upcoming deadlines (mock data for now)
        const fetchedDeadlines = [
            { date: '2023-10-10', title: 'Math Homework' },
            { date: '2023-10-15', title: 'Science Project' },
        ];
        setDeadlines(fetchedDeadlines);
    }, []);

    const handleDateChange = (date) => {
        setValue(date);
    };

    return (
        <div>
            <h2>Upcoming Deadlines</h2>
            <Calendar onChange={handleDateChange} value={value} />
            <ul>
                {deadlines.map((deadline, index) => (
                    <li key={index}>
                        {deadline.title} - Due: {deadline.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyCalendar;
