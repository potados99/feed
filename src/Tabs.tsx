import React, {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import TabPane from "./TabPane";

const Tabs = (props: PropsWithChildren) => {
    const {children} = props;
    const [tabHeader, setTabHeader] = useState([] as string[]);
    const [childContent, setChildContent] = useState({} as {[key: string]: ReactNode});
    const [active, setActive] = useState("");
    useEffect(() => {
        const headers: string[] = [];
        const childCnt: { [key: string]: ReactNode } = {};

        React.Children.forEach(children, (element) => {
            if (!React.isValidElement(element)) return;
            const {name} = element.props;
            headers.push(name);
            childCnt[name] = element.props.children;
        });
        setTabHeader(headers);
        setActive(headers[0]);
        setChildContent({...childCnt});
        console.log(childCnt);
    }, [props, children]);

    const changeTab = (name: string) => {
        setActive(name);
    };

    return (
        <div className="tabs">
            <ul className="tab-header">
                {tabHeader.map((item) => (
                    <li
                        onClick={() => changeTab(item)}
                        key={item}
                        className={item === active ? "active" : ""}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {Object.keys(childContent).map((key) => {
                    if (key === active) {
                        return <div className="tab-child">{childContent[key]}</div>;
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    children: function (props: { [key: string]: any }, propName: string, componentName: string) {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, function (child) {
            if (child.type !== TabPane) {
                error = new Error(
                    "`" + componentName + "` children should be of type `TabPane`."
                );
            }
        });
        return error;
    }
};

export default Tabs;
