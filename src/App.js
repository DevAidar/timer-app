import React, { 
    useState, 
    useEffect, 
    useRef 
}                   from 'react';

import Header       from './Header/Header';
import LoginForm    from './components/LoginForm/LoginForm';
import SignUpForm   from './components/SignUpForm/SignUpForm';
import ListTimers   from './components/ListTimers/ListTimers';
import CreateTimer  from './components/CreateTimer/CreateTimer';

import {
    getTime,
    getTimeFromNum,
}                   from './timer/timer';

import './App.css';

const App = () => {
    const initialUserStore = {
        loading: false,
        isSigningUp: false,
        isLoggedIn: false,
        id: null,
    };

    const initialTimerStore = {
        defaultTime: '000500',
        time: null,
        isPaused: true,
        isStarted: false,
        isSaved: [],
        isActive: false,
        id: null,
        users: [],
    };
    
    /**
    * Handles input change and makes sure that input follows the formating style
    * @param {*} event 
    * @param { object } timer 
    */
   const handleTimeInputChange = (event, timer) => {
        if (timer.isPaused) {
            if (timer.id === null)
                setTimerStore({
                    ...timer,
                    defaultTime: '000000'.concat(isNaN(parseInt(event.target.value)) ? '' : parseInt(event.target.value)).slice(-6),
                    time: null,
                    isStarted: false,
                });
            else 
                editTimer({
                    ...timer,
                    defaultTime: '000000'.concat(isNaN(parseInt(event.target.value)) ? '' : parseInt(event.target.value)).slice(-6),
                    time: null,
                    isStarted: false,
                });
        }
    }

    /**
     * Helper function to create new id
     */
    const findNewId = () => {
        return parseInt(Math.random() * 1000000) + 1;
    }

    /**
     * Helper function that returns if timer is liked
     * @param { object } timer 
     */
    const getIsLiked = (timer) => timer.isSaved.length > 0 && timer.isSaved.every(userId => userId === userStore.id);

    /**
     * Set of helper functions to handle action button's functionality
     */
    const onAction = {
        /**
         * Handles any changes for timer
         * @param { object } timer 
         */
        onChange: function onChange(timer) {
            if (timer.id === null)
                setTimerStore(timer);
            else 
                editTimer(timer);
        },

        /**
         * Handles start button press
         * @param { object } timer 
         */
        onStart: function onStart(timer) {
            if (timer.id === null)
                addTimer({...timer, isPaused: false, isStarted: true, isActive: true}, false);
            else 
                editTimer({...timer, isPaused: false, isStarted: true, isActive: true});
        },

        /**
         * Handles pause button press
         * @param { object } timer 
         */
        onPause: function onPause(timer) {
            editTimer({...timer, isPaused: true});
        },

        /**
         * Handles resume button press
         * @param { object } timer 
         */
        onResume: function onResume(timer) {
            editTimer({...timer, isPaused: false});
        },

        /**
         * Handles done button press
         * @param { object } timer 
         */
        onDone: function onDone(timer) {
            editTimer({...timer, time: null, isStarted: false, isPaused: true, isActive: false});
        },

        /**
         * Handles reset button press
         * @param { object } timer 
         */
        onReset: function onReset(timer) {
            editTimer({...timer, time: null, isStarted: false, isPaused: true});
        },

        /**
         * Handles new button press
         * @param { object } timer 
         */
        onNew: function onNew(timer) {
            if (timer.id === null)
                addTimer({...timer, isPaused: true, isStarted: false, isActive: true}, true);
            else 
                addTimer({...timer, time: null, isPaused: true, isStarted: false, id: null, isSaved: [], isActive: true}, true);
        },

        /**
         * Handles reset button press
         * @param { object } timer 
         */
        onStop: function onStop(timer) {
            editTimer({...timer, time: null, isPaused: true, isStarted: false, isActive: false});
        },
        
        /**
         * Handles like button functionality
         * [FUTURE] Add a proper error message
         * @param { object } timer 
         */
        onLike: function onLike(timer) {
            if (userStore.isLoggedIn) {                                                                 // check if user is logged in to be able to save timers
                if (timer.id === null) 
                    addTimer({...timer, isSaved: [...timer.isSaved, userStore.id]}, false);

                else if (timer.isSaved.length > 0 && timer.isSaved.every(userId => userId === userStore.id)) // check if user has already saved this timer before
                    editTimer({...timer, isSaved: [
                        ...timer.isSaved.slice(0, timer.isSaved.findIndex(userId => userId === userStore.id)),
                        ...timer.isSaved.slice(timer.isSaved.findIndex(userId => userId === userStore.id) + 1),
                    ]});

                else 
                    editTimer({...timer, isSaved: [...timer.isSaved, userStore.id]});

                return true;
            } else {
                setUserStore({...userStore, loading: true});
                console.log('You need to sign in to save timers');
                return false;
            }
        },
    };


    const [users, setUsers] = useState([{username: 'admin', password: 'admin', id: 0}]);
    const [userStore, setUserStore] = useState(initialUserStore);
    const [timers, setTimers] = useState([]);
    const [timerStore, setTimerStore] = useState(initialTimerStore);

    /**
     * Updates userStore object with new parameters from new userStore instance
     * @param { object } newUserStore 
     */
    const updateUserStore = (newUserStore) => {
        if (!userStore.isLoggedIn && newUserStore.isLoggedIn)
            timers.forEach(timer => {
                if (timer.users.length === 0)
                    timer.users[0] = newUserStore.id;
                editTimer(timer);
            });
        if (userStore.isLoggedIn && !newUserStore.isLoggedIn)
            setTimerStore(initialTimerStore);
        setUserStore(newUserStore);
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
    const addTimer = (timer, copy) => {
        let timerId = findNewId();
        while (timers.length > 0 && timers.every(timerX => timerX.id === timerId)) { 
            timerId = findNewId();
        }

        let timerUsers = [];
        if (userStore.isLoggedIn)
            timerUsers[0] = userStore.id;

        let defaultTime = getTime(timer.defaultTime);

        setTimers([
            ...timers,
            {
                ...timer,
                id: timerId,
                users: timerUsers,
                defaultTime: defaultTime,
            },
        ])

        if (!copy) 
            setTimerStore({
                ...timer,
                id: timerId,
                users: timerUsers,
                defaultTime: defaultTime,
            });
    }
    
    /**
     * Updates single object in timers array, and updates defaultTime in case it was changed
     * @param { object } timer 
     */
    const editTimer = (timer) => {
        if (!timer.isPaused)
            timer.defaultTime = getTime(timer.defaultTime);
        
        if (!timer.isActive) {
            if (
                !userStore.isLoggedIn || 
                timer.isSaved.length === 0 || 
                !timer.isSaved.every(userId => userId === userStore.id)
            ) {
                deleteTimer(timer);
                if (timer.id === timerStore.id) 
                    setTimerStore({
                        ...timer,
                        id: null,
                        isSaved: [],
                    });
            }
        } else {
            setTimers([
                ...timers.slice(0, timers.findIndex(timerX => timerX.id === timer.id)),
                timer,
                ...timers.slice(timers.findIndex(timerX => timerX.id === timer.id) + 1),
            ]);
    
            if (timer.id === timerStore.id) {
                setTimerStore(timer);
            }
        }
    }
    
    /**
     * Deletes timer object from timers array
     * @param { object } timer 
     */
    const deleteTimer = (timer) => setTimers([
        ...timers.slice(0, timers.findIndex(timerX => timerX.id === timer.id)),
        ...timers.slice(timers.findIndex(timerX => timerX.id === timer.id) + 1),
    ]);


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
                }
            });
        },
        !timerStore.isPaused || (timers.length > 0 && timers.every(timerX => !timerX.isPaused)) ? 1000 : null,
    );

    
    return (
        <div className='container'>
            <Header updateUserStore={ updateUserStore } userStore={ userStore } />
            { /* login screen */ }
            { userStore.loading
                ? userStore.isSigningUp
                    ? <SignUpForm users={ users} addUser={ addUser } updateUserStore={ updateUserStore } userStore={ userStore } />
                    : <LoginForm users={ users} updateUserStore={ updateUserStore } userStore={ userStore } />
                : <></>
            }
            { /* favorite timers */ }
            { timers.length > 0 && !timers.every(timer => !(timer.isSaved.length > 0 && userStore.isLoggedIn && !timer.isSaved.every(userId => userId !== userStore.id)))
                ? <ListTimers 
                    name='favorite'
                    onAction={ onAction }
                    handleInputChange={ handleTimeInputChange }
                    getIsLiked={ getIsLiked } 
                    getTimeFromNum={ getTimeFromNum }
                    timers={ timers.filter(timer => userStore.isLoggedIn && timer.isSaved.length > 0 && timer.isSaved.every(userId => userId === userStore.id)) }
                />
                : <></>
            }
            { /* active timers */ }
            { timers.length > 0 && !timers.every(timer => !(timer.isActive && (userStore.isLoggedIn ? (timer.users.length > 0 && timer.users.every(userId => userId === userStore.id)) : timer.users.length === 0)))
                ? <ListTimers 
                    name='active'
                    onAction={ onAction }
                    handleInputChange={ handleTimeInputChange }
                    getIsLiked={ getIsLiked } 
                    getTimeFromNum={ getTimeFromNum }
                    timers={ timers.filter(timer => timer.isActive && (userStore.isLoggedIn ? (timer.users.length > 0 && timer.users.every(userId => userId === userStore.id)) : timer.users.length === 0)) }
                />
                : <></>
            }
            { /* timers creator */ }
            <CreateTimer timer={ timerStore } onAction={ onAction } handleInputChange={ handleTimeInputChange } getIsLiked={ getIsLiked } getTimeFromNum={ getTimeFromNum } />
            { /* show timers */ }
            { timers.length > 0 && !timers.every(timer => !(timer.isActive && (userStore.isLoggedIn ? (timer.users.length > 0 && timer.users.every(userId => userId === userStore.id)) : timer.users.length === 0)))
                ? <ListTimers 
                    name='show'
                    onAction={ onAction }
                    handleInputChange={ handleTimeInputChange }
                    getIsLiked={ getIsLiked } 
                    getTimeFromNum={ getTimeFromNum }
                    timers={ timers.filter(timer => timer.isActive && (userStore.isLoggedIn ? (timer.users.length > 0 && timer.users.every(userId => userId === userStore.id)) : timer.users.length === 0)) }
                />
                : <></>
            }
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
