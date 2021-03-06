import { CalendarIcon, MagnifierIcon } from "@react-components/icons";
import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

const MALE = { key: "Male", text: "Male", value: "Male" };
const FEMALE = { key: "Female", text: "Female", value: "Female" };
const GENDERS = [MALE, FEMALE];

function createSelect({ options = GENDERS, ...otherProps } = {}) {
    return <Select
        placeholder="Gender"
        transparent
        options={options}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/transparent"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex">
            {createSelect({
                wrapperClassName: "mr5"
            })}
            {createSelect({
                defaultOpen: true
            })}
        </div>
    )
    .add("selected value", () =>
        <div className="flex">
            {createSelect({
                defaultValue: "Female",
                wrapperClassName: "mr5"
            })}
            {createSelect({
                defaultValue: "Female",
                defaultOpen: true
            })}
        </div>
    )
    .add("size",
         () =>
             <div className="flex flex-column">
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createSelect({
                         size: "small",
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         size: "small",
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         size: "small",
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex" style={{ marginBottom: "150px" }}>
                     {createSelect({
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         defaultOpen: true
                     })}
                 </div>
                 <div className="flex">
                     {createSelect({
                         size: "large",
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         size: "large",
                         defaultValue: "Female",
                         wrapperClassName: "mr5"
                     })}
                     {createSelect({
                         size: "large",
                         defaultOpen: true
                     })}
                 </div>
             </div>
    )
    .add("fluid", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    fluid: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    fluid: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                <div className="w-30 mr5">
                    {createSelect({
                        fluid: true
                    })}
                </div>
                <div className="w-30">
                    {createSelect({
                        fluid: true,
                        defaultOpen: true
                    })}
                </div>
            </div>
        </div>
    )
    .add("disabled", () =>
        <div className="flex">
            {createSelect({
                disabled: true,
                wrapperClassName: "mr5"
            })}
            {createSelect({
                disabled: true,
                defaultValue: "Female"
            })}
        </div>
    )
    .add("clearable", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    size: "large"
                })}
            </div>
            <div className="flex">
                {createSelect({
                    clearable: true,
                    defaultValue: "Female",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("error", () =>
        <div className="flex">
            {createSelect({
                error: true,
                wrapperClassName: "mr5"
            })}
            {createSelect({
                error: true,
                wrapperClassName: "mr5",
                defaultOpen: true
            })}
        </div>
    )
    .add("loading", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    loading: true,
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    loading: true,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    loading: true,
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    defaultValue: "Female",
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    loading: true,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("upward", () =>
        <div style={{ marginTop: "50px" }}>
            {createSelect({
                upward: true,
                defaultOpen: true
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    icon: <MagnifierIcon />,
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    defaultValue: "Male",
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    icon: <MagnifierIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    icon: <MagnifierIcon />,
                    disabled: true
                })}
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            {createSelect({
                wrapperClassName: "border-red mr5"
            })}
            {createSelect({
                wrapperClassName: "mr5",
                wrapperStyle: {
                    border: "1px solid red"
                }
            })}
            {createSelect({
                wrapperClassName: "mr5",
                className: "border-red"
            })}
            {createSelect({
                style: {
                    border: "1px solid red"
                }
            })}
        </div>
    )
    .add("item avatar", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, avatar: { src: "https://randomuser.me/api/portraits/men/14.jpg", alt: "Male" } },
                        { ...FEMALE, avatar: { src: "https://randomuser.me/api/portraits/women/14.jpg", alt: "Female" } }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
        </div>
    )
    .add("item icons", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "small",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon />, iconsPosition: "right" },
                        { ...FEMALE, icons: <CalendarIcon />, iconsPosition: "right" }
                    ],
                    defaultValue: "Female",
                    wrapperClassName: "mr5"
                })}
                {createSelect({
                    size: "large",
                    options: [
                        { ...MALE, icons: <CalendarIcon /> },
                        { ...FEMALE, icons: <CalendarIcon /> }
                    ],
                    defaultOpen: true,
                    wrapperClassName: "mr5"
                })}
            </div>
        </div>
    )
    .add("item actions", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    size: "small",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createSelect({
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createSelect({
                    size: "large",
                    actions: [{ content: <a href="https://www.google.com">Google</a> }],
                    defaultOpen: true
                })}
            </div>
        </div>
    );
