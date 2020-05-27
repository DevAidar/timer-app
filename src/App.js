import React, { 
    useState, 
    useEffect, 
    useRef 
}                   from 'react';

import Header       from './Header/Header';
import LoginForm    from './components/LoginForm/LoginForm';
import SignUpForm   from './components/SignUpForm/SignUpForm';
import CreateTimer  from './components/CreateTimer/CreateTimer';

import './App.css';

const App = () => {
    const initialUserStore = {
        loading: false,
        isSigningUp: false,
        isLoggedIn: false,
        id: null,
    };

    /**
     * Helped function to create new id
     */
    const findNewId = () => {
        return parseInt(Math.random() * 1000000) + 1;
    }

    /**
     * Helper function to correct formating on time [HHMMSS]
     * @param { string } time 
     */
    const getTime = (time) => {
        let seconds = parseInt(time.substr(4, 2));      // adding seconds
        seconds += parseInt(time.substr(2, 2)) * 60;    // adding minutes
        seconds += parseInt(time.substr(0, 2)) * 3600;  // adding hours

        // hours
        time = '00'.concat(parseInt(seconds / 3600 % 60)).slice(-2);

        // minutes
        time += '00'.concat(parseInt(seconds / 60 % 60)).slice(-2);

        // seconds 
        time += '00'.concat(parseInt(seconds % 60)).slice(-2);

        return time;
    }

    /**
     * Helper function to convert seconds into correct formated string [HHMMSS]
     * @param { number } time 
     */
    const getTimeFromNum = (time) => {
        // hours
        let result = '00'.concat(parseInt(time / 3600 % 60)).slice(-2);

        // minutes
        result += '00'.concat(parseInt(time / 60 % 60)).slice(-2);

        // seconds 
        result += '00'.concat(parseInt(time % 60)).slice(-2);

        return result;
    }


    const [users, setUsers] = useState([{username: 'admin', password: 'admin', id: 0}]);
    const [userStore, setUserStore] = useState(initialUserStore);
    const [timers, setTimers] = useState([]);

    /**
     * Updates userStore object with new parameters from new userStore instance
     * @param { object } userStore 
     */
    const updateUserStore = (userStore) => {
        setUserStore(userStore);
    }

    /**
     * Adds a new user to users array, with unique id
     * @param { object } user 
     */
    const addUser = (user) => {
        let userId = findNewId();
        while (users.length > 0 && users.every(userX => userX.id === userId)) { 
            userId = findNewId();
        }
        user.id = userId;
        
        setUsers([...users, user]);
        return userId;
    }

    /**
     * Adds a new timer to timers array, with unique id and all users that are assigned to that timer
     * @param { obejct } timer 
     */
    const addTimer = (timer) => {
        console.table(timer);
        let timerId = findNewId();
        while (timers.length > 0 && timers.every(timerX => timerX.id === timerId)) { 
            timerId = findNewId();
        }
        timer.id = timerId;

        let timerUsers = [];
        if (userStore.isLoggedIn)
            timerUsers[0] = userStore.id;
        timer.users = timerUsers;

        timer.defaultTime = getTime(timer.defaultTime);

        setTimers([
            ...timers,
            timer,
        ])

        return timer;
    }
    
    /**
     * Updates single object in timers array, and updates defaultTime in case it was changed
     * @param { object } timer 
     */
    const editTimer = (timer) => {
        timer.defaultTime = getTime(timer.defaultTime);
        setTimers([
            ...timers.slice(0, timers.findIndex(timerX => timerX.id === timer.id)),
            timer,
            ...timers.slice(timers.findIndex(timerX => timerX.id === timer.id) + 1),
        ]);
        return timer;
    }

    /**
     * Updates all the timers that are not paused, from the timers array every second
     */
    useInterval (
        () => {
            timers.forEach(timer => {
                if (!timer.isPaused) {                                              // checks if we even need to touch this timer at all
                    if (timer.time === null) {                                      // checks if timer was started before
                        let seconds = parseInt(timer.defaultTime.substr(4, 2));     // adding seconds
                        seconds += parseInt(timer.defaultTime.substr(2, 2)) * 60    // adding minutes
                        seconds += parseInt(timer.defaultTime.substr(0, 2)) * 3600  // adding hours
                        
                        timer.time = seconds;                                       // assigns all the seconds to timer
                    }
                    if (timer.time > 0) {
                        timer.time--;                                               // decrements 1 seconds from time
                        editTimer(timer);                                           // updates timer from timers array
                    } else {
                        editTimer({...timer, isPaused: true})
                    }
                    console.table(timer);
                }
            })
        },
        // 1000,
        timers.length > 0 && timers.every(timerX => !timerX.isPaused) ? 1000 : null,
    )

    
    return (
        <div className='container'>
            <Header updateUserStore={ updateUserStore } userStore={ userStore } />
            { userStore.loading
                ? userStore.isSigningUp
                    ? <SignUpForm users={ users} addUser={ addUser } updateUserStore={ updateUserStore } userStore={ userStore } />
                    : <LoginForm users={ users} updateUserStore={ updateUserStore } userStore={ userStore } />
                : <></>
            }
            { /* favorite timers */ }
            { /* active timers */ }
            <CreateTimer addTimer={ addTimer } editTimer={ editTimer } getTime={ getTime } timers={ timers } getTimeFromNum={ getTimeFromNum } />
            {console.table(timers)}
            { /* timers */ }
        </div>
    );
}

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @author Dan Abramov
 * 
 * @param { function } callback 
 * @param { number } delay 
 */
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default App;
