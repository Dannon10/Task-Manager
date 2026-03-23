import { useState } from 'react';
import { StarFilled, StarRegular } from '@fluentui/react-icons';
import CustomCheckbox from './CustomCheckbox';
import './addtodo.css';

interface AddTodoProps {
    addTodo: (
        title: string,
        dueDate?: Date,
        priority?: 'Low' | 'Medium' | 'High',
        starred?: boolean,
        scheduledForLater?: boolean,
        reminderTime?: Date
    ) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | undefined>();
    const [starred, setStarred] = useState(false);
    const [scheduledForLater, setScheduledForLater] = useState(false);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!title.trim()) {
            setErrorMessage('Please enter a task title.');
            return;
        }

        if (dueDate && isNaN(dueDate.getTime())) {
            setErrorMessage('Please enter a valid due date.');
            return;
        }

        let parsedReminder: Date | undefined;
        if (reminderEnabled) {
            if (!reminderDate || !reminderTime) {
                setErrorMessage('Please enter both reminder date and time.');
                return;
            }

            const [year, month, day] = reminderDate.split('-');
            const [hour, minute] = reminderTime.split(':');

            if (!year || !month || !day || !hour || !minute) {
                setErrorMessage('Please enter a valid reminder date and time.');
                return;
            }

            const reminder = new Date(
                Number(year),
                Number(month) - 1,
                Number(day),
                Number(hour),
                Number(minute)
            );

            if (isNaN(reminder.getTime())) {
                setErrorMessage('Please enter a valid reminder date and time.');
                return;
            }

            parsedReminder = reminder;
        }

        addTodo(title, dueDate, priority, starred, scheduledForLater, parsedReminder);
        setTitle('');
        setDueDate(undefined);
        setPriority(undefined);
        setStarred(false);
        setScheduledForLater(false);
        setReminderEnabled(false);
        setReminderDate('');
        setReminderTime('');
    };

    return (
        <div className='add-todo-section'>
            <form className="add-todo-container" onSubmit={handleSubmit}>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter a new task"
                    className='add-todo'
                />

                <div className="field-group">
                    <label className='field-label' htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        value={dueDate ? dueDate.toISOString().substring(0, 10) : ''}
                        onChange={(e) => {
                            const selected = new Date(e.target.value);
                            if (!isNaN(selected.getTime())) {
                                setDueDate(selected);
                                setErrorMessage('');
                            } else {
                                setDueDate(undefined);
                            }
                        }}
                        type="date"
                    />
                </div>

                <div className="field-group">
                    <label className='field-label' htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority || ''}
                        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                    >
                        <option value="">Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="select-items">
                    <button
                        type="button"
                        onClick={() => setStarred(!starred)}
                        className="star-toggle"
                        title="Mark as Starred"
                    >
                        {starred ? (
                            <StarFilled className="star-icon active" />
                        ) : (
                            <StarRegular className="star-icon" />
                        )}
                    </button>

                    <CustomCheckbox
                        label="Scheduled for Later"
                        checked={scheduledForLater}
                        onChange={setScheduledForLater}
                    />

                    <div className="reminder">
                        <CustomCheckbox
                            label="Set Reminder"
                            checked={reminderEnabled}
                            onChange={() => setReminderEnabled(!reminderEnabled)}
                        />

                        {reminderEnabled && (
                            <div className='reminder-inputs'>
                                <div className="field-group">
                                    <label className='field-label' htmlFor="reminderDate">Reminder Date</label>
                                    <input
                                        id="reminderDate"
                                        type="date"
                                        value={reminderDate}
                                        onChange={(e) => setReminderDate(e.target.value)}
                                    />
                                </div>
                                <div className="field-group">
                                    <label className='field-label' htmlFor="reminderTime">Reminder Time</label>
                                    <input
                                        id="reminderTime"
                                        type="time"
                                        value={reminderTime}
                                        onChange={(e) => setReminderTime(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {errorMessage && <p className="error-msg">{errorMessage}</p>}

                <button className='btn-add-todo' type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTodo;