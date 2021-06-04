import React from "react";
import { FaArrowCircleUp, FaArrowCircleDown, FaPlayCircle, FaRedoAlt } from "react-icons/fa";
import { decrementStartTime, incrementStartTime } from "./StartConditionUpdater";

import 'bootstrap/dist/css/bootstrap.min.css';
const BREAK = "break";
const SESSION = "session";
const STATE_ORIGINAL = {
    isRunning: false,
    isBreak: false,
    minutesOriginal: 25,
    secondsOriginal: 0,
    minutesCurrent: 25,
    secondsCurrent: 0,
    breakLength: 5,
    sessionLength: 25,
    intervalID: null
};

export class Timer extends React.Component {

    constructor(props) {
        super(props);

        this.state = STATE_ORIGINAL;
        this.decrementBreakTime = this.decrementBreakTime.bind(this);
        this.decrementSessionTime = this.decrementSessionTime.bind(this);
        this.incrementBreakTime = this.incrementBreakTime.bind(this);
        this.incrementSessionTime = this.incrementSessionTime.bind(this);
        this.resetState = this.resetState.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.toggleRunning = this.toggleRunning.bind(this);
        this.updateTimerLabel = this.updateTimerLabel.bind(this);
        this.stopAudio = this.stopAudio.bind(this);
    }

    updateClockDisplay() {
        let minuteString = this.state.minutesCurrent.toString();
        if (this.state.minutesCurrent < 10) {
            minuteString = "0" + minuteString;
        }
        let secondString = this.state.secondsCurrent.toString();
        if (this.state.secondsCurrent < 10) {
            secondString = "0" + secondString;
        }

        document.getElementById("time-left").innerText = minuteString + ":" + secondString;
        if (minuteString === "00" && secondString === "00") {
            document.getElementById("beep").play();
        }
    }

    updateStateToMatchSettings(fieldToUpdate, lengthNext) {
        let stateNext = { ...this.state };
        if (fieldToUpdate === BREAK) {
            stateNext.breakLength = lengthNext;
        } else if (fieldToUpdate === SESSION) {
            stateNext.sessionLength = lengthNext;
        } else {
            throw new Error("Invalid fieldToUpdate parameter used");
        }

        if ((fieldToUpdate === BREAK && this.state.isBreak) || (fieldToUpdate === SESSION && !this.state.isBreak)) {
            stateNext.minutesCurrent = lengthNext;
            stateNext.secondsCurrent = 0;
        }
        this.setState(stateNext, this.updateClockDisplay);
    }

    decrementBreakTime() {
        if (!this.state.isRunning) {
            const breakLengthNext = decrementStartTime(this.state.breakLength);
            this.updateStateToMatchSettings(BREAK, breakLengthNext);
        }
    }

    incrementBreakTime() {
        if (!this.state.isRunning) {
            const breakLengthNext = incrementStartTime(this.state.breakLength);
            this.updateStateToMatchSettings(BREAK, breakLengthNext);
        }
    }

    decrementSessionTime() {
        if (!this.state.isRunning) {
            const sessionLengthNext = decrementStartTime(this.state.sessionLength);
            this.updateStateToMatchSettings(SESSION, sessionLengthNext);
        }
    }

    incrementSessionTime() {
        if (!this.state.isRunning) {
            const sessionLengthNext = incrementStartTime(this.state.sessionLength);
            this.updateStateToMatchSettings(SESSION, sessionLengthNext);
        }
    }

    resetState() {
        if (this.state.isRunning) {
            clearInterval(this.state.intervalID);
        }
        this.setState(STATE_ORIGINAL, () => {
            this.updateClockDisplay();
            this.updateTimerLabel();
            this.stopAudio();
        });
    }

    stopAudio() {
        let beeper = document.getElementById("beep");
        if (!beeper.paused) {
            beeper.pause();
            beeper.load();
        }
    }

    toggleRunning() {
        if (this.state.isRunning) {
            clearInterval(this.state.intervalID);
            this.setState({
                ...this.state,
                isRunning: false
            });
        } else {
            let intervalID = setInterval(this.runTimer, 1000);
            this.setState({
                ...this.state,
                isRunning: true,
                intervalID: intervalID
            });

        }
    }

    runTimer() {
        let minuteCurrent = this.state.minutesCurrent;
        let secondCurrent = this.state.secondsCurrent;

        let isBreakNext = this.state.isBreak;
        let minuteCurrentNext = minuteCurrent;
        let secondCurrentNext = secondCurrent;

        if (minuteCurrent === 0 && secondCurrent === 0) {
            if (this.state.isBreak) {
                isBreakNext = false;
                minuteCurrentNext = this.state.sessionLength;
            } else {
                isBreakNext = true;
                minuteCurrentNext = this.state.breakLength;
            }
            secondCurrentNext = 0;
            
        } else if (secondCurrent === 0) {
            secondCurrentNext = 59;
            minuteCurrentNext = minuteCurrentNext - 1;
        } else {
            secondCurrentNext = secondCurrent - 1;
        }

        this.setState({
            ...this.state,
            isBreak: isBreakNext,
            minutesCurrent: minuteCurrentNext,
            secondsCurrent: secondCurrentNext
        }, () => {
            this.updateClockDisplay();
            this.updateTimerLabel();
        });
    }

    updateTimerLabel() {
        let labelTextNext;
        if (this.state.isBreak) {
            labelTextNext = BREAK;
        } else {
            labelTextNext = SESSION;
        }
        document.getElementById("timer-label").innerText = labelTextNext;
    }

    render() {
        return (
            <div className="application-background white-font-colour">
                <label id="timer-label" hidden>{SESSION}</label>
                <audio id="beep">
                    <source src="https://sampleswap.com/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/192[kb]clock_radio_alarm.wav.mp3" />
                </audio>
                <div>
                    <div id="time-left" className="clock-display">
                        25:00
                    </div>

                    <div className="clock-buttons-grid">
                        <button id="start_stop" type="button" className="button" onClick={this.toggleRunning}>
                            <FaPlayCircle className="clock-icon" />
                        </button>
                        <button id="reset" type="button" className="button" onClick={this.resetState}>
                            <FaRedoAlt className="clock-icon" />
                        </button>
                    </div>
                </div>
                <div>
                    <form className="timer-settings-grid">
                        <div className="label-settings-box">
                            <label id="session-label" htmlFor="session-length">Session Length</label>
                            <div className="duration-settings-grid">
                                <button id="session-decrement" type="button" className="button" onClick={this.decrementSessionTime}>
                                    <FaArrowCircleDown className="clock-icon" />
                                </button>
                                <div id="session-length" className="text-display">
                                    {this.state.sessionLength}
                                </div>
                                <button id="session-increment" type="button" className="button" onClick={this.incrementSessionTime}>
                                    <FaArrowCircleUp className="clock-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="label-settings-box">
                            <label id="break-label" htmlFor="break-length">Break Length</label>
                            <div className="duration-settings-grid">
                                <button id="break-decrement" type="button" className="button" onClick={this.decrementBreakTime}>
                                    <FaArrowCircleDown className="clock-icon" />
                                </button>
                                <div id="break-length" className="text-display">
                                    {this.state.breakLength}
                                </div>
                                <button id="break-increment" type="button" className="button" onClick={this.incrementBreakTime}>
                                    <FaArrowCircleUp className="clock-icon" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}