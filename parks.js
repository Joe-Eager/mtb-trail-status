export default function jsonTable(string, type) {
	const regex = {
		hampHill: /trail/i,
		eastRim: /east\srim/i,
		bedford: /bedford/i,
		royalView: /royalview/i,
		westCreek: /west\screek/i,
		OECR: /(erie)|(canal)|(\so.e\s)/ig,
		vulturesKnob: /status/i,
	};
	const data = {
		hampHill: regex.hampHill.test(string),
		eastRim: regex.eastRim.test(string),
		bedford: regex.bedford.test(string),
		royalView: regex.royalView.test(string),
		westCreek: regex.westCreek.test(string),
		OECR: regex.OECR.test(string),
		vulturesKnob: regex.vulturesKnob.test(string)
	};
	if (type === 'hampHill') {
		return data.hampHill;
	} else if (type === 'eastRim') {
		return data.eastRim;
	} else if (type === 'bedford') {
		return data.bedford;
	} else if (type === 'royalView') {
		return data.royalView;
	} else if (type === 'westCreek') {
		return data.westCreek;
	} else if (type === 'OECR') {
		return data.OECR;
	} else if (type === 'vulturesKnob') {
		return data.vulturesKnob;
	}
}
