import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Component } from 'react';

class SelectBar extends Component {

    //importantt
    showDefaultOption = () => {
        var { list } = this.props
        var list = this.getUnSelectedList(list)
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    //importantt
    showSelectedOption = () => {
        var { list, value } = this.props
        var list = this.getSelectedList(value, list)

        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        return result
    }

    //important
    showCommonOption = () => {
        var { list } = this.props
        var result = null
        result = list.map((item, index) => {
            return (<Option key={index} value={item.value}>{item.label}</Option>)
        })
        // console.log(result)
        return result
    }

    //important
    showSelect = () => {
        var { type } = this.props
        switch (type) {
            case 'unique':
                return this.showUnique()
            case 'common':
                return this.showCommon()
            case 'special':
                return this.showSpecial()
            case 'status':
                return this.showStatus()
            case 'role':
                return this.showRole()
            case 'multi':
                return this.showMulti()
        }
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
                    {this.showCommonOption()}
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
                    {this.showCommonOption()}
                </Select>)
        }
    }

    onSelectMulti = (value) => {
        var { name } = this.props
        switch (name) {
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value)
                break;
            case 'position':
                this.props.onSelectPosition(this.props.hardSkillOptionIndex, value)
                break
            case 'projectField':
                this.props.onSelectProjectField(value)
                break
        }
    }
    //important
    showUnique = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 250 }}
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
                    style={{ width: 250 }}
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

    //important
    showCommon = () => {
        var { value } = this.props
        if (value === 0) {
            return (
                <Select
                    showSearch
                    style={{ width: 250 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCommonOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 250 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectCommon}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCommonOption()}
                </Select>)
        }
    }

    //important
    showRole = () => {
        var { value } = this.props
        return (
            <Select
                value={value}
                style={{ width: 150 }}
                showSearch
                placeholder={this.props.placeholder}
                onSelect={this.onSelectRole}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.showCommonOption()}
            </Select>
        )
        // }
    }

    //important
    showStatus = () => {
        var { value } = this.props
        return (
            <Select value={value}
                style={{ width: 250 }}
                showSearch
                placeholder={this.props.placeholder}
                onSelect={this.onSelectCommon}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.showCommonOption()}
            </Select>)
    }

    //important
    showSpecial = () => {
        var { value } = this.props
        if (value === -1) {
            return (
                <Select
                    showSearch
                    style={{ width: 250 }}
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectSpecial}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCommonOption()}
                </Select>)
        } else {
            return (
                <Select value={value}
                    style={{ width: 250 }}
                    showSearch
                    placeholder={this.props.placeholder}
                    onSelect={this.onSelectSpecial}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.showCommonOption()}
                </Select>)
        }
    }

    //important
    onSelectCommon = (value) => {
        var { name } = this.props
        switch (name) {
            case 'positionID':
                this.props.onUpdatePositionID(value)
                break
            case 'posLevel':
                this.props.onUpdatePositionLevel(value)
                break
            case 'languageLevel':
                this.props.onUpdateLanguageLevel(value, this.props.languageIndex)
                break
            case 'skillLevel':
                this.props.onUpdateHardSkillLevel(value, this.props.hardSkillIndex)
                break
            case 'hardSkillList':
                this.props.onSelectSkill(value)
                break
            case 'certiLevel':
                this.props.onUpdateCerti(value)
                break
            case 'posID':
                this.props.onSelectPos(value)
                break
        }
    }

    //important
    onSelectUnique = (value) => {
        var { name } = this.props
        switch (name) {
            case 'softSkillID':
                this.props.onUpdateSoftSkillID(value, this.props.softSkillIndex)
                break
            case 'language':
                this.props.onUpdateLanguageID(value, this.props.languageIndex)
                break
            case 'hardSkill':
                this.props.onUpdateHardSkillID(value, this.props.hardSkillIndex)
                break
            case 'certificateID':
                this.props.onUpdateCertficateID(value, this.props.certificateIndex, this.props.hardSkillIndex)
                break
            case 'projectType':
                this.props.onSelectProjectType(this.props.hardSkillOptionIndex, value)
                break
        }
    }

    //important
    onSelectSpecial = (value) => {
        var { name } = this.props
        switch (name) {
            case 'skillType':
                this.props.onSelectSkillType(value)
                break
            case 'positionSelect':
                this.props.onSelectPos(value)
                break;
        }
    }

    //important
    onSelectRole = (value) => {
        var { name } = this.props
        switch (name) {
            case 'role':
                this.props.onSelectRole(value)
                break
            case 'empListRole':
                this.props.onSelectRole(value)
                break
            case 'skillType':
                this.props.onSelectType(value)
                break
        }
    }

    //important
    getUnSelectedList = (list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false)
                result.push(list[index])
        }
        return result
    }

    //important
    getSelectedList = (value, list) => {
        var result = []
        for (let index = 0; index < list.length; index++) {
            if (list[index].isSelect === false || list[index].value === value)
                result.push(list[index])
        }
        return result
    }

    //important
    render() {
        return (
            <div>
                { this.showSelect()}
            </div>
        );
    }
}

export default SelectBar;