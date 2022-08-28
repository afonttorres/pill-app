export const formContents = {
    pillForm: {
        shape: { type: 'text', content: ['oval', 'square', 'circle', 'rectangle', 'heart', 'cylinder'] },
        color: { type: 'color' },
        name: { type: 'text' },
        when: { type: 'text', content: ['morning', 'noon', 'afternoon', 'night'] }
    },
    dayForm: {
        add_a_pill: { type: 'text', content: JSON.parse(localStorage.getItem('pills')).map(p => p.name)}
    }
}