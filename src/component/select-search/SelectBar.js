import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Component } from 'react';

class SelectBar extends Component {

    showDefaultOption = () => {
        var { list } = this.props
        var listConverted = this.getUnSelectedList(list)
        var result = null
        result = listConverted.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showSelectedOption = () => {
        var { list, value } = this.props
        var listConverted = this.getSelectedList(value, list)

        var result = null
        result = listConverted.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showPriorityOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    showSelect = () => {
        var { type } = this.props
        switch (type) {
            case 'common':
                return this.showCommon()
            case 'special':
                return this.showSpecial()
            case 'unique':
                return this.showUnique()
            case 'multi':
                return this.showMulti()
            default:
                break;
        }
    }

    showCommon = () => {
        var { value, name } = this.props
        if (value === 0 || value === -1) {
            return (
                <Select
                    showSearch
                    style={name === 'projectType' ? { width: 300 } : { width: 200 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={name === 'projectType' ? { width: 300 } : { width: 200 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    showUnique = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 240 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectUnique}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showDefaultOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 240 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectUnique}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showSelectedOption()}
                </Select>)
        }
    }

    showSpecial = () => {
        var { value } = this.props
        return (
            <Select value={value}
                style={{ minWidth: 290, maxWidth: 'auto' }}
                showArrow
                showSearch
                placeholder="Select project type"
                onChange={this.onSelectSpecial}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.showPriorityOption()}
            </Select>
        )
    }

    showMulti = () => {
        var { value } = this.props
        if (value.length === 0) {
            return (
                <Select
                    style={{ minWidth: 250, maxWidth: 'auto' }}
                    mode='multiple'
                    showArrow
                    showSearch
                    placeholder={this.props.placeholder}
                    onChange={this.onSelectMulti}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
        else {
            return (
                <Select value={value}
                    style={{ minWidth: 250, maxWidth: 'auto' }}
                    mode='multiple'
                    showArrow
                    showSearch
                    placeholder={this.props.placeholder}
                    onChange={this.onSelectMulti}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showPriorityOption()}
                </Select>)
        }
    }

    onSelectCommon = (value) => {
        var { name } = this.props
        switch (name) {
            case 'languagePriority':
                this.props.onUpdateLanguagePriority(value, this.props.languageIndex, this.props.positionFormIndex)
                break;
            case 'skillLevel':
                this.props.onUpdateSkillLevel(value, this.props.hardSkillIndex, this.props.positionFormIndex)
                break;
            case 'certiLevel':
                this.props.onUpdateHardSkillCerti(value, this.props.hardSkillIndex, this.props.positionFormIndex)
                break
            case 'hardSkillPriority':
                this.props.onUpdateHardSkillPriority(value, this.props.hardSkillIndex, this.props.positionFormIndex)
                break
            case 'projectType':
                this.props.onSelectProjectType(value)
                break
            default:
                break;
        }
    }

    onSelectUnique = (value) => {
        var { name } = this.props
        switch (name) {
            case 'positionID':
                this.props.onUpdatePositionID(value, this.props.positionFormIndex)
                break;
            case 'language':
                this.props.onUpdateLanguageID(value, this.props.languageIndex, this.props.positionFormIndex)
                break
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value, this.props.softSkillIndex, this.props.positionFormIndex)
                break
            case 'hardSkill':
                this.props.onUpdateHardSkillID(value, this.props.hardSkillIndex, this.props.positionFormIndex)
            default:
                break;
        }
    }

    onSelectSpecial = (value) => {
        var { name } = this.props
        switch (name) {
            case 'positionSelect':
                this.props.onSelectPos(value)
                break;

            default:
                break;
        }
    }

    onSelectMulti = (value) => {
        var { name } = this.props
        switch (name) {
            case 'posLevel':
                this.props.onSelectPosLevel(value, this.props.positionFormIndex)
                break;
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value, this.props.positionFormIndex)
                break
            default:
                break;
        }
    }

    getUnSelectedList = (list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false)
                result.push(list[index])
        }
        return result
    }

    getSelectedList = (value, list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false || list[index].value === value)
                result.push(list[index])
        }
        return result
    }

    render() {
        return (
            <div>
                { this.showSelect()}
            </div>
        );
    }
}

export default SelectBar;