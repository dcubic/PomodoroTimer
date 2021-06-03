import React from "react";
import { FaArrowCircleUp, FaArrowCircleDown, FaPlayCircle, FaPauseCircle, FaRedoAlt } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';

export class Timer extends React.Component {

    render() {
        return (
            <div className="application-background white-font-colour">
                <div>
                    <div className="clock-display">
                        25:00
                    </div>

                    <div className="clock-buttons-grid">
                        <button className="button">
                            <FaPlayCircle className="clock-icon" />
                        </button>
                        <button className="button">
                            <FaPauseCircle className="clock-icon" />
                        </button>
                        <button className="button">
                            <FaRedoAlt className="clock-icon" />
                        </button>
                    </div>
                </div>
                <div>
                    <form className="timer-settings-grid">
                        <div className="label-settings-box">
                            <label htmlFor="session-length">Session Length</label>
                            <div className="duration-settings-grid">
                                <button className="button">
                                    <FaArrowCircleDown className="clock-icon" />
                                </button>
                                <div id="session-length" className="text-display">
                                    25
                                </div>
                                <button className="button">
                                    <FaArrowCircleUp className="clock-icon" />
                                </button>
                            </div>
                        </div>
                        <div className="label-settings-box">
                            <label htmlFor="break-length">Break Length</label>
                            <div className="duration-settings-grid">
                                <button className="button">
                                    <FaArrowCircleDown className="clock-icon" />
                                </button>
                                <div id="break-length" className="text-display">
                                    1
                                </div>
                                <button className="button">
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