import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ANCHOR_LEFT, ANCHOR_RIGHT } from "react-dates/lib/constants";
import { ArgumentError, AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { ArrowIcon, ClearIcon, InputCalendarIcon, PresetsCalendarIcon } from "@orbit-ui/icons";
import { DateRangePickerButtons } from "./date-range-picker-buttons";
import { DateRangePickerCalendar } from "./date-range-picker-calendar";
import { DateRangePickerInput } from "./date-range-picker-input";
import { DateRangePickerPresets } from "./date-range-picker-presets";
import { FadeIn } from "./fade-in";
import { PRESET_SHAPE } from "./presets";
import { Popup } from "@orbit-ui/react-popup";
import { arrayOf, bool, func, node, oneOf, oneOfType, shape, string } from "prop-types";
import { cloneElement, createRef } from "react";
import { isNil } from "lodash";
import { momentObj as momentType } from "react-moment-proptypes";

export class DateRangePicker extends AutoControlledPureComponent {
    static propTypes = {
        startDate: momentType,
        endDate: momentType,
        defaultStartDate: momentType,
        defaultEndDate: momentType,
        onDatesChange: func.isRequired,
        onVisibilityChange: func,
        allowSingleDateSelection: bool,
        minDate: momentType,
        maxDate: momentType,
        initialVisibleMonth: oneOfType([momentType, func]),
        input: node,
        inputIcon: node,
        inputClearIcon: node,
        placeholder: string,
        rangeFormat: string,
        dateFormat: string,
        anchorDirection: oneOf([ANCHOR_LEFT, ANCHOR_RIGHT]),
        calendar: node,
        navPrevIcon: node,
        navNextIcon: node,
        presetsComponent: node,
        presets: arrayOf(shape(PRESET_SHAPE)),
        presetsIcon: node,
        buttons: node,
        clearText: string,
        applyText: string,
        defaultOpen: bool,
        open: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        allowSingleDateSelection: false,
        input: <DateRangePickerInput />,
        inputIcon: <InputCalendarIcon />,
        inputClearIcon: <ClearIcon className="h3 w3" />,
        placeholder: "Pick a date",
        rangeFormat: "{startDate} - {endDate}",
        dateFormat: "MMM Do YYYY",
        anchorDirection: ANCHOR_LEFT,
        calendar: <DateRangePickerCalendar />,
        navPrevIcon: <ArrowIcon className="w4 h4 rotate-180 fill-cloud-500" />,
        navNextIcon: <ArrowIcon className="w4 h4 fill-cloud-500" />,
        presetsComponent: <DateRangePickerPresets />,
        presets: [],
        presetsIcon: <PresetsCalendarIcon className="w8 h8 fill-cloud-500" />,
        buttons: <DateRangePickerButtons />,
        clearText: "Clear",
        applyText: "Apply",
        disabled: false
    };

    static autoControlledProps = ["startDate", "endDate", "open"];

    // Expose sub-components.
    static Input = DateRangePickerInput;
    static Calendar = DateRangePickerCalendar;
    static Presets = DateRangePickerPresets;
    static Buttons = DateRangePickerButtons;

    state = {
        startDate: null,
        endDate: null,
        selectedStartDate: null,
        selectedEndDate: null,
        selectedPresetName: null,
        open: false
    };

    _containerRef = createRef();

    componentDidMount() {
        const { minDate, maxDate } = this.props;

        if (!isNil(minDate) && !isNil(maxDate)) {
            if (minDate.isSameOrAfter(maxDate)) {
                throw new ArgumentError("DateRangePicker - \"minDate\" must be before \"maxDate\".");
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, DateRangePicker.autoControlledProps, ({ startDate, endDate }) => ({
            selectedStartDate: startDate,
            selectedEndDate: endDate
        }));
    }

    handleInputClick = event => {
        const { open } = this.state;

        if (!open) {
            this.toggleCalendarVisibility(event);
        }
    };

    handleInputClear = event => {
        const { onDatesChange } = this.props;

        this.trySetAutoControlledStateValue({ startDate: null });
        this.trySetAutoControlledStateValue({ endDate: null });
        this.setState({ selectedStartDate: null, selectedEndDate: null, selectedPresetName: null });

        onDatesChange(event, null, null, null, this.props);
    };

    handleInputKeyDown = event => {
        const key = event.keyCode;

        if (key === KEYS.space || key === KEYS.enter) {
            if (key === KEYS.space) {
                event.preventDefault();
            }

            this.toggleCalendarVisibility(event);
        }
    };

    handlePopupClose = event => {
        const { startDate, endDate } = this.state;

        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: null });
        this.toggleCalendarVisibility(event);
    };

    handleCalendarDatesChange = (startDate, endDate, presetName) => {
        this.setState({ selectedStartDate: startDate, selectedEndDate: endDate, selectedPresetName: presetName });
    };

    handleCalendarApply = event => {
        const { onDatesChange } = this.props;
        const { selectedStartDate, selectedEndDate, selectedPresetName } = this.state;

        this.toggleCalendarVisibility(event);
        this.trySetAutoControlledStateValue({ startDate: selectedStartDate });
        this.trySetAutoControlledStateValue({ endDate: selectedEndDate });

        onDatesChange(event, selectedStartDate, selectedEndDate, selectedPresetName, this.props);
    };

    toggleCalendarVisibility(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        this.trySetAutoControlledStateValue({ open: !open });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, !open, this.props);
        }
    }

    getAnchorDirectionProps() {
        const { anchorDirection } = this.props;

        const props = {};

        if (anchorDirection === ANCHOR_LEFT) {
            props.left = "0";
        } else {
            props.right = "0";
        }

        return props;
    }

    getCssClasses() {
        const { className } = this.props;

        const defaultClasses = "relative";

        return isNil(className) ? defaultClasses : `${defaultClasses} ${className}`;
    }

    renderInput() {
        const { input, inputIcon, inputClearIcon, placeholder, rangeFormat, dateFormat, disabled } = this.props;
        const { selectedStartDate, selectedEndDate, open } = this.state;

        return cloneElement(input, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onClick: this.handleInputClick,
            onClear: this.handleInputClear,
            onKeyDown: this.handleInputKeyDown,
            placeholder,
            rangeFormat,
            dateFormat,
            icon: inputIcon,
            clearIcon: inputClearIcon,
            disabled: disabled,
            open: open
        });
    }

    renderCalendar() {
        const { allowSingleDateSelection, minDate, maxDate, initialVisibleMonth, calendar, navPrevIcon, navNextIcon, presetsComponent, presets, presetsIcon, buttons, clearText, applyText } = this.props;
        const { selectedStartDate, selectedEndDate } = this.state;

        return cloneElement(calendar, {
            startDate: selectedStartDate,
            endDate: selectedEndDate,
            onDatesChange: this.handleCalendarDatesChange,
            onApply: this.handleCalendarApply,
            allowSingleDateSelection,
            minDate,
            maxDate,
            initialVisibleMonth,
            presetsComponent,
            presets,
            presetsIcon,
            buttons,
            navPrevIcon,
            navNextIcon,
            clearText,
            applyText
        });
    }

    render() {
        const { disabled } = this.props;
        const { open } = this.state;

        return (
            <div className={this.getCssClasses()}>
                {this.renderInput()}
                <If condition={!disabled}>
                    <FadeIn active={open} className="relative z-2">
                        <Popup visible={open} onOutsideClick={this.handlePopupClose} onEscapeKeyDown={this.handlePopupClose} {...this.getAnchorDirectionProps()}>
                            <div ref={this._containerRef}>{this.renderCalendar()}</div>
                        </Popup>
                    </FadeIn>
                </If>
            </div>
        );
    }
}
