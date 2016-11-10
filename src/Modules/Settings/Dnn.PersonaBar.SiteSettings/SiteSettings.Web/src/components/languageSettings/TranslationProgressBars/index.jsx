import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
    languages as LanguagesActions
} from "../../../actions";
import SocialPanelBody from "dnn-social-panel-body";
import InputGroup from "dnn-input-group";
import Label from "dnn-label";
import Button from "dnn-button";
import Switch from "dnn-switch";
import resx from "../../../resources";
import ProgressBar from "./progressBar";
import "./style.less";

class TranslationProgressBars extends Component {
    constructor() {
        super();
        this.state = {
            totalProgress: 0,
            totalLanguages: 2,
            currentLanguage: "",
            currentPage: "",
            progress: 30,
            totalPages: 35,
            elapsedTime: ""
        };
        this.currentTime = Date.now();
    }

    normalizeTime(time) {
        if (time < 10) {
            return "0" + time;
        }
        return time;
    }

    getTime() {
        const time = Date.now() - this.currentTime;
        const seconds = this.normalizeTime(Math.floor(time/1000));
        const minutes = this.normalizeTime(Math.floor(seconds/60));
        const hours = this.normalizeTime(Math.floor(minutes/60));
        return `${hours}:${minutes}:${seconds}s`;
    }


    /* eslint-disable react/no-danger */
    render() {
        const {state, props} = this;
        const totalProgressText = 
            resx.get("TotalProgress").replace("[number]", props.PrimaryPercent) + " - " +
            resx.get("TotalLanguages").replace("[number]", props.PrimaryTotal);
        const progressText = resx.get("Progress").replace("[number]",  props.SecondaryPercent);

        return <div className={"translation-progress-bars" + props.Error ? " error" : ""}>
            <div className="text">
                <span>{resx.get("TranslationProgressBarText").replace("[number]", props.SecondaryTotal)}</span>
            </div>
            <ProgressBar text={totalProgressText} procentageValue={props.PrimaryPercent}/>
            <ProgressBar text={progressText} rightText={props.CurrentOperationText} procentageValue={props.SecondaryPercent}/>
            <div className="text time">
                {resx.get("ElapsedTime")}
                <span>{this.getTime()}</span>
            </div>
        </div>;
    }
}

TranslationProgressBars.propTypes = {
    dispatch: PropTypes.func.isRequired,
    closePersonaBarPage: PropTypes.func,
    languages: PropTypes.array,
    languageSettings: PropTypes.obj,
    InProgress: PropTypes.bool,
    PrimaryPercent: PropTypes.number,
    PrimaryTotal: PropTypes.number,
    PrimaryValue: PropTypes.number,
    SecondaryPercent: PropTypes.number,
    SecondaryTotal: PropTypes.number,
    SecondaryValue: PropTypes.number,
    TimeEstimated: PropTypes.number,
    CurrentOperationText: PropTypes.strings,
    Error: PropTypes.strings
};

function mapStateToProps(state) {

    return {
        languages: state.languages.languageList,
        languageSettings: state.languages.languageSettings
    };
}

export default connect(mapStateToProps)(TranslationProgressBars);