import { useAllFilmsQuery } from './allFilms.generated'

export function Films() {
    const n = useAllFilmsQuery()

    console.log({data: n.data})
    if (!n.data) {
        return null
    }

    return <code>{JSON.stringify(n)}</code>
}
