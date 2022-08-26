export const styleUtil = {
    styles : {
        borderRadius: {
            oval: '70%',
            cylinder: '1.5rem',
            square: 'unset',
            circle: '50%',
            rectangle: 'unset',
            heart: 'unset'
        }
    },

    setStyles(obj, field){
        return this.styles[obj][field];
    }
}