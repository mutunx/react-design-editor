import metadata from '../../../libs/fontawesome-5.2.0/metadata/icons.json';

import ActionNode from './action/ActionNode';
import DataNode from './data/DataNode';
import LogicNode from './logic/LogicNode';
import TriggerNode from './trigger/TriggerNode';

import { getNode } from '../configuration/NodeConfiguration';
import FilterNode from './logic/FilterNode';
import SwitchNode from './logic/SwitchNode';
import VirtualButtonNode from './trigger/VirtualButtonNode';

const defaultOption = {
	superType: 'node',
	fill: '#20262e',
	stroke: '#5f646b',
	borderColor: '#2d7cfa',
	borderScaleFactor: 1.5,
	deletable: true,
	cloneable: true,
	action: {
		enabled: false,
	},
	tooltip: {
		enabled: true,
	},
	animation: {
		type: 'none',
	},
	userProperty: {},
	trigger: {
		enabled: false,
	},
};

const NODES = {
	ACTION: {
		create: (option, descriptor) =>
			new ActionNode({
				...defaultOption,
				...option,
				descriptor,
			}),
	},
	DATA: {
		create: (option, descriptor) =>
			new DataNode({
				...defaultOption,
				...option,
				descriptor,
			}),
	},
	LOGIC: {
		create: (option, descriptor) => {
			const node = getNode(descriptor.nodeClazz);
			const options = Object.assign({}, defaultOption, { descriptor }, option);
			switch (node) {
				case 'FilterNode':
					return new FilterNode(options);
				case 'SwitchNode':
					return new SwitchNode(options);
				default:
					return new LogicNode(options);
			}
		},
	},
	TRIGGER: {
		create: (option, descriptor) => {
			const node = getNode(descriptor.nodeClazz);
			const options = Object.assign({}, defaultOption, { descriptor }, option);
			switch (node) {
				case 'VirtualButtonNode':
					return new VirtualButtonNode(options);
				default:
					return new TriggerNode(options);
			}
		},
	},
};

export default descriptors => {
	return Object.keys(descriptors).reduce((prev, key) => {
		return Object.assign(
			prev,
			descriptors[key].reduce((p, c) => {
				return Object.assign(p, {
					[getNode(c.nodeClazz)]: {
						create: option => {
							const iconMetadata = metadata[c.icon];
							const icon = iconMetadata
								? String.fromCodePoint(parseInt(iconMetadata.unicode, 16))
								: '\uf03e';
							return NODES[c.type].create({ ...option, icon }, c);
						},
					},
				});
			}, {}),
		);
	}, {});
};
