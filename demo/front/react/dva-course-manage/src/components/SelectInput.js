import React from "react";
import { Select } from 'antd';

const Option = Select.Option;

class SelectInput extends React.PureComponent {
    render() {
        const {
            onChange,
            defaultOption,
            select,
            options
          } = this.props;
        return (
            <div>
                <Select
                    defaultValue={ select || "default" }
                    onChange={onChange}
                >
                    <Option value="default" key="default">{defaultOption}</Option>
                        {options.map(option => {
                            return (
                                <Option value={option.value} key={option.value}>
                                    {option.text}
                                </Option>
                            );
                        })}
                </Select>
            </div>
          );
    }
}

export default SelectInput;
