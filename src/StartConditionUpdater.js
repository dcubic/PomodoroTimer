const TIME_MINIMUM = 1;
const TIME_MAXIMUM = 60;

export function decrementStartTime(timeCurrent) {
    if (timeCurrent > TIME_MINIMUM) {
        timeCurrent -= 1;
    }
    return timeCurrent;
}

export function incrementStartTime(timeCurrent) {
    if (timeCurrent < TIME_MAXIMUM) {
        timeCurrent += 1;
    }
    return timeCurrent;
}