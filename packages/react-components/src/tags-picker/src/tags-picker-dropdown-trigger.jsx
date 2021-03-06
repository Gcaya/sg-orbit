import { AddIcon } from "../../icons";
import { Button } from "../../button";
import { KEYS, mergeClasses } from "../../shared";
import { PureComponent, createRef } from "react";
import { SIZES } from "./sizes";
import { bool, func, oneOf, string } from "prop-types";
import { isNil } from "lodash";

export class TagsPickerDropdownTrigger extends PureComponent {
    static propTypes = {
        /**
         * The trigger text.
         */
        text: string,
        /**
         * Called on click.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClick: func,
        /**
         * Called on keydown
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onKeyDown: func,
        /**
         * Called on focus.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onFocus: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Called when an open event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onOpen: func,
        /**
         * Called when a close event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClose: func,
        /**
         * Indicates whether or not the dropdown is opened.
         */
        open: bool,
        /**
         * A disabled trigger does not allow user interaction.
         */
        disabled: bool,
        /**
         * A dropdown trigger can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * @ignore
         */
        className: string
    };

    _buttonRef = createRef();

    toggle(event) {
        const { onOpen, onClose, open } = this.props;

        if (!open) {
            onOpen(event);
        } else {
            onClose(event);
        }
    }

    handleClick = event => {
        const { onClick, disabled } = this.props;

        if (!isNil(onClick)) {
            onClick(event);
        }

        if (!disabled) {
            this.toggle(event);
        }
    }

    handleKeyDown = event => {
        const { onClose, onKeyDown, open, disabled } = this.props;

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }

        const key = event.keyCode;

        if (key === KEYS.space) {
            event.preventDefault();

            if (!disabled) {
                this.toggle(event);
            }
        } else if (key === KEYS.enter) {
            // Since the trigger is a button, when the user press enter on the button, a click event is generated.
            // Therefore, we dont need to onOpen here.
            if (open) {
                onClose(event);
            }
        }
    }

    getClasses() {
        const { disabled, className } = this.props;

        return mergeClasses(
            disabled && "crsr-not-allowed",
            className
        );
    }

    render() {
        const { text, onFocus, onBlur, disabled, size } = this.props;

        return (
            <div className="mr2 mb2">
                <Button
                    onClick={this.handleClick}
                    onKeyDown={this.handleKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    secondary
                    icon={<AddIcon />}
                    iconPosition="right"
                    size={size}
                    className={this.getClasses()}
                    disabled={disabled}
                    tabIndex={disabled ? "-1" : "0"}
                    ref={this._buttonRef}
                    data-testid="tags-picker-dropdown-trigger"
                >
                    {text}
                </Button>
            </div>
        );
    }

    // This function is part of the component external API.
    focus() {
        this._buttonRef.current.focus();
    }

    // This function is part of the component external API.
    isElement(element) {
        return this._buttonRef.current === element;
    }
}
