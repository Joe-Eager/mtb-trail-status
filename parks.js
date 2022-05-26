export default function jsonTable(string, type) {
    const data = {
        hampHill: {
            name: 'Hampton Hills',
            status: '',
            tweet: '',
            bool: true,
            regex: /trail/i.test(string)
        },
        eastRim: {
            name: 'East Rim',
            status: '',
            tweet: '',
            bool: true,
            regex: /east\srim/i.test(string)
        },
        bedford: {
            name: 'Bedford',
            status: '',
            tweet: '',
            bool: true,
            regex: /bedford/i.test(string)
        },
        royalView: {
            name: 'Royalview',
            status: '',
            tweet: '',
            bool: true,
            regex: /royalview/i.test(string)
        },
        westCreek: {
            name: 'West Creek',
            status: '',
            tweet: '',
            bool: true,
            regex: /west\screek/i.test(string)
        },
        OECR: {
            name: 'O & ECR',
            status: '',
            tweet: '',
            bool: true,
            regex: /erie\scanal/i.test(string)
        },
        vulturesKnob: {
            name: 'Vultures Knob',
            status: '',
            tweet: '',
            bool: true,
            regex: /status/i.test(string)
        }
    }
    if (type === 'hampHill') {
        return data.hampHill
    } else if (type === 'eastRim') {
        return data.eastRim
    } else if (type === 'bedford') {
        return data.bedford
    } else if (type === 'royalView') {
        return data.royalView
    } else if (type === 'westCreek') {
        return data.westCreek
    } else if (type === 'OECR') {
        return data.OECR
    } else if (type === 'vulturesKnob') {
        return data.vulturesKnob
    }
}