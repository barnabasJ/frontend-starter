import { globalStyle, keyframes, style } from '@vanilla-extract/css'


globalStyle('#root', {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center'
})

const logoSpin = keyframes({
    from: {
        transform: 'rotate(0deg)'
    },
    to: {
        transform: 'rotate(360deg)'
    }
})

export const logo = style({
    height: '6em',
    padding: '1.5em',
    willChange: 'filter',
    selectors: {
        '&:hover': {
            filter: 'drop-shadow(0 0 2em #646cffaa)'
        },
        '&.react:hover': {
            filter: 'drop-shadow(0 0 2em #61dafbaa)'
        },
        '&.react': {
            '@media': {
                '(prefers-reduced-motion: no-preference)': {
                    animation: `${logoSpin} infinite 20s linear`
                }
            }
        }
    },
})

globalStyle('.card', {
    padding: '2em'
})

globalStyle('.read-the-docs', {
    color: '#888'
})
