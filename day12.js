import _ from 'lodash';
import fs from 'fs';

const input = fs
	.readFileSync('./data/day12.txt', 'utf8')
	.split('\r\n')
	.map((a) => a.split('-'));

function mapNodeTree(aTreeInput) {
	let nodeTree = new Map();

	aTreeInput.forEach((aTreeValue) => {
		nodeTree.set(aTreeValue[0], (nodeTree.get(aTreeValue[0]) || []).concat(aTreeValue[1]));
		nodeTree.set(aTreeValue[1], (nodeTree.get(aTreeValue[1]) || []).concat(aTreeValue[0]));
	});

	return nodeTree;
}

function maxOneDoubleVisitRule(aPath) {
	return !aPath
		// filter all small caves
		.filter((v) => v === v.toLowerCase())
		// check if there is a node that already exists multiple times
		.some((aNode, aIndex, aOrigin) => aOrigin.indexOf(aNode) !== aIndex);
}

let endNodes = 0;

function traverseNodeTree(aNodeTree, aNode, aCurrentPath, aRule) {
    // end traversal if reached the end
	if (aNode === 'end') {
		endNodes++;
		return;
	} else {
		return aNodeTree
			.get(aNode)
            /*
                filter nodes if not "start" ("end" is already filtered)
                AND (is a big cave OR is not yet in the current paths OR if a cave has not been visited twice yet)
            */
			.filter((aNode) => aNode !== 'start' && (aNode.toLowerCase() !== aNode || !aCurrentPath.includes(aNode) || aRule(aCurrentPath)))
			.map((aNode) => traverseNodeTree(aNodeTree, aNode, [...aCurrentPath, aNode], aRule));
	}
}

// traverseNodeTree(mapNodeTree(input), 'start', [], () => false);
traverseNodeTree(mapNodeTree(input), 'start', [], maxOneDoubleVisitRule)
console.log('endNodes: ', endNodes);
