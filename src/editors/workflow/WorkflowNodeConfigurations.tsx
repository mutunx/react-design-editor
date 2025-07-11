import { Divider, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbar } from '../../components/common';
import { Flex } from '../../components/flex';
import NodeAction from './configuration/NodeAction';
import NodeConfiguration from './configuration/NodeConfiguration';
import NodeDescriptor from './configuration/NodeDescriptor';

interface IProps extends FormComponentProps {
	canvasRef?: Canvas;
	selectedItem?: any;
	workflow?: any;
	onChange?: any;
	descriptors?: any;
}

class WorkflowNodeConfigurations extends Component<IProps> {
	static propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
		workflow: PropTypes.object,
		descriptors: PropTypes.object,
		onChange: PropTypes.func,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.selectedItem && nextProps.selectedItem) {
			if (this.props.selectedItem.id !== nextProps.selectedItem.id) {
				nextProps.form.resetFields();
			}
		}
	}

	render() {
		const { canvasRef, workflow, selectedItem, form } = this.props;
		return (
			<Scrollbar>
				<Form layout="horizontal">
					{selectedItem ? (
						<React.Fragment>
							<NodeDescriptor workflow={workflow} selectedItem={selectedItem} />
							<Flex flexDirection="column" style={{ margin: '8px 16px' }}>
								<Form.Item label={i18n.t('common.name')} colon={false}>
									{form.getFieldDecorator('name', {
										initialValue: selectedItem.name,
										rules: [
											{
												required: true,
												message: i18n.t('validation.enter-property', {
													arg: i18n.t('common.name'),
												}),
											},
										],
									})(<Input placeholder={i18n.t('workflow.node-name-required')} />)}
								</Form.Item>
								<Form.Item label={i18n.t('common.description')} colon={false}>
									{form.getFieldDecorator('description', {
										initialValue: selectedItem.description,
									})(
										<Input.TextArea
											style={{ maxHeight: 200 }}
											placeholder={i18n.t('workflow.node-description-required')}
										/>,
									)}
								</Form.Item>
							</Flex>
							<Divider>{i18n.t('workflow.node-configuration')}</Divider>
							<Flex
								flexDirection="column"
								style={{ height: '100%', overflowY: 'hidden', margin: '8px 16px' }}
							>
								<NodeConfiguration
									canvasRef={canvasRef}
									form={form}
									selectedItem={selectedItem}
									workflow={workflow}
								/>
							</Flex>
							<NodeAction workflow={workflow} selectedItem={selectedItem} canvasRef={canvasRef} />
						</React.Fragment>
					) : null}
				</Form>
			</Scrollbar>
		);
	}
}

export default Form.create<IProps>({
	onValuesChange: (props: IProps, changedValues, allValues) => {
		const { onChange, selectedItem } = props;
		onChange(selectedItem, changedValues, allValues);
	},
})(WorkflowNodeConfigurations);
