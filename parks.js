export default function jsonTable(string, type) {
    const data = {
        hampHill: {
            regex: /trail/i.test(string)
        },
        eastRim: {
            regex: /east\srim/i.test(string)
        },
        bedford: {
            regex: /bedford/i.test(string)
        },
        royalView: {
            regex: /royalview/i.test(string)
        },
        westCreek: {
            regex: /west\screek/i.test(string)
        },
        OECR: {
            regex: !/(west\screek)|(royalview)|(bedfor)/i.test(string)
        },
        vulturesKnob: {
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
