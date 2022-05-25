export default function jsonTable(string, type) {
    const data = {
        hampHill: {
            status: {},
            tweet: {}
        },
        eastRim: {
            status: {},
            tweet: {}
        },
        bedford: {
            name: 'bedford',
            status: {},
            tweet: {},
            bool: true,
            regex: ''
        },
        royalView: {
            status: {},
            tweet: {},
            bool: true
        },
        westCreek: {
            status: {},
            tweet: {},
            bool: true
        },
        OECR: {
            status: {},
            tweet: {},
            bool: true
        },
        vulturesKnob: {
            status: {},
            tweet: {}
        }
    }
    switch (type) {
        case 'bedford':
            return data.bedford
            break
        default:
            return data
    }

}